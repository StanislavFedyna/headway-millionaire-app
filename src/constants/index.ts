export const PAGE_URLS = {
  GAME: '/game',
  GAME_OVER: '/game-over',
  START: '/',
} as const;

export const BUTTON_VARIANTS = {
  INACTIVE: 'inactive',
  SELECTED: 'selected',
  CORRECT: 'correct',
  WRONG: 'wrong',
} as const;

export const PROGRESS_VARIANTS = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  NEXT: 'next',
} as const;
