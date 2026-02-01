export interface SpeakingMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
  scoreWeights: ScoreWeights;
}

export interface ScoreWeights {
  pace: number;
  clarity: number;
  consistency: number;
  pauses: number;
  volume: number;
  wordVariety: number;
}

export interface Prompt {
  id: string;
  modeId: string;
  text: string;
  duration: number; // in seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SessionData {
  id: string;
  modeId: string;
  promptId: string;
  startTime: number;
  endTime?: number;
  transcript: string;
  metrics: SessionMetrics;
  score?: number;
  scoreBreakdown?: ScoreBreakdown;
}

export interface SessionMetrics {
  wordsPerMinute: number;
  fillerWords: FillerWordCount[];
  totalFillerWords: number;
  pauses: Pause[];
  averagePauseLength: number;
  volumeLevels: number[];
  averageVolume: number;
  uniqueWords: number;
  totalWords: number;
  wordVarietyPercent: number;
}

export interface FillerWordCount {
  word: string;
  count: number;
}

export interface Pause {
  startTime: number;
  duration: number;
}

export interface ScoreBreakdown {
  pace: number;
  clarity: number;
  consistency: number;
  pauses: number;
  volume: number;
  wordVariety: number;
  total: number;
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastPracticeDate: string;
  totalSessions: number;
  totalPracticeTime: number;
  achievements: string[];
  personalBests: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (progress: UserProgress, sessions: SessionData[]) => boolean;
  xpReward: number;
}

export interface LiveMetrics {
  currentWPM: number;
  fillerWordCount: number;
  currentVolume: number;
  isRecording: boolean;
  elapsedTime: number;
}
