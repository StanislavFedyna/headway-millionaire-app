'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { MoneyProgressList } from '@/app/game/MoneyProgressList/MoneyProgressList';
import { Question } from '@/schemas';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  questionIndex: number;
  moneyValues: Question['moneyValue'][];
}

export const MobileMenu = ({ questionIndex, moneyValues }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = 'mobile-menu';

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);

    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, toggleMenu]);

  return (
    <div className={styles.mobileMenu}>
      <button
        type="button"
        onClick={toggleMenu}
        className={styles.menuButton}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Progress menu"
      >
        <MoneyProgressList
          questionIndex={questionIndex}
          moneyValues={moneyValues}
        />
      </div>
    </div>
  );
};
