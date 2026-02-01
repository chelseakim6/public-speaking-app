import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first practice session',
    icon: '🎯',
    requirement: (progress) => progress.totalSessions >= 1,
    xpReward: 25,
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: 'Maintain a 3-day practice streak',
    icon: '🔥',
    requirement: (progress) => progress.streak >= 3,
    xpReward: 50,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day practice streak',
    icon: '⚡',
    requirement: (progress) => progress.streak >= 7,
    xpReward: 100,
  },
  {
    id: 'flawless',
    name: 'Flawless',
    description: 'Score 90+ in any mode',
    icon: '💎',
    requirement: (progress) => {
      return Object.values(progress.personalBests).some(score => score >= 90);
    },
    xpReward: 75,
  },
  {
    id: 'versatile',
    name: 'Versatile',
    description: 'Try all 5 speaking modes',
    icon: '🎤',
    requirement: (progress, sessions) => {
      const uniqueModes = new Set(sessions.map(s => s.modeId));
      return uniqueModes.size >= 5;
    },
    xpReward: 60,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Maintain 140-160 WPM for an entire session',
    icon: '🚀',
    requirement: (progress, sessions) => {
      return sessions.some(s =>
        s.metrics.wordsPerMinute >= 140 &&
        s.metrics.wordsPerMinute <= 160
      );
    },
    xpReward: 50,
  },
  {
    id: 'smooth-talker',
    name: 'Smooth Talker',
    description: 'Complete a session with less than 3 filler words',
    icon: '🤐',
    requirement: (progress, sessions) => {
      return sessions.some(s => s.metrics.totalFillerWords < 3);
    },
    xpReward: 65,
  },
  {
    id: 'improver',
    name: 'Improver',
    description: 'Beat your personal best by 20 points',
    icon: '📊',
    requirement: (progress, sessions) => {
      for (const modeId in progress.personalBests) {
        const modeSessions = sessions
          .filter(s => s.modeId === modeId && s.score)
          .sort((a, b) => (b.score || 0) - (a.score || 0));

        if (modeSessions.length >= 2) {
          const best = modeSessions[0].score || 0;
          const secondBest = modeSessions[1].score || 0;
          if (best - secondBest >= 20) return true;
        }
      }
      return false;
    },
    xpReward: 70,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Complete 10 practice sessions',
    icon: '🎓',
    requirement: (progress) => progress.totalSessions >= 10,
    xpReward: 100,
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Complete 50 practice sessions',
    icon: '👑',
    requirement: (progress) => progress.totalSessions >= 50,
    xpReward: 250,
  },
];
