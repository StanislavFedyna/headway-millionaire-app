'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { Question } from '@/schemas';

interface GameContextType {
  onGameOver: (moneyValue: Question['moneyValue']) => void;
  isGameOver: boolean;
  onGameReset: () => void;
  total: number;
  questionIndex: number;
  onNextQuestion: (moneyValue: Question['moneyValue']) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

const INITIAL_TOTAL = 0;
const INITIAL_QUESTION_INDEX = 0;

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [questionIndex, setQuestionIndex] = useState(INITIAL_QUESTION_INDEX);
  const [total, setTotal] = useState(INITIAL_TOTAL);
  const [isGameOver, setIsGameOver] = useState(false);

  const onNextQuestion = (moneyValue: Question['moneyValue']) => {
    setTotal(moneyValue);
    setQuestionIndex((prev) => prev + 1);
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
