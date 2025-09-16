// Definições centralizadas das rotas da aplicação

// Rotas públicas (acessíveis sem login)
export const PUBLIC_ROUTES = {
  HOME: '/',
  DASHBOARD: '/home',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
} as const;

// Rotas de autenticação (acessíveis apenas quando não logado)
export const AUTH_ROUTES = {
  LOGIN: '/auth',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

// Rotas privadas (requerem autenticação)
export const PRIVATE_ROUTES = {
  ACHIEVEMENTS: '/achievements',
  MATCHES: '/matches',
  MATCH_CREATE: '/matches/create',
  MATCH_DETAILS: '/matches/:id',
  MATCH_MANAGE: '/matches/:id/manage',
  MATCH_LIVE: '/matches/:id/live',
  RANKING: '/ranking',
  PROFILE_EDIT: '/profile/edit',
  SETTINGS: '/settings',
  API_STATUS: '/api-status',
} as const;

// Todas as rotas juntas
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...PRIVATE_ROUTES,
} as const;

// Helpers para construir rotas dinâmicas
export const buildMatchRoute = (matchId: string) => `/matches/${matchId}`;
export const buildMatchManageRoute = (matchId: string) => `/matches/${matchId}/manage`;
export const buildMatchLiveRoute = (matchId: string) => `/matches/${matchId}/live`;