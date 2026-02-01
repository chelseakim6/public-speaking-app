import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiveFeedback } from '../components/feedback/LiveFeedback';
import { RecordingControls } from '../components/practice/RecordingControls';
import { PromptCard } from '../components/modes/PromptCard';
import { Button } from '../components/common/Button';
import { useSessionStore } from '../store/sessionStore';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useAudioAnalysis } from '../hooks/useAudioAnalysis';
import { useTimer } from '../hooks/useTimer';
import { analyzeTranscript, analyzeFillerWords, calculateLiveWPM } from '../utils/speechAnalysis';
import { calculateScore } from '../utils/scoring';
import { speakingModes } from '../data/modes';
import { prompts } from '../data/prompts';

export function Practice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modeId, promptId } = location.state || {};

  const { startSession, updateLiveMetrics, liveMetrics, endSession } = useSessionStore();
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [volumeLevels, setVolumeLevels] = useState<number[]>([]);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const mode = speakingModes.find(m => m.id === modeId);
  const prompt = prompts.find(p => p.id === promptId);

  const { elapsedTime, isRunning, start: startTimer, stop: stopTimer, formatTime } = useTimer();
  const { volume, startAnalysis, stopAnalysis } = useAudioAnalysis();

  const handleTranscriptUpdate = useCallback((finalText: string, interim: string) => {
    setTranscript(finalText);
    setInterimTranscript(interim);

    // Calculate live metrics
    const words = finalText.split(/\s+/).filter(w => w.length > 0).length;
    const wpm = calculateLiveWPM(words, elapsedTime);
    const fillerWords = analyzeFillerWords(finalText);
    const totalFillerWords = fillerWords.reduce((sum, fw) => sum + fw.count, 0);

    updateLiveMetrics({
      currentWPM: wpm,
      fillerWordCount: totalFillerWords,
      currentVolume: volume,
      elapsedTime,
    });
  }, [elapsedTime, volume, updateLiveMetrics]);

  const { isListening, isSupported, startListening, stopListening } =
    useSpeechRecognition({
      onTranscriptUpdate: handleTranscriptUpdate,
    });

  useEffect(() => {
    if (!mode || !prompt) {
      navigate('/');
      return;
    }
  }, [mode, prompt, navigate]);

  useEffect(() => {
    updateLiveMetrics({ elapsedTime, currentVolume: volume });
  }, [elapsedTime, volume, updateLiveMetrics]);

  // Track volume levels for analysis
  useEffect(() => {
    if (isRunning) {
      volumeIntervalRef.current = setInterval(() => {
        setVolumeLevels(prev => [...prev, volume]);
      }, 500);
    } else {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    }

    return () => {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    };
  }, [isRunning, volume]);

  const handleStart = async () => {
    if (!mode || !prompt) return;

    startSession(mode.id, prompt.id);
    startTimer();
    await startAnalysis();
    startListening();
  };

  const handleStop = () => {
    stopListening();
    stopTimer();
    stopAnalysis();

    // Analyze the full session
    const duration = elapsedTime;
    const metrics = analyzeTranscript(transcript, duration, [], volumeLevels);

    // Calculate score
    const { score, breakdown } = calculateScore(metrics, mode!.scoreWeights);

    // End session
    endSession(transcript, metrics, score, breakdown);

    // Navigate to results
    navigate('/results');
  };

  if (!mode || !prompt) {
    return null;
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Browser Not Supported</h2>
          <p className="text-gray-600 mb-4">
            Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
          </p>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              {mode.icon} {mode.name} Practice
            </h1>
            <p className="text-white opacity-90">Stay focused and speak naturally</p>
          </div>
          <div className="text-right">
            <div className="text-white text-4xl font-bold font-mono">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-white text-sm opacity-75">
              Target: {formatTime(prompt.duration)}
            </div>
          </div>
        </div>

        {/* Prompt */}
        {!isListening && <PromptCard prompt={prompt} />}

        {/* Live Feedback */}
        {isListening && (
          <div className="space-y-4">
            <LiveFeedback metrics={liveMetrics} />

            {/* Transcript Display */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Live Transcript</h3>
              <div className="text-gray-700 leading-relaxed min-h-[100px] max-h-[200px] overflow-y-auto">
                {transcript}
                {interimTranscript && (
                  <span className="text-gray-400 italic">{interimTranscript}</span>
                )}
                {!transcript && !interimTranscript && (
                  <p className="text-gray-400 italic">Start speaking...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <RecordingControls
            isRecording={isListening}
            isPaused={false}
            onStart={handleStart}
            onStop={handleStop}
          />

          {!isListening && (
            <div className="mt-4 text-center">
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
              >
                ← Back to Home
              </Button>
            </div>
          )}
        </div>

        {/* Tips */}
        {!isListening && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-3">💡 Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Find a quiet environment</li>
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Use pauses instead of filler words</li>
              <li>• Stay engaged with your topic</li>
              <li>• Have fun and be yourself!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
