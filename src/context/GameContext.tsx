'use client';

import type React from 'react';
import { redirect } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

import { Question } from '@/schemas';
import { useGameConfig } from '@/hooks';
import { PAGE_URLS } from '@/constants';

interface GameContextType {
  onGameOver: (moneyValue: Question['moneyValue']) => void;
  isGameOver: boolean;
  onGameReset: () => void;
  total: number;
  questionIndex: number;
  onNextQuestion: (moneyValue: Question['moneyValue']) => void;
  onWrongAnswer: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const INITIAL_TOTAL = 0;
const INITIAL_QUESTION_INDEX = 0;

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const { config } = useGameConfig();
  const [questionIndex, setQuestionIndex] = useState(INITIAL_QUESTION_INDEX);
  const [total, setTotal] = useState(INITIAL_TOTAL);
  const [isGameOver, setIsGameOver] = useState(false);

  const onNextQuestion = (moneyValue: Question['moneyValue']) => {
    if (config && questionIndex === config.questions.length - 1) {
      setIsGameOver(true);
      redirect(PAGE_URLS.GAME_OVER);

      return;
    }

    setTotal(moneyValue);
    setQuestionIndex((prev) => prev + 1);
  };

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

  const onGameReset = () => {
    setQuestionIndex(INITIAL_QUESTION_INDEX);
    setTotal(INITIAL_TOTAL);
    setIsGameOver(false);
  };

  const onGameOver = async (moneyValue: Question['moneyValue']) => {
    setTotal(moneyValue);
    setIsGameOver(true);
  };

  return (
    <GameContext.Provider
      value={{
        total,
        questionIndex,
        isGameOver,
        onNextQuestion,
        onGameReset,
        onGameOver,
        onWrongAnswer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return context;
};
