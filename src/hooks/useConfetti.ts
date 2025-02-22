'use client';

import { useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfetti = (shouldFire = false) => {
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff8b37', '#47d867', '#ffac70'];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  useEffect(() => {
    if (shouldFire) {
      fireConfetti();
    }
  }, [shouldFire, fireConfetti]);

  return { fireConfetti };
};
