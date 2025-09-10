export const mockMatches = {
  organizing: [
    {
      id: "1",
      name: "Pelada do Sábado",
      organizer: "Carlos Mendes",
      date: "2024-01-20",
      time: "15:00",
      location: "Campo do Vila Nova",
      teamSize: "5x5",
      endCriteria: "First to",
      maxGoals: 3,
      totalSlots: 10,
      status: "organizing"
    }
  ]
};

export const mockAchievements = [
  {
    id: 1,
    title: "Primeiro Gol",
    description: "Marque seu primeiro gol em uma partida",
    icon: "⚽",
    rarity: "common",
    unlocked: true,
    progress: null
  },
  {
    id: 2,
    title: "Hat-trick",
    description: "Marque 3 gols em uma única partida",
    icon: "🎯",
    rarity: "rare",
    unlocked: true,
    progress: null
  },
  {
    id: 3,
    title: "Artilheiro",
    description: "Marque 10 gols em sua carreira",
    icon: "👑",
    rarity: "epic",
    unlocked: false,
    progress: {
      current: 7,
      target: 10
    }
  },
  {
    id: 4,
    title: "Lenda do Futebol",
    description: "Marque 50 gols em sua carreira",
    icon: "🏆",
    rarity: "legendary",
    unlocked: false,
    progress: {
      current: 7,
      target: 50
    }
  },
  {
    id: 5,
    title: "Primeira Vitória",
    description: "Vença sua primeira partida",
    icon: "🥇",
    rarity: "common",
    unlocked: true,
    progress: null
  },
  {
    id: 6,
    title: "Sequência Invicta",
    description: "Vença 5 partidas consecutivas",
    icon: "🔥",
    rarity: "rare",
    unlocked: false,
    progress: {
      current: 2,
      target: 5
    }
  },
  {
    id: 7,
    title: "Campeão Invicto",
    description: "Vença 15 partidas consecutivas",
    icon: "💎",
    rarity: "legendary",
    unlocked: false,
    progress: {
      current: 2,
      target: 15
    }
  },
  {
    id: 8,
    title: "Assistente",
    description: "Faça sua primeira assistência",
    icon: "🎭",
    rarity: "common",
    unlocked: true,
    progress: null
  },
  {
    id: 9,
    title: "Mestre das Assistências",
    description: "Faça 20 assistências em sua carreira",
    icon: "🎪",
    rarity: "epic",
    unlocked: false,
    progress: {
      current: 8,
      target: 20
    }
  },
  {
    id: 10,
    title: "MVP da Partida",
    description: "Seja eleito MVP de uma partida",
    icon: "⭐",
    rarity: "rare",
    unlocked: true,
    progress: null
  }
];