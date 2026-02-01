import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModeSelector } from '../components/modes/ModeSelector';
import { XPBar } from '../components/gamification/XPBar';
import { StreakCounter } from '../components/gamification/StreakCounter';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useUserStore } from '../store/userStore';
import { useSessionStore } from '../store/sessionStore';
import { speakingModes } from '../data/modes';
import { prompts } from '../data/prompts';

export function Home() {
  const navigate = useNavigate();
  const [selectedModeId, setSelectedModeId] = useState<string | undefined>();
  const { totalSessions } = useUserStore();
  const { sessions } = useSessionStore();

  const handleStartPractice = () => {
    if (!selectedModeId) {
      alert('Please select a speaking mode first!');
      return;
    }

    // Get a random prompt for the selected mode
    const modePrompts = prompts.filter(p => p.modeId === selectedModeId);
    const randomPrompt = modePrompts[Math.floor(Math.random() * modePrompts.length)];

    navigate('/practice', {
      state: {
        modeId: selectedModeId,
        promptId: randomPrompt.id,
      }
    });
  };

  const recentSessions = sessions.slice(0, 3);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            🎤 SpeakUp
          </h1>
          <p className="text-xl text-white opacity-90">
            Your AI-Powered Public Speaking Coach
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <XPBar />
          </div>
          <div className="flex flex-col gap-4">
            <StreakCounter />
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-4xl font-bold text-primary-600">{totalSessions}</p>
            </Card>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Choose Your Practice Mode
            </h2>
            {selectedModeId && (
              <Button
                size="lg"
                onClick={handleStartPractice}
                className="animate-pulse"
              >
                Start Practice →
              </Button>
            )}
          </div>

          <ModeSelector
            modes={speakingModes}
            selectedModeId={selectedModeId}
            onSelectMode={setSelectedModeId}
          />

          {!selectedModeId && (
            <div className="text-center text-white text-sm opacity-75">
              ↑ Select a mode to begin your practice session
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentSessions.map((session, i) => {
                const mode = speakingModes.find(m => m.id === session.modeId);
                return (
                  <Card key={session.id} className="hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{mode?.icon}</div>
                      <div>
                        <h3 className="font-bold">{mode?.name}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(session.startTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Score</p>
                        <p className="text-2xl font-bold text-primary-600">
                          {session.score}/100
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">WPM</p>
                        <p className="text-2xl font-bold">
                          {Math.round(session.metrics.wordsPerMinute)}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {totalSessions === 0 && (
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 text-center">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-2xl font-bold mb-2">Welcome to SpeakUp!</h3>
            <p className="text-gray-700 mb-4">
              Select a speaking mode above and start your first practice session.
              Track your progress, earn achievements, and become a better speaker!
            </p>
            <div className="flex gap-4 justify-center text-sm">
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-semibold">✅ Real-time feedback</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-semibold">📊 Detailed analysis</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-semibold">🏆 Gamified learning</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
