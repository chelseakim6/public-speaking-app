import React from 'react';
import { SessionData } from '../../types';
import { Card } from '../common/Card';
import { getScoreColor, getScoreEmoji } from '../../utils/gamification';
import { OPTIMAL_WPM_MIN, OPTIMAL_WPM_MAX } from '../../utils/constants';

interface SessionReportProps {
  session: SessionData;
  xpEarned: number;
  bonuses: string[];
  newAchievements: string[];
}

export function SessionReport({ session, xpEarned, bonuses, newAchievements }: SessionReportProps) {
  const { score = 0, scoreBreakdown, metrics } = session;

  const getComponentStatus = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return '✅';
    if (percentage >= 60) return '⚠️';
    return '❌';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="text-center bg-gradient-to-br from-purple-50 to-blue-50">
        <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
        <div className={`text-7xl font-bold mb-2 ${getScoreColor(score)}`}>
          {score}
          <span className="text-4xl">/100</span>
        </div>
        <div className="text-5xl mb-4">{getScoreEmoji(score)}</div>
        <div className="text-lg font-semibold text-green-600">
          +{xpEarned} XP Earned
        </div>
      </Card>

      {/* Bonuses */}
      {bonuses.length > 0 && (
        <Card className="bg-yellow-50">
          <h3 className="font-bold text-lg mb-3">🎁 Bonuses</h3>
          <div className="space-y-1">
            {bonuses.map((bonus, i) => (
              <div key={i} className="text-sm text-yellow-800">
                • {bonus}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* New Achievements */}
      {newAchievements.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100">
          <h3 className="font-bold text-lg mb-3">🏆 New Achievements Unlocked!</h3>
          <div className="space-y-2">
            {newAchievements.map((achievementId, i) => (
              <div key={i} className="text-sm font-semibold text-orange-800">
                ⭐ {achievementId}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Score Breakdown */}
      {scoreBreakdown && (
        <Card>
          <h3 className="font-bold text-lg mb-4">📊 Detailed Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.pace, 20)} Pace
              </span>
              <span className="font-bold">{scoreBreakdown.pace}/20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.clarity, 25)} Clarity
              </span>
              <span className="font-bold">{scoreBreakdown.clarity}/25</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.consistency, 15)} Consistency
              </span>
              <span className="font-bold">{scoreBreakdown.consistency}/15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.pauses, 15)} Pauses
              </span>
              <span className="font-bold">{scoreBreakdown.pauses}/15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.volume, 10)} Volume
              </span>
              <span className="font-bold">{scoreBreakdown.volume}/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {getComponentStatus(scoreBreakdown.wordVariety, 15)} Word Variety
              </span>
              <span className="font-bold">{scoreBreakdown.wordVariety}/15</span>
            </div>
          </div>
        </Card>
      )}

      {/* Key Metrics */}
      <Card>
        <h3 className="font-bold text-lg mb-4">📈 Key Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Words Per Minute</p>
            <p className="text-2xl font-bold">{Math.round(metrics.wordsPerMinute)}</p>
            <p className="text-xs text-gray-500">
              Target: {OPTIMAL_WPM_MIN}-{OPTIMAL_WPM_MAX}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Filler Words</p>
            <p className="text-2xl font-bold">{metrics.totalFillerWords}</p>
            <p className="text-xs text-gray-500">Total detected</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Word Variety</p>
            <p className="text-2xl font-bold">
              {Math.round(metrics.wordVarietyPercent * 100)}%
            </p>
            <p className="text-xs text-gray-500">{metrics.uniqueWords} unique words</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg Pause</p>
            <p className="text-2xl font-bold">
              {metrics.averagePauseLength.toFixed(1)}s
            </p>
            <p className="text-xs text-gray-500">{metrics.pauses.length} pauses</p>
          </div>
        </div>
      </Card>

      {/* Top Filler Words */}
      {metrics.fillerWords.length > 0 && (
        <Card>
          <h3 className="font-bold text-lg mb-4">🚫 Top Filler Words</h3>
          <div className="space-y-2">
            {metrics.fillerWords.slice(0, 5).map((fw, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="font-medium">"{fw.word}"</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {fw.count}x
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-blue-50">
        <h3 className="font-bold text-lg mb-3">💡 Tips for Improvement</h3>
        <div className="space-y-2 text-sm">
          {metrics.wordsPerMinute < OPTIMAL_WPM_MIN && (
            <p>• Try speaking a bit faster - aim for {OPTIMAL_WPM_MIN}-{OPTIMAL_WPM_MAX} WPM</p>
          )}
          {metrics.wordsPerMinute > OPTIMAL_WPM_MAX && (
            <p>• Slow down slightly - your pace is too fast</p>
          )}
          {metrics.totalFillerWords > 5 && (
            <p>• Pause instead of using filler words like "um" or "like"</p>
          )}
          {metrics.wordVarietyPercent < 0.6 && (
            <p>• Expand your vocabulary - try using more varied words</p>
          )}
          {metrics.averagePauseLength > 3 && (
            <p>• Your pauses are too long - keep the flow going</p>
          )}
          {score >= 80 && (
            <p className="text-green-700 font-semibold">
              • Great job! Keep practicing to maintain this level
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
