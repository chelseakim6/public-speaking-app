import React from 'react';
import { useUserStore } from '../../store/userStore';
import { ProgressBar } from '../common/ProgressBar';
import { getLevelName, getXPForNextLevel } from '../../utils/gamification';

export function XPBar() {
  const { level, xp, xpToNextLevel } = useUserStore();
  const levelName = getLevelName(level);
  const currentLevelXP = level > 1 ? getXPForNextLevel(level - 1) : 0;
  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForLevel = xpToNextLevel - currentLevelXP;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm opacity-90">Level {level}</p>
          <p className="font-bold text-lg">{levelName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">Total XP</p>
          <p className="font-bold text-lg">{xp}</p>
        </div>
      </div>
      <ProgressBar
        current={xpInCurrentLevel}
        max={xpNeededForLevel}
        color="bg-white"
        height="h-3"
        label={`${xpInCurrentLevel} / ${xpNeededForLevel} XP to next level`}
      />
    </div>
  );
}
