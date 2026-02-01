import React from 'react';
import { LiveMetrics } from '../../types';
import { OPTIMAL_WPM_MIN, OPTIMAL_WPM_MAX, VOLUME_LOW_THRESHOLD, VOLUME_HIGH_THRESHOLD } from '../../utils/constants';

interface LiveFeedbackProps {
  metrics: LiveMetrics;
}

export function LiveFeedback({ metrics }: LiveFeedbackProps) {
  const getWPMStatus = (wpm: number) => {
    if (wpm >= OPTIMAL_WPM_MIN && wpm <= OPTIMAL_WPM_MAX) return 'good';
    if (wpm === 0) return 'neutral';
    return 'warning';
  };

  const getVolumeStatus = (volume: number) => {
    if (volume >= VOLUME_LOW_THRESHOLD && volume <= VOLUME_HIGH_THRESHOLD) return 'good';
    if (volume === 0) return 'neutral';
    return volume < VOLUME_LOW_THRESHOLD ? 'warning' : 'bad';
  };

  const getFillerStatus = (count: number, time: number) => {
    if (time === 0) return 'neutral';
    const rate = count / (time / 60); // Per minute
    if (rate === 0) return 'good';
    if (rate < 3) return 'warning';
    return 'bad';
  };

  const statusColors = {
    good: 'bg-green-100 border-green-400 text-green-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    bad: 'bg-red-100 border-red-400 text-red-800',
    neutral: 'bg-gray-100 border-gray-300 text-gray-600',
  };

  const statusIcons = {
    good: '🟢',
    warning: '🟡',
    bad: '🔴',
    neutral: '⚪',
  };

  const wpmStatus = getWPMStatus(metrics.currentWPM);
  const volumeStatus = getVolumeStatus(metrics.currentVolume);
  const fillerStatus = getFillerStatus(metrics.fillerWordCount, metrics.elapsedTime);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Pace */}
      <div className={`p-4 rounded-lg border-2 ${statusColors[wpmStatus]}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Pace</span>
          <span className="text-2xl">{statusIcons[wpmStatus]}</span>
        </div>
        <div className="text-3xl font-bold mb-1">{metrics.currentWPM}</div>
        <div className="text-sm">WPM</div>
        <div className="text-xs mt-1 opacity-75">
          Target: {OPTIMAL_WPM_MIN}-{OPTIMAL_WPM_MAX}
        </div>
      </div>

      {/* Filler Words */}
      <div className={`p-4 rounded-lg border-2 ${statusColors[fillerStatus]}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Filler Words</span>
          <span className="text-2xl">{statusIcons[fillerStatus]}</span>
        </div>
        <div className="text-3xl font-bold mb-1">{metrics.fillerWordCount}</div>
        <div className="text-sm">Total detected</div>
        <div className="text-xs mt-1 opacity-75">
          {metrics.elapsedTime > 0
            ? `${((metrics.fillerWordCount / (metrics.elapsedTime / 60)) || 0).toFixed(1)}/min`
            : 'Starting...'}
        </div>
      </div>

      {/* Volume */}
      <div className={`p-4 rounded-lg border-2 ${statusColors[volumeStatus]}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Volume</span>
          <span className="text-2xl">{statusIcons[volumeStatus]}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-8 mb-2">
          <div
            className="bg-current h-8 rounded-full transition-all duration-100"
            style={{ width: `${metrics.currentVolume * 100}%` }}
          />
        </div>
        <div className="text-sm">
          {metrics.currentVolume === 0 && 'Waiting...'}
          {volumeStatus === 'good' && 'Great!'}
          {volumeStatus === 'warning' && metrics.currentVolume < VOLUME_LOW_THRESHOLD && 'Speak up!'}
          {volumeStatus === 'bad' && 'Too loud!'}
        </div>
      </div>
    </div>
  );
}
