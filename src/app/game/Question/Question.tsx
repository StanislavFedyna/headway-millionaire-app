import { Typography, OptionButton } from '@/components';
import { Question as QuestionType } from '@/schemas';

import styles from './Question.module.css';
import { useGame } from '@/context';
import { useAnswerHandling } from '@/hooks';
import { BUTTON_VARIANTS } from '@/constants';

interface QuestionProps {
  question: QuestionType;
}

const getLetterByIndex = (index: number): string => {
  return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
};

export const Question = ({ question }: QuestionProps) => {
  const { onNextQuestion, onGameOver } = useGame();

  const { selectedAnswers, isRevealed, handleAnswerSelect, isAnswerCorrect } =
    useAnswerHandling({
      question,
      hasNextQuestion: true,
      onNextQuestion,
      onGameOver,
    });

  const getAnswerVariant = (answerId: string) => {
    if (!isRevealed) {
      return selectedAnswers.includes(answerId)
        ? BUTTON_VARIANTS.SELECTED
        : BUTTON_VARIANTS.INACTIVE;
    }

    return isAnswerCorrect(answerId)
      ? BUTTON_VARIANTS.CORRECT
      : BUTTON_VARIANTS.WRONG;
  };

  return (
    <main className={styles.main}>
      <Typography variant="h2" className={styles.question}>
        {question.text}
      </Typography>

      <div className={styles.options}>
        {question.answers.map(({ id, text }, index) => (
          <OptionButton
            key={id}
            prefix={getLetterByIndex(index)}
            onClick={() => handleAnswerSelect(id)}
            variant={getAnswerVariant(id)}
            disabled={isRevealed}
            className={styles.optionButton}
          >
            {text}
          </OptionButton>
        ))}
      </div>
    </main>
  );
};
