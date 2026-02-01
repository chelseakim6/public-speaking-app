import React from 'react';
import { SpeakingMode } from '../../types';
import { Card } from '../common/Card';

interface ModeSelectorProps {
  modes: SpeakingMode[];
  selectedModeId?: string;
  onSelectMode: (modeId: string) => void;
}

export function ModeSelector({ modes, selectedModeId, onSelectMode }: ModeSelectorProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modes.map((mode) => (
        <Card
          key={mode.id}
          hover
          onClick={() => onSelectMode(mode.id)}
          className={`${
            selectedModeId === mode.id
              ? 'ring-4 ring-primary-500 bg-primary-50'
              : ''
          }`}
        >
          <div className="text-center">
            <div className="text-5xl mb-3">{mode.icon}</div>
            <h3 className="font-bold text-xl mb-2">{mode.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{mode.description}</p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {mode.focusAreas.map((area) => (
                <span
                  key={area}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                difficultyColors[mode.difficulty]
              }`}
            >
              {mode.difficulty.toUpperCase()}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
