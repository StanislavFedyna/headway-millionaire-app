import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useAnswerHandling } from '../useAnswerHandling';

// Mock the useGame hook
vi.mock('@/context', () => ({
  useGame: vi.fn(() => ({
    onWrongAnswer: vi.fn(),
  })),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock useGameSounds hook
vi.mock('../useGameSounds', () => ({
  useGameSounds: vi.fn(() => ({
    playSound: vi.fn(),
  })),
}));

describe('useAnswerHandling', () => {
  const mockQuestion = {
    id: 'q1',
    text: 'What is the capital of France?',
    moneyValue: 500,
    minCorrectAnswersCount: 1,
    answers: [
      { id: 'a1', text: 'London', isCorrect: false },
      { id: 'a2', text: 'Berlin', isCorrect: false },
      { id: 'a3', text: 'Paris', isCorrect: true },
      { id: 'a4', text: 'Madrid', isCorrect: false },
    ],
  };

  const mockProps = {
    question: mockQuestion,
    hasNextQuestion: true,
    onNextQuestion: vi.fn(),
    onGameOver: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty selected answers', () => {
    const { result } = renderHook(() => useAnswerHandling(mockProps));

    expect(result.current.selectedAnswers).toEqual([]);
    expect(result.current.isRevealed).toBe(false);
  });

  it('should handle answer selection', () => {
    const { result } = renderHook(() => useAnswerHandling(mockProps));

    act(() => {
      result.current.handleAnswerSelect('a1');
    });

    expect(result.current.selectedAnswers).toEqual(['a1']);
  });

  it('should correctly identify correct answers', () => {
    const { result } = renderHook(() => useAnswerHandling(mockProps));

    expect(result.current.isAnswerCorrect('a3')).toBe(true);
    expect(result.current.isAnswerCorrect('a1')).toBe(false);
  });

  it('should handle correct answer with next question', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAnswerHandling(mockProps));

    act(() => {
      result.current.handleAnswerSelect('a3');
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(mockProps.onNextQuestion).toHaveBeenCalledWith(500);
  });

  it('should handle correct answer on last question', () => {
    vi.useFakeTimers();
    const lastQuestionProps = {
      ...mockProps,
      hasNextQuestion: false,
    };

    const { result } = renderHook(() => useAnswerHandling(lastQuestionProps));

    act(() => {
      result.current.handleAnswerSelect('a3');
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(lastQuestionProps.onGameOver).toHaveBeenCalledWith(500);
  });

  it('should not proceed if not enough answers are selected', () => {
    const multipleCorrectQuestion = {
      ...mockQuestion,
      minCorrectAnswersCount: 2,
      answers: [
        { id: 'a1', text: 'Answer 1', isCorrect: true },
        { id: 'a2', text: 'Answer 2', isCorrect: true },
        { id: 'a3', text: 'Answer 3', isCorrect: false },
        { id: 'a4', text: 'Answer 4', isCorrect: false },
      ],
    };

    const props = {
      ...mockProps,
      question: multipleCorrectQuestion,
    };

    const { result } = renderHook(() => useAnswerHandling(props));

    act(() => {
      result.current.handleAnswerSelect('a1');
    });

    expect(result.current.isRevealed).toBe(false);
    expect(props.onNextQuestion).not.toHaveBeenCalled();
  });
});
