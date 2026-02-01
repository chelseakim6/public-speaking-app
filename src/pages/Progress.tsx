import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { XPBar } from '../components/gamification/XPBar';
import { AchievementBadge } from '../components/gamification/AchievementBadge';
import { useUserStore } from '../store/userStore';
import { useSessionStore } from '../store/sessionStore';
import { achievements } from '../data/achievements';
import { speakingModes } from '../data/modes';

export function Progress() {
  const navigate = useNavigate();
  const userProgress = useUserStore();
  const { sessions } = useSessionStore();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Your Progress</h1>
          <Button onClick={() => navigate('/')}>← Back to Home</Button>
        </div>

        {/* XP Bar */}
        <XPBar />

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
            <p className="text-4xl font-bold text-primary-600">{userProgress.totalSessions}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-1">Practice Time</p>
            <p className="text-4xl font-bold text-primary-600">
              {Math.round(userProgress.totalPracticeTime / 60)}
            </p>
            <p className="text-xs text-gray-500">minutes</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-1">Current Streak</p>
            <p className="text-4xl font-bold text-orange-600">{userProgress.streak}</p>
            <p className="text-xs text-gray-500">days</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-gray-600 mb-1">Achievements</p>
            <p className="text-4xl font-bold text-yellow-600">
              {userProgress.achievements.length}
            </p>
            <p className="text-xs text-gray-500">/ {achievements.length}</p>
          </Card>
        </div>

        {/* Personal Bests */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">🏆 Personal Bests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {speakingModes.map(mode => {
              const best = userProgress.personalBests[mode.id];
              return (
                <div key={mode.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{mode.icon}</span>
                    <h3 className="font-semibold">{mode.name}</h3>
                  </div>
                  {best ? (
                    <p className="text-3xl font-bold text-primary-600">{best}/100</p>
                  ) : (
                    <p className="text-gray-400 italic">Not practiced yet</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">🎖️ Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map(achievement => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={userProgress.achievements.includes(achievement.id)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
