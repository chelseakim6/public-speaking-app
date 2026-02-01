import { FILLER_WORDS, AWKWARD_PAUSE_THRESHOLD, NATURAL_PAUSE_MIN } from './constants';
import { SessionMetrics, FillerWordCount, Pause } from '../types';

export function analyzeTranscript(
  transcript: string,
  duration: number,
  pauses: Pause[],
  volumeLevels: number[]
): SessionMetrics {
  const words = transcript.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  const wordsPerMinute = duration > 0 ? (totalWords / duration) * 60 : 0;

  // Analyze filler words
  const fillerWordCounts = analyzeFillerWords(transcript);
  const totalFillerWords = fillerWordCounts.reduce((sum, fw) => sum + fw.count, 0);

  // Analyze pauses
  const validPauses = pauses.filter(p => p.duration >= NATURAL_PAUSE_MIN);
  const averagePauseLength = validPauses.length > 0
    ? validPauses.reduce((sum, p) => sum + p.duration, 0) / validPauses.length
    : 0;

  // Analyze volume
  const averageVolume = volumeLevels.length > 0
    ? volumeLevels.reduce((sum, v) => sum + v, 0) / volumeLevels.length
    : 0;

  // Analyze word variety
  const uniqueWords = new Set(words.filter(w => !FILLER_WORDS.includes(w))).size;
  const wordVarietyPercent = totalWords > 0 ? uniqueWords / totalWords : 0;

  return {
    wordsPerMinute,
    fillerWords: fillerWordCounts,
    totalFillerWords,
    pauses: validPauses,
    averagePauseLength,
    volumeLevels,
    averageVolume,
    uniqueWords,
    totalWords,
    wordVarietyPercent,
  };
}

export function analyzeFillerWords(transcript: string): FillerWordCount[] {
  const lowerTranscript = transcript.toLowerCase();
  const counts: Record<string, number> = {};

  FILLER_WORDS.forEach(fillerWord => {
    // Use word boundaries to avoid partial matches
    const regex = new RegExp(`\\b${fillerWord}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    const count = matches ? matches.length : 0;
    if (count > 0) {
      counts[fillerWord] = count;
    }
  });

  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

export function detectPauses(
  transcript: string,
  timestamps: number[]
): Pause[] {
  const pauses: Pause[] = [];

  for (let i = 1; i < timestamps.length; i++) {
    const duration = (timestamps[i] - timestamps[i - 1]) / 1000; // Convert to seconds
    if (duration >= NATURAL_PAUSE_MIN) {
      pauses.push({
        startTime: timestamps[i - 1],
        duration,
      });
    }
  }

  return pauses;
}

export function calculateLiveWPM(words: number, seconds: number): number {
  if (seconds === 0) return 0;
  return Math.round((words / seconds) * 60);
}

export function isAwkwardPause(duration: number): boolean {
  return duration >= AWKWARD_PAUSE_THRESHOLD;
}
