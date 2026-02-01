import React from 'react';
import { Achievement } from '../../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
}

export function AchievementBadge({ achievement, unlocked }: AchievementBadgeProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 text-center transition-all ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400'
          : 'bg-gray-100 border-gray-300 opacity-50'
      }`}
    >
      <div className="text-4xl mb-2 filter grayscale-0">
        {unlocked ? achievement.icon : '🔒'}
      </div>
      <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
      <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
      <span className="text-xs font-semibold text-yellow-700">
        +{achievement.xpReward} XP
      </span>
    </div>
  );
}
