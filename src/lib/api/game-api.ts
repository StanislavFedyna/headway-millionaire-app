import gameConfigData from '@/config/game-config.json';
import { GameConfig, GameConfigSchema } from '@/schemas';

export class ValidationError extends Error {
  constructor(public errors: { path: string; message: string }[]) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export const fakeGameApi = {
  getConfig: async (): Promise<GameConfig> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = GameConfigSchema.safeParse(gameConfigData);

    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }

    return result.data;
  },
};
