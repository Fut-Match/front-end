import { RankingList } from "@/components/RankingList";

// Mock data - will be replaced with real data from Supabase
const mockPlayers = [
  {
    id: "1",
    name: "Carlos Mendes",
    nickname: "carlosM",
    score: 2450,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "2",
    name: "Ana Costa",
    nickname: "aninha10",
    score: 2380,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "3",
    name: "Pedro Santos",
    nickname: "pedrinho",
    score: 2290,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "4",
    name: "Maria Silva",
    nickname: "mariS",
    score: 2150,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "5",
    name: "João Oliveira",
    nickname: "joao123",
    score: 2080,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "6",
    name: "Felipe Rodriguez",
    nickname: "feliR",
    score: 1950,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "7",
    name: "Beatriz Lima",
    nickname: "biaLima",
    score: 1890,
    city: "São Paulo",
    avatar: undefined
  },
  {
    id: "8",
    name: "Lucas Ferreira",
    nickname: "lukasF",
    score: 1820,
    city: "São Paulo",
    avatar: undefined
  }
];

export function Ranking() {
  return (
    <div className="p-4 space-y-6">
      {/* Ranking List */}
      <RankingList 
        players={mockPlayers}
        currentCity="São Paulo"
      />
    </div>
  );
}