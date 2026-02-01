import React from 'react';
import { Prompt } from '../../types';
import { Card } from '../common/Card';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex items-start gap-4">
        <div className="text-4xl">💬</div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg">Your Prompt</h3>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {Math.floor(prompt.duration / 60)}:{(prompt.duration % 60).toString().padStart(2, '0')} min
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{prompt.text}</p>
        </div>
      </div>
    </Card>
  );
}
