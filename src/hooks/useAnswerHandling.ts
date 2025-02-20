import { useState } from 'react';
import { redirect } from 'next/navigation';

import { PAGE_URLS } from '@/constants';
import { Answer, Question } from '@/schemas';

const ACTION_DELAY = 1500;

interface UseAnswerHandlingProps {
  question: Question;
  hasNextQuestion: boolean;
  onNextQuestion: (moneyValue: Question['moneyValue']) => void;
  onGameOver: (moneyValue: Question['moneyValue']) => void;
}

export const useAnswerHandling = ({
  question,
  hasNextQuestion,
  onNextQuestion,
  onGameOver,
}: UseAnswerHandlingProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const isAnswerCorrect = (answerId: Answer['id']) => {
    return (
      question.answers.find((answer) => answer.id === answerId)?.isCorrect ??
      false
    );
  };

  const areAllAnswersCorrect = (userAnswers: string[]) => {
    return (
      userAnswers.every(isAnswerCorrect) &&
      userAnswers.length === question.minCorrectAnswersCount
    );
  };

  const handleAnswerCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswersCount) return;

    setIsRevealed(true);

    if (areAllAnswersCorrect(userAnswers) && hasNextQuestion) {
      setTimeout(() => {
        setSelectedAnswers([]);
        setIsRevealed(false);

        onNextQuestion(question.moneyValue);
      }, ACTION_DELAY);
      return;
    }

    onGameOver(question.moneyValue);

    setTimeout(() => {
      redirect(PAGE_URLS.GAME_OVER);

      // onGameOver(question.moneyValue);
    }, ACTION_DELAY);
  };

  const handleAnswerSelect = (answerId: string) => {
    if (isRevealed) return;

    const updatedAnswers = selectedAnswers.includes(answerId)
      ? selectedAnswers.filter((id) => id !== answerId)
      : [...selectedAnswers, answerId];

    setSelectedAnswers(updatedAnswers);
    handleAnswerCheck(updatedAnswers);
  };

  return {
    selectedAnswers,
    isRevealed,
    handleAnswerSelect,
    isAnswerCorrect,
  };
};
