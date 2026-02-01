import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SessionData, LiveMetrics } from '../types';

interface SessionStore {
  currentSession: SessionData | null;
  liveMetrics: LiveMetrics;
  sessions: SessionData[];
  startSession: (modeId: string, promptId: string) => void;
  updateLiveMetrics: (metrics: Partial<LiveMetrics>) => void;
  endSession: (
    transcript: string,
    metrics: SessionData['metrics'],
    score: number,
    scoreBreakdown: SessionData['scoreBreakdown']
  ) => void;
  clearCurrentSession: () => void;
}

const initialLiveMetrics: LiveMetrics = {
  currentWPM: 0,
  fillerWordCount: 0,
  currentVolume: 0,
  isRecording: false,
  elapsedTime: 0,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      liveMetrics: initialLiveMetrics,
      sessions: [],

      startSession: (modeId: string, promptId: string) => {
        const session: SessionData = {
          id: `session_${Date.now()}`,
          modeId,
          promptId,
          startTime: Date.now(),
          transcript: '',
          metrics: {
            wordsPerMinute: 0,
            fillerWords: [],
            totalFillerWords: 0,
            pauses: [],
            averagePauseLength: 0,
            volumeLevels: [],
            averageVolume: 0,
            uniqueWords: 0,
            totalWords: 0,
            wordVarietyPercent: 0,
          },
        };

        set({
          currentSession: session,
          liveMetrics: { ...initialLiveMetrics, isRecording: true },
        });
      },

      updateLiveMetrics: (metrics: Partial<LiveMetrics>) => {
        set((state) => ({
          liveMetrics: { ...state.liveMetrics, ...metrics },
        }));
      },

      endSession: (transcript, metrics, score, scoreBreakdown) => {
        set((state) => {
          if (!state.currentSession) return state;

          const completedSession: SessionData = {
            ...state.currentSession,
            endTime: Date.now(),
            transcript,
            metrics,
            score,
            scoreBreakdown,
          };

          return {
            currentSession: null,
            liveMetrics: initialLiveMetrics,
            sessions: [completedSession, ...state.sessions].slice(0, 50), // Keep last 50 sessions
          };
        });
      },

      clearCurrentSession: () => {
        set({
          currentSession: null,
          liveMetrics: initialLiveMetrics,
        });
      },
    }),
    {
      name: 'session-data',
      partialize: (state) => ({ sessions: state.sessions }), // Only persist completed sessions
    }
  )
);
