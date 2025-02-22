'use client';

import type React from 'react';
import { redirect } from 'next/navigation';
import { createContext, useContext, useMemo, useState } from 'react';

import { Question } from '@/schemas';
import { useGameConfig } from '@/hooks';
import { PAGE_URLS } from '@/constants';

/**
 * Interface defining the shape of the game context
 */
interface GameContextType {
  /** Callback for handling game over state with final money value */
  onGameOver: (moneyValue: Question['moneyValue']) => void;
  /** Flag indicating if the game is over */
  isGameOver: boolean;
  /** Callback to reset the game state */
  onGameReset: () => void;
  /** Current total money earned */
  total: number;
  /** Current question index */
  questionIndex: number;
  /** Callback for handling progression to next question */
  onNextQuestion: (moneyValue: Question['moneyValue']) => void;
  /** Callback for handling wrong answer */
  onWrongAnswer: () => void;
}

/**
 * Context for managing the game state
 * @see GameProvider for the implementation
 */
export const GameContext = createContext<GameContextType | null>(null);

const INITIAL_TOTAL = 0;
const INITIAL_QUESTION_INDEX = 0;

interface GameProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that manages the game state and logic
 *
 * @component
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <GameProvider>
 *       <Game />
 *     </GameProvider>
 *   );
 * }
 * ```
 */
export const GameProvider = ({ children }: GameProviderProps) => {
  const { config } = useGameConfig();
  const [questionIndex, setQuestionIndex] = useState(INITIAL_QUESTION_INDEX);
  const [total, setTotal] = useState(INITIAL_TOTAL);
  const [isGameOver, setIsGameOver] = useState(false);

  /**
   * Handles progression to the next question
   */
  const onNextQuestion = (moneyValue: Question['moneyValue']) => {
    if (config && questionIndex === config.questions.length - 1) {
      setIsGameOver(true);
      setTotal(moneyValue);

      redirect(PAGE_URLS.GAME_OVER);

      return;
    }

    setTotal(moneyValue);
    setQuestionIndex((prev) => prev + 1);
  };

  /**
   * Handles wrong answer scenario
   * Sets the total to the previous question's money value
   */
  const onWrongAnswer = () => {
    if (config) {
      const previousQuestionIndex = questionIndex - 1;

      const previousMoneyValue =
        previousQuestionIndex >= 0
          ? config.questions[previousQuestionIndex].moneyValue
          : 0;

      setTotal(previousMoneyValue);
      setIsGameOver(true);

      redirect(PAGE_URLS.GAME_OVER);
    }
  };

  /**
   * Resets the game state to initial values
   */
  const onGameReset = () => {
    setQuestionIndex(INITIAL_QUESTION_INDEX);
    setTotal(INITIAL_TOTAL);
    setIsGameOver(false);
  };

  /**
   * Handles game over state with the final score
   */
  const onGameOver = async (moneyValue: Question['moneyValue']) => {
    setTotal(moneyValue);
    setIsGameOver(true);
  };

  const values = useMemo(
    () => ({
      total,
      questionIndex,
      isGameOver,
      onNextQuestion,
      onGameReset,
      onGameOver,
      onWrongAnswer,
    }),
    [isGameOver, onNextQuestion, onWrongAnswer, questionIndex, total],
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return context;
};
