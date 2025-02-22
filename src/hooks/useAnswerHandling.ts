import { useState } from 'react';
import { redirect } from 'next/navigation';

import { PAGE_URLS } from '@/constants';
import { Answer, Question } from '@/schemas';
import { useGame } from '@/context';
import { useGameSounds } from '@/hooks/useGameSounds';

const ACTION_DELAY = 1500;

interface UseAnswerHandlingProps {
  /** Current question data */
  question: Question;
  /** Flag indicating if there is a next question */
  hasNextQuestion: boolean;
  /** Callback for handling progression to next question */
  onNextQuestion: (moneyValue: Question['moneyValue']) => void;
  /** Callback for handling game over state */
  onGameOver: (moneyValue: Question['moneyValue']) => void;
}

/**
 * Custom hook for handling answer selection and validation logic
 *
 * @param props - Configuration options for answer handling
 * @returns Object containing answer handling state and functions
 *
 * @example
 * ```tsx
 * const { selectedAnswers, isRevealed, handleAnswerSelect } = useAnswerHandling({
 *   question,
 *   hasNextQuestion: true,
 *   onNextQuestion,
 *   onGameOver
 * });
 * ```
 */
export const useAnswerHandling = ({
  question,
  hasNextQuestion,
  onNextQuestion,
  onGameOver,
}: UseAnswerHandlingProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const { onWrongAnswer } = useGame();
  const { playSound } = useGameSounds();

  /**
   * Checks if a specific answer is correct
   */
  const isAnswerCorrect = (answerId: Answer['id']) => {
    return (
      question.answers.find((answer) => answer.id === answerId)?.isCorrect ??
      false
    );
  };

  /**
   * Validates if all selected answers are correct and match the required count
   */
  const areAllAnswersCorrect = (userAnswers: string[]) => {
    return (
      userAnswers.every(isAnswerCorrect) &&
      userAnswers.length === question.minCorrectAnswersCount
    );
  };

  /**
   * Effect for handling answer validation and game progression
   * Triggers after reveal animation and handles correct/incorrect answer scenarios
   */
  const handleAnswerCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswersCount) return;

    setIsRevealed(true);

    if (areAllAnswersCorrect(userAnswers)) {
      playSound('correct');

      if (hasNextQuestion) {
        setTimeout(() => {
          setSelectedAnswers([]);
          setIsRevealed(false);
          onNextQuestion(question.moneyValue);
        }, ACTION_DELAY);
      } else {
        setTimeout(() => {
          onGameOver(question.moneyValue);

          redirect(PAGE_URLS.GAME_OVER);
        }, ACTION_DELAY);
      }

      return;
    }
    playSound('wrong');
    setTimeout(() => {
      onWrongAnswer();

      redirect(PAGE_URLS.GAME_OVER);
    }, ACTION_DELAY);
  };

  /**
   * Handles answer selection and triggers validation when required number of answers is selected
   */
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
