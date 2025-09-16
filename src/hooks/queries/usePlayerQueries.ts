import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { DC } from '@/externals/dependency-container';

// Hook para listar todos os players
export const usePlayers = () => {
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.players.all,
    queryFn: () => playerRepository.getAll(),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obter player por ID
export const usePlayer = (id: string) => {
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playerRepository.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para buscar players por nome
export const useSearchPlayers = (searchQuery: string) => {
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.players.search(searchQuery),
    queryFn: () => playerRepository.searchByName(searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};

// Hook para obter players por posição
export const usePlayersByPosition = (position: string) => {
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.players.byPosition(position),
    queryFn: () => playerRepository.getByPosition(position),
    enabled: !!position,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para obter top players
export const useTopPlayers = (limit: number = 10) => {
  const playerRepository = DC.repositories.playerRepository(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  );
  
  return useQuery({
    queryKey: queryKeys.players.top(limit),
    queryFn: () => playerRepository.getTopPlayers(limit),
    staleTime: 10 * 60 * 1000, // 10 minutos para ranking
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};