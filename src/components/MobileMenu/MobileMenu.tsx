'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import styles from './MobileMenu.module.css';
import { MoneyProgressList } from '@/app/game/MoneyProgressList/MoneyProgressList';

interface MobileMenuProps {
  questionIndex: number;
}

export const MobileMenu = ({ questionIndex }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <div className={styles.mobileMenu}>
      <button
        type="button"
        onClick={toggleMenu}
        className={styles.menuButton}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <MoneyProgressList questionIndex={questionIndex} />
      </div>
    </div>
  );
};
