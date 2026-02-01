import {
  OPTIMAL_WPM_MIN,
  OPTIMAL_WPM_MAX,
  AWKWARD_PAUSE_THRESHOLD,
  VOLUME_LOW_THRESHOLD,
  VOLUME_HIGH_THRESHOLD,
  WORD_VARIETY_GOOD_THRESHOLD,
} from './constants';
import { SessionMetrics, ScoreWeights, ScoreBreakdown } from '../types';

export function calculateScore(
  metrics: SessionMetrics,
  weights: ScoreWeights
): { score: number; breakdown: ScoreBreakdown } {
  // Calculate individual component scores (0-100)
  const paceScore = calculatePaceScore(metrics.wordsPerMinute);
  const clarityScore = calculateClarityScore(metrics.totalFillerWords, metrics.totalWords);
  const consistencyScore = calculateConsistencyScore(metrics.wordsPerMinute);
  const pausesScore = calculatePausesScore(metrics.pauses, metrics.averagePauseLength);
  const volumeScore = calculateVolumeScore(metrics.averageVolume, metrics.volumeLevels);
  const wordVarietyScore = calculateWordVarietyScore(metrics.wordVarietyPercent);

  // Apply weights (weights are in percentages, sum to 100)
  const weightedScores = {
    pace: (paceScore * weights.pace) / 100,
    clarity: (clarityScore * weights.clarity) / 100,
    consistency: (consistencyScore * weights.consistency) / 100,
    pauses: (pausesScore * weights.pauses) / 100,
    volume: (volumeScore * weights.volume) / 100,
    wordVariety: (wordVarietyScore * weights.wordVariety) / 100,
  };

  const totalScore = Math.round(
    weightedScores.pace +
    weightedScores.clarity +
    weightedScores.consistency +
    weightedScores.pauses +
    weightedScores.volume +
    weightedScores.wordVariety
  );

  const breakdown: ScoreBreakdown = {
    pace: Math.round(weightedScores.pace),
    clarity: Math.round(weightedScores.clarity),
    consistency: Math.round(weightedScores.consistency),
    pauses: Math.round(weightedScores.pauses),
    volume: Math.round(weightedScores.volume),
    wordVariety: Math.round(weightedScores.wordVariety),
    total: totalScore,
  };

  return { score: totalScore, breakdown };
}

function calculatePaceScore(wpm: number): number {
  if (wpm >= OPTIMAL_WPM_MIN && wpm <= OPTIMAL_WPM_MAX) {
    return 100;
  }

  // Too slow
  if (wpm < OPTIMAL_WPM_MIN) {
    const diff = OPTIMAL_WPM_MIN - wpm;
    return Math.max(0, 100 - diff * 2); // Lose 2 points per WPM below optimal
  }

  // Too fast
  const diff = wpm - OPTIMAL_WPM_MAX;
  return Math.max(0, 100 - diff * 1.5); // Lose 1.5 points per WPM above optimal
}

function calculateClarityScore(fillerWords: number, totalWords: number): number {
  if (totalWords === 0) return 100;

  const fillerPercentage = (fillerWords / totalWords) * 100;

  if (fillerPercentage === 0) return 100;
  if (fillerPercentage <= 2) return 90;
  if (fillerPercentage <= 5) return 75;
  if (fillerPercentage <= 10) return 50;
  if (fillerPercentage <= 15) return 25;

  return Math.max(0, 10);
}

function calculateConsistencyScore(wpm: number): number {
  // For now, reward staying in optimal range
  // In a more advanced version, we'd track WPM variance over time
  if (wpm >= OPTIMAL_WPM_MIN && wpm <= OPTIMAL_WPM_MAX) {
    return 100;
  }
  return 70; // Default for out-of-range but we don't have variance data yet
}

function calculatePausesScore(
  pauses: { duration: number }[],
  averagePauseLength: number
): number {
  const awkwardPauses = pauses.filter(p => p.duration >= AWKWARD_PAUSE_THRESHOLD);
  const awkwardCount = awkwardPauses.length;

  if (awkwardCount === 0 && averagePauseLength > 0 && averagePauseLength < 2) {
    return 100; // Perfect natural pausing
  }

  if (awkwardCount === 0) return 85;
  if (awkwardCount <= 2) return 70;
  if (awkwardCount <= 4) return 50;
  if (awkwardCount <= 6) return 30;

  return Math.max(0, 20 - (awkwardCount - 6) * 5);
}

function calculateVolumeScore(
  averageVolume: number,
  volumeLevels: number[]
): number {
  if (volumeLevels.length === 0) return 100;

  // Check if volume is in optimal range
  if (averageVolume >= VOLUME_LOW_THRESHOLD && averageVolume <= VOLUME_HIGH_THRESHOLD) {
    // Check for consistency
    const variance = calculateVariance(volumeLevels);
    if (variance < 0.1) return 100;
    if (variance < 0.2) return 90;
    return 80;
  }

  if (averageVolume < VOLUME_LOW_THRESHOLD) {
    return Math.max(0, 50 - (VOLUME_LOW_THRESHOLD - averageVolume) * 100);
  }

  return Math.max(0, 50 - (averageVolume - VOLUME_HIGH_THRESHOLD) * 100);
}

function calculateWordVarietyScore(wordVarietyPercent: number): number {
  if (wordVarietyPercent >= WORD_VARIETY_GOOD_THRESHOLD) return 100;
  if (wordVarietyPercent >= 0.6) return 85;
  if (wordVarietyPercent >= 0.5) return 70;
  if (wordVarietyPercent >= 0.4) return 50;
  if (wordVarietyPercent >= 0.3) return 30;

  return Math.max(0, wordVarietyPercent * 100);
}

function calculateVariance(values: number[]): number {
  if (values.length === 0) return 0;

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
}
