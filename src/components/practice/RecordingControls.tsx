import React from 'react';
import { Button } from '../common/Button';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export function RecordingControls({
  isRecording,
  isPaused,
  onStart,
  onStop,
  onPause,
  onResume,
}: RecordingControlsProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      {!isRecording ? (
        <Button
          size="lg"
          onClick={onStart}
          className="px-12"
        >
          🎤 Start Practice
        </Button>
      ) : (
        <>
          {isPaused && onResume ? (
            <Button
              size="lg"
              onClick={onResume}
              variant="secondary"
            >
              ▶️ Resume
            </Button>
          ) : onPause ? (
            <Button
              size="lg"
              onClick={onPause}
              variant="secondary"
            >
              ⏸️ Pause
            </Button>
          ) : null}
          <Button
            size="lg"
            onClick={onStop}
            variant="danger"
            className="px-12"
          >
            ⏹️ Stop & Review
          </Button>
        </>
      )}
    </div>
  );
}
