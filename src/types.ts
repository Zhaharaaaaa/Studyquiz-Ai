/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty?: 'mudah' | 'sedang' | 'sulit';
}

export interface SummaryResult {
  title: string;
  wordCount: number;
  complexity: 'Mudah' | 'Sedang' | 'Tinggi';
  readTime: string;
  bullets: string[];
  suggestedQuestions: QuizQuestion[];
}

export interface UserProfile {
  username: string;
  xp: number;
  streak: number;
  completedQuizzes: number;
  avatarSeed: string;
}
