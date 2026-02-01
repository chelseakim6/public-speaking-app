import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptUpdate: (transcript: string, interimTranscript: string) => void;
  onEnd?: () => void;
}

export function useSpeechRecognition({
  onTranscriptUpdate,
  onEnd,
}: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');
  const isListeningRef = useRef(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;
      onTranscriptUpdate(finalTranscript, interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        // Don't stop on these errors, they're usually temporary
        return;
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        // Restart if we're still supposed to be listening
        try {
          recognition.start();
        } catch (e) {
          console.error('Error restarting recognition:', e);
        }
      } else {
        onEnd?.();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscriptUpdate, onEnd]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;

    finalTranscriptRef.current = '';
    isListeningRef.current = true;
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error('Error starting recognition:', e);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    isListeningRef.current = false;
    setIsListening(false);
    recognitionRef.current.stop();
  }, []);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}
