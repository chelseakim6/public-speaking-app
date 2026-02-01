import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: string;
  height?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  current,
  max,
  label,
  color = 'bg-primary-600',
  height = 'h-4',
  showPercentage = false,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
