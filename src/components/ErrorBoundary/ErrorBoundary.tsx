'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorScreen } from '@/components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorScreen
          error={this.state.error || new Error('Something went wrong')}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
