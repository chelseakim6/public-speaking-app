export const FILLER_WORDS = [
  'um', 'uh', 'like', 'you know', 'actually', 'basically', 'literally',
  'so', 'right', 'okay', 'well', 'yeah', 'kind of', 'sort of',
  'i mean', 'you see', 'you know what i mean'
];

export const OPTIMAL_WPM_MIN = 120;
export const OPTIMAL_WPM_MAX = 150;
export const IDEAL_WPM = 135;

export const AWKWARD_PAUSE_THRESHOLD = 3; // seconds
export const NATURAL_PAUSE_MIN = 0.5; // seconds
export const NATURAL_PAUSE_MAX = 2.5; // seconds

export const VOLUME_LOW_THRESHOLD = 0.3;
export const VOLUME_HIGH_THRESHOLD = 0.8;

export const WORD_VARIETY_GOOD_THRESHOLD = 0.7; // 70% unique words

export const XP_LEVELS = [
  { level: 1, name: 'Novice', xpRequired: 0 },
  { level: 2, name: 'Speaker', xpRequired: 100 },
  { level: 3, name: 'Presenter', xpRequired: 300 },
  { level: 4, name: 'Communicator', xpRequired: 600 },
  { level: 5, name: 'Expert', xpRequired: 1000 },
  { level: 6, name: 'Master', xpRequired: 1500 },
  { level: 7, name: 'Legend', xpRequired: 2500 },
];

export const XP_REWARDS = {
  SESSION_COMPLETE: 10,
  HIGH_SCORE_BONUS: 20, // 80+ score
  PERFECT_SCORE_BONUS: 30, // 90+ score
  STREAK_3_DAY: 25,
  STREAK_7_DAY: 50,
  DAILY_CHALLENGE: 30,
  ZERO_FILLER_WORDS: 15,
  OPTIMAL_PACE: 10,
};

export const DEFAULT_SCORE_WEIGHTS = {
  pace: 20,
  clarity: 25,
  consistency: 15,
  pauses: 15,
  volume: 10,
  wordVariety: 15,
};
