import { useQuery } from '@tanstack/react-query';
import { fakeGameApi } from '@/lib';
import { GameConfig } from '@/schemas';

/**
 * Query keys for React Query cache management
 */
export const QUERY_KEYS = {
  gameConfig: ['game-config'],
} as const;

/**
 * Custom hook for fetching and managing game configuration data.
 *
 * @returns {Object} An object containing:
 *  - config: The game configuration data (GameConfig | undefined)
 *  - isLoading: Boolean indicating if the request is in progress
 *  - error: Any error that occurred during the request
 *  - refetch: Function to manually trigger a new request
 *
 * @example
 * ```tsx
 * function GameComponent() {
 *   const { config, isLoading, error } = useGameConfig();
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error />;
 *   if (!config) return null;
 *
 *   return <Game config={config} />;
 * }
 * ```
 *
 * @remarks
 * - Uses React Query for data fetching and caching
 * - Automatically handles caching and stale data
 * - Will not retry failed requests (retry: false)
 * - Returns undefined for config if data is not yet loaded
 */
export function useGameConfig() {
  const { data, isLoading, error, refetch } = useQuery<GameConfig>({
    queryKey: QUERY_KEYS.gameConfig,
    queryFn: fakeGameApi.getConfig,
    retry: false,
  });

  return {
    config: data,
    isLoading,
    error,
    refetch,
  };
}
