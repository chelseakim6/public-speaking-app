import { Prompt } from '../types';

export const prompts: Prompt[] = [
  // Presentation Mode
  {
    id: 'pres-1',
    modeId: 'presentation',
    text: 'Present your product or service to potential customers. Explain what it does, who it helps, and why they should care.',
    duration: 120,
    difficulty: 'beginner',
  },
  {
    id: 'pres-2',
    modeId: 'presentation',
    text: 'Present quarterly results to your team. Share key metrics, achievements, and goals for the next quarter.',
    duration: 180,
    difficulty: 'intermediate',
  },
  {
    id: 'pres-3',
    modeId: 'presentation',
    text: 'Teach a concept from your field of expertise to a beginner audience. Make it clear and engaging.',
    duration: 150,
    difficulty: 'intermediate',
  },

  // Interview Mode
  {
    id: 'int-1',
    modeId: 'interview',
    text: 'Tell me about yourself and why you\'re interested in this position.',
    duration: 90,
    difficulty: 'beginner',
  },
  {
    id: 'int-2',
    modeId: 'interview',
    text: 'Describe a challenging situation you faced at work and how you overcame it.',
    duration: 120,
    difficulty: 'intermediate',
  },
  {
    id: 'int-3',
    modeId: 'interview',
    text: 'Why should we hire you over other candidates? What unique value do you bring?',
    duration: 90,
    difficulty: 'intermediate',
  },

  // Small Talk Mode
  {
    id: 'small-1',
    modeId: 'smalltalk',
    text: 'Chat casually about what you did this past weekend.',
    duration: 60,
    difficulty: 'beginner',
  },
  {
    id: 'small-2',
    modeId: 'smalltalk',
    text: 'Talk about a hobby or interest you\'re passionate about.',
    duration: 90,
    difficulty: 'beginner',
  },
  {
    id: 'small-3',
    modeId: 'smalltalk',
    text: 'Discuss a recent book, movie, or show you enjoyed and recommend it to someone.',
    duration: 90,
    difficulty: 'intermediate',
  },

  // Pitch Mode
  {
    id: 'pitch-1',
    modeId: 'pitch',
    text: 'Pitch a business idea you have in 60 seconds. What problem does it solve?',
    duration: 60,
    difficulty: 'intermediate',
  },
  {
    id: 'pitch-2',
    modeId: 'pitch',
    text: 'Sell your favorite product to someone who\'s never heard of it. Make them want to buy it!',
    duration: 90,
    difficulty: 'beginner',
  },
  {
    id: 'pitch-3',
    modeId: 'pitch',
    text: 'Convince an investor to fund your startup. Explain the opportunity, your solution, and why now.',
    duration: 120,
    difficulty: 'advanced',
  },

  // Storytelling Mode
  {
    id: 'story-1',
    modeId: 'storytelling',
    text: 'Tell a personal story about a time you learned an important lesson.',
    duration: 120,
    difficulty: 'beginner',
  },
  {
    id: 'story-2',
    modeId: 'storytelling',
    text: 'Describe a memorable travel experience. What made it special?',
    duration: 150,
    difficulty: 'intermediate',
  },
  {
    id: 'story-3',
    modeId: 'storytelling',
    text: 'Share a story about overcoming a significant challenge or obstacle in your life.',
    duration: 180,
    difficulty: 'intermediate',
  },
];
