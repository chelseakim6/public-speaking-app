import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '../types';
import { XP_LEVELS } from '../utils/constants';

interface UserStore extends UserProgress {
  addXP: (amount: number) => void;
  updateStreak: () => void;
  addSession: (duration: number) => void;
  updatePersonalBest: (modeId: string, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  reset: () => void;
}

const getInitialState = (): UserProgress => ({
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  lastPracticeDate: '',
  totalSessions: 0,
  totalPracticeTime: 0,
  achievements: [],
  personalBests: {},
});

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      addXP: (amount: number) => {
        set((state) => {
          let newXP = state.xp + amount;
          let newLevel = state.level;
          let xpToNext = state.xpToNextLevel;

          // Check for level up
          while (newLevel < XP_LEVELS.length) {
            const nextLevelData = XP_LEVELS.find(l => l.level === newLevel + 1);
            if (nextLevelData && newXP >= nextLevelData.xpRequired) {
              newLevel++;
              xpToNext = XP_LEVELS.find(l => l.level === newLevel + 1)?.xpRequired || 999999;
            } else {
              break;
            }
          }

          return {
            xp: newXP,
            level: newLevel,
            xpToNextLevel: xpToNext,
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toDateString();
          const lastDate = new Date(state.lastPracticeDate).toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString();

          let newStreak = state.streak;

          if (lastDate === today) {
            // Already practiced today, keep streak
            return state;
          } else if (lastDate === yesterday) {
            // Practiced yesterday, increment streak
            newStreak = state.streak + 1;
          } else {
            // Streak broken, reset to 1
            newStreak = 1;
          }

          return {
            streak: newStreak,
            lastPracticeDate: new Date().toISOString(),
          };
        });
      },

      addSession: (duration: number) => {
        set((state) => ({
          totalSessions: state.totalSessions + 1,
          totalPracticeTime: state.totalPracticeTime + duration,
        }));
      },

      updatePersonalBest: (modeId: string, score: number) => {
        set((state) => {
          const currentBest = state.personalBests[modeId] || 0;
          if (score > currentBest) {
            return {
              personalBests: {
                ...state.personalBests,
                [modeId]: score,
              },
            };
          }
          return state;
        });
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          if (!state.achievements.includes(achievementId)) {
            return {
              achievements: [...state.achievements, achievementId],
            };
          }
          return state;
        });
      },

      reset: () => set(getInitialState()),
    }),
    {
      name: 'user-progress',
    }
  )
);
