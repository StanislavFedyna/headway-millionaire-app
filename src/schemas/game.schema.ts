import { z } from 'zod';

export const AnswerSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Answer text cannot be empty'),
  isCorrect: z.boolean(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Question text cannot be empty'),
  moneyValue: z.number().positive('Money value must be positive'),
  minCorrectAnswersCount: z.number().min(1).max(4),
  answers: z
    .array(AnswerSchema)
    .min(4, 'Question must have at least 4 answers')
    .max(4, 'Question must have exactly 4 answers')
    .refine(
      (answers) => answers.some((answer) => answer.isCorrect),
      'Question must have at least one correct answer',
    )
    .refine((answers) => {
      const correctAnswers = answers.filter((answer) => answer.isCorrect);
      return correctAnswers.length <= 4;
    }, 'Question cannot have more than 4 correct answers'),
});

export const GameConfigSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .min(12, 'Game must have at least 12 questions')
    .max(12, 'Game must have exactly 12 questions'),
});

export type Answer = z.infer<typeof AnswerSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type GameConfig = z.infer<typeof GameConfigSchema>;
