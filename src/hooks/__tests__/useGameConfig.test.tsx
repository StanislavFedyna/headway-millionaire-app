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

  // Sample valid game config with unsorted questions
  const mockGameConfig = {
    questions: [
      {
        id: 'q2',
        text: 'Hard Question',
        moneyValue: 1000000,
        minCorrectAnswersCount: 1,
        answers: [
          { id: 'a1', text: 'Answer 1', isCorrect: false },
          { id: 'a2', text: 'Answer 2', isCorrect: true },
          { id: 'a3', text: 'Answer 3', isCorrect: false },
          { id: 'a4', text: 'Answer 4', isCorrect: false },
        ],
      },
      {
        id: 'q1',
        text: 'Easy Question',
        moneyValue: 500,
        minCorrectAnswersCount: 1,
        answers: [
          { id: 'a1', text: 'Answer 1', isCorrect: false },
          { id: 'a2', text: 'Answer 2', isCorrect: true },
          { id: 'a3', text: 'Answer 3', isCorrect: false },
          { id: 'a4', text: 'Answer 4', isCorrect: false },
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

  it('should sort questions by money value', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.config?.questions).toEqual([
      expect.objectContaining({ moneyValue: 500 }),
      expect.objectContaining({ moneyValue: 1000000 }),
    ]);
  });

  it('should preserve original question data while sorting', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.config?.questions[0]).toEqual(
      expect.objectContaining({
        id: 'q1',
        text: 'Easy Question',
        moneyValue: 500,
      }),
    );
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
      expect(result.current.config).toBeDefined();
    });

    // Second render
    rerender();

    expect(fakeGameApi.getConfig).toHaveBeenCalledTimes(1);
  });

  it('should refetch on manual trigger', async () => {
    vi.mocked(fakeGameApi.getConfig).mockResolvedValue(mockGameConfig);

    const { result } = renderHook(() => useGameConfig(), { wrapper });

    await waitFor(() => {
      expect(result.current.config).toBeDefined();
    });

    // Trigger manual refetch
    result.current.refetch();

    expect(fakeGameApi.getConfig).toHaveBeenCalledTimes(2);
  });
});
