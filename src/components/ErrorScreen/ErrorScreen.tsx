import { ValidationError } from '@/lib/api/game-api';
import { Button, Typography } from '@/components';

import styles from './ErrorScreen.module.css';

interface ErrorScreenProps {
  onRetry: () => void;
  error?: Error;
}

export const ErrorScreen = ({ onRetry, error }: ErrorScreenProps) => {
  const isValidationError = error instanceof ValidationError;

  return (
    <section className={styles.container} role="alert">
      <div className={styles.content}>
        <div className={styles.hexagon} aria-hidden="true">
          <div className={styles.inner}>
            <span className={styles.mark} aria-hidden="true">
              !
            </span>
          </div>
        </div>

        <Typography variant="h2" className={styles.title} aria-live="assertive">
          {isValidationError
            ? 'Invalid Game Configuration'
            : 'Game loading error'}
        </Typography>

        {isValidationError ? (
          <div className={styles.validationErrors}>
            {(error as ValidationError).errors.map(
              ({ path, message }, index) => (
                <Typography
                  key={index}
                  variant="body"
                  className={styles.errorItem}
                >
                  <span className={styles.errorPath}>{path}:</span> {message}
                </Typography>
              ),
            )}
          </div>
        ) : (
          <Typography variant="body" className={styles.description}>
            Oops! Something went wrong while loading the game configuration.
          </Typography>
        )}

        <Button
          onClick={onRetry}
          className={styles.button}
          aria-label="Retry loading the game"
          aria-describedby="error-description"
        >
          Try again
        </Button>
      </div>
    </section>
  );
};
