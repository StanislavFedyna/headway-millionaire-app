import { PROGRESS_VARIANTS } from '@/constants';

type ProgressVariant =
  (typeof PROGRESS_VARIANTS)[keyof typeof PROGRESS_VARIANTS];

export const getProgressVariant = (
  index: number,
  currentIndex: number,
): ProgressVariant => {
  if (index === currentIndex) {
    return PROGRESS_VARIANTS.CURRENT;
  }

  if (index < currentIndex) {
    return PROGRESS_VARIANTS.COMPLETED;
  }

  return PROGRESS_VARIANTS.NEXT;
};
