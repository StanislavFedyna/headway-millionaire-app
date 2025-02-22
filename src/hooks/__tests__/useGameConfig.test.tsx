import type React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGameConfig } from '../useGameConfig';
import { fakeGameApi, ValidationError } from '../../lib/api/game-api';

// Mock the API
vi.mock('@/lib/api/game-api', () => ({
  fakeGameApi: {
    getConfig: vi.fn(),
  },
  ValidationError: vi.fn(),
}));

describe('useGameConfig', () => {
  let queryClient: QueryClient;

  // Sample valid game config
  const mockGameConfig = {
    questions: [
      {
        id: 'q1',
        text: 'What is the capital of France?',
        moneyValue: 500,
        minCorrectAnswersCount: 1,
        answers: [
          { id: 'a1', text: 'London', isCorrect: false },
          { id: 'a2', text: 'Berlin', isCorrect: false },
          { id: 'a3', text: 'Paris', isCorrect: true },
          { id: 'a4', text: 'Madrid', isCorrect: false },
        ],
      },
      // Add more questions to meet the 12 question requirement
      // ... (questions 2-11)
      {
        id: 'q12',
        text: 'What is 2+2?',
        moneyValue: 1000000,
        minCorrectAnswersCount: 1,
        answers: [
          { id: 'a1', text: '3', isCorrect: false },
          { id: 'a2', text: '4', isCorrect: true },
          { id: 'a3', text: '5', isCorrect: false },
          { id: 'a4', text: '6', isCorrect: false },
        ],
      },
    ],
  };

  // Setup wrapper with QueryClient
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient?.clear();
  });

  it('should return loading state initially', () => {
    vi.mocked(fakeGameApi.getConfig).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.config).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return game config on successful fetch', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.config).toEqual(mockGameConfig);
    expect(result.current.error).toBeNull();
  });

  it('should handle validation errors', async () => {
    const validationError = new ValidationError([
      {
        path: 'questions[0].text',
        message: 'Question text cannot be empty',
      },
    ]);

    vi.mocked(fakeGameApi.getConfig).mockRejectedValue(validationError);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(validationError);
    expect(result.current.config).toBeUndefined();
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network error');
    vi.mocked(fakeGameApi.getConfig).mockRejectedValue(networkError);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(networkError);
    expect(result.current.config).toBeUndefined();
  });

  it('should cache the result and not refetch', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    // First render
    const { result, rerender } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.config).toEqual(mockGameConfig);
    });

    // Second render
    rerender();

    expect(fakeGameApi.getConfig).toHaveBeenCalledTimes(1);
  });

  it('should refetch on manual trigger', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.config).toEqual(mockGameConfig);
    });

    // Trigger manual refetch
    result.current.refetch();

    expect(fakeGameApi.getConfig).toHaveBeenCalledTimes(2);
  });

  describe('Error Recovery', () => {
    it('should recover from error state on successful refetch', async () => {
      // First call fails
      vi.mocked(fakeGameApi.getConfig).mockRejectedValueOnce(
        new Error('Network error'),
      );

      // Second call succeeds
      vi.mocked(fakeGameApi.getConfig).mockResolvedValueOnce(mockGameConfig);

      const { result } = renderHook(() => useGameConfig(), { wrapper });

      // Wait for first call to fail
      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      // Trigger refetch
      result.current.refetch();

      // Wait for successful recovery
      await waitFor(() => {
        expect(result.current.config).toEqual(mockGameConfig);
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('Query Key Management', () => {
    it('should use correct query key', async () => {
      vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

      renderHook(() => useGameConfig(), { wrapper });

      expect(queryClient.getQueryData(['game-config'])).toBeUndefined();

      await waitFor(() => {
        expect(queryClient.getQueryData(['game-config'])).toEqual(
          mockGameConfig,
        );
      });
    });
  });

  describe('Loading States', () => {
    it('should handle multiple loading states correctly', async () => {
      let resolvePromise: (value: {
        questions: {
          id: string;
          text: string;
          moneyValue: number;
          minCorrectAnswersCount: number;
          answers: { id: string; text: string; isCorrect: boolean }[];
        }[];
      }) => void;
      const promise: Promise<{
        questions: {
          id: string;
          text: string;
          moneyValue: number;
          minCorrectAnswersCount: number;
          answers: { id: string; text: string; isCorrect: boolean }[];
        }[];
      }> = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      vi.mocked(fakeGameApi.getConfig).mockImplementation(() => promise);

      const { result } = renderHook(() => useGameConfig(), { wrapper });

      // Initial loading state
      expect(result.current.isLoading).toBe(true);

      // Resolve the promise
      resolvePromise!(mockGameConfig);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.config).toEqual(mockGameConfig);
      });
    });
  });
});
