// Query Keys centralizados para TanStack Query
export const queryKeys = {
  // Auth queries
  auth: {
    user: ["auth", "user"] as const,
    me: ["auth", "me"] as const,
  },

  // Player queries
  players: {
    all: ["players"] as const,
    list: (params?: Record<string, unknown>) =>
      ["players", "list", params] as const,
    detail: (id: string) => ["players", "detail", id] as const,
    me: ["players", "me"] as const,
    search: (query: string) => ["players", "search", query] as const,
    byPosition: (position: string) =>
      ["players", "by-position", position] as const,
    top: (limit: number) => ["players", "top", limit] as const,
  },

  // Match queries
  matches: {
    all: ["matches"] as const,
    list: (params?: Record<string, unknown>) =>
      ["matches", "list", params] as const,
    detail: (id: string) => ["matches", "detail", id] as const,
    upcoming: ["matches", "upcoming"] as const,
    myMatches: ["matches", "my-matches"] as const,
    byStatus: (status: string) => ["matches", "by-status", status] as const,
    search: (query: string) => ["matches", "search", query] as const,
  },

  // Health queries
  health: {
    check: ["health", "check"] as const,
  },
} as const;
