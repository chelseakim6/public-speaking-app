import React from 'react';
import { useUserStore } from '../../store/userStore';

export function StreakCounter() {
  const { streak } = useUserStore();

  return (
    <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
      <span className="text-2xl">🔥</span>
      <div>
        <p className="text-sm font-semibold text-orange-800">{streak} Day Streak</p>
      </div>
    </div>
  );
}
