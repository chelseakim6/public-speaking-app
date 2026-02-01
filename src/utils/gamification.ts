import { UserProgress, SessionData } from '../types';
import { achievements } from '../data/achievements';
import { XP_REWARDS, XP_LEVELS } from './constants';

export function calculateSessionXP(
  score: number,
  metrics: SessionData['metrics'],
  userProgress: UserProgress
): { xp: number; bonuses: string[] } {
  let totalXP = XP_REWARDS.SESSION_COMPLETE;
  const bonuses: string[] = [];

  // Score bonuses
  if (score >= 90) {
    totalXP += XP_REWARDS.PERFECT_SCORE_BONUS;
    bonuses.push(`Perfect Score: +${XP_REWARDS.PERFECT_SCORE_BONUS} XP`);
  } else if (score >= 80) {
    totalXP += XP_REWARDS.HIGH_SCORE_BONUS;
    bonuses.push(`High Score: +${XP_REWARDS.HIGH_SCORE_BONUS} XP`);
  }

  // Filler word bonus
  if (metrics.totalFillerWords === 0) {
    totalXP += XP_REWARDS.ZERO_FILLER_WORDS;
    bonuses.push(`Zero Filler Words: +${XP_REWARDS.ZERO_FILLER_WORDS} XP`);
  }

  // Optimal pace bonus
  if (metrics.wordsPerMinute >= 120 && metrics.wordsPerMinute <= 150) {
    totalXP += XP_REWARDS.OPTIMAL_PACE;
    bonuses.push(`Optimal Pace: +${XP_REWARDS.OPTIMAL_PACE} XP`);
  }

  // Streak bonuses (check the updated streak)
  const newStreak = calculateNewStreak(userProgress);
  if (newStreak === 3) {
    totalXP += XP_REWARDS.STREAK_3_DAY;
    bonuses.push(`3-Day Streak: +${XP_REWARDS.STREAK_3_DAY} XP`);
  } else if (newStreak === 7) {
    totalXP += XP_REWARDS.STREAK_7_DAY;
    bonuses.push(`7-Day Streak: +${XP_REWARDS.STREAK_7_DAY} XP`);
  }

  return { xp: totalXP, bonuses };
}

export function checkNewAchievements(
  userProgress: UserProgress,
  sessions: SessionData[]
): string[] {
  const newAchievements: string[] = [];

  for (const achievement of achievements) {
    if (!userProgress.achievements.includes(achievement.id)) {
      if (achievement.requirement(userProgress, sessions)) {
        newAchievements.push(achievement.id);
      }
    }
  }

  return newAchievements;
}

export function getLevelName(level: number): string {
  const levelData = XP_LEVELS.find(l => l.level === level);
  return levelData?.name || 'Unknown';
}

export function getXPForNextLevel(currentLevel: number): number {
  const nextLevel = XP_LEVELS.find(l => l.level === currentLevel + 1);
  return nextLevel?.xpRequired || 999999;
}

export function calculateNewStreak(userProgress: UserProgress): number {
  const today = new Date().toDateString();
  const lastDate = userProgress.lastPracticeDate
    ? new Date(userProgress.lastPracticeDate).toDateString()
    : '';
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastDate === today) {
    return userProgress.streak;
  } else if (lastDate === yesterday) {
    return userProgress.streak + 1;
  } else {
    return 1;
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 80) return 'text-blue-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 60) return 'text-orange-500';
  return 'text-red-500';
}

export function getScoreEmoji(score: number): string {
  if (score >= 90) return '🎉';
  if (score >= 80) return '🟢';
  if (score >= 70) return '🟡';
  if (score >= 60) return '🟠';
  return '🔴';
}

export function getMetricStatus(
  value: number,
  optimal: { min: number; max: number }
): 'good' | 'warning' | 'bad' {
  if (value >= optimal.min && value <= optimal.max) return 'good';
  if (
    value >= optimal.min * 0.8 &&
    value <= optimal.max * 1.2
  ) return 'warning';
  return 'bad';
}
