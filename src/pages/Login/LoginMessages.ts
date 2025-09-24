export const LOGIN_MESSAGES = {
    SUCCESS: {
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta ao FutMatch!",
    },
    ERROR: {
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
    },
    INVALID_CREDENTIALS: {
        title: "Credenciais inválidas",
        description: "E-mail ou senha incorretos.",
    },
    NETWORK_ERROR: {
        title: "Erro de conexão",
        description: "Verifique sua conexão com a internet e tente novamente.",
    },
    LOADING: {
        title: "Entrando...",
        description: "Aguarde enquanto processamos seu login.",
    },
    VALIDATION_EMAIL_REQUIRED: {
        title: "E-mail obrigatório",
        description: "Por favor, informe seu e-mail.",
    },
    VALIDATION_EMAIL_INVALID: {
        title: "E-mail inválido",
        description: "Por favor, informe um e-mail válido.",
    },
    VALIDATION_PASSWORD_REQUIRED: {
        title: "Senha obrigatória",
        description: "Por favor, informe sua senha.",
    },
    VALIDATION_PASSWORD_MIN_LENGTH: {
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
    },
    SESSION_EXPIRED: {
        title: "Sessão expirada",
        description: "Sua sessão expirou. Faça login novamente.",
    },
    ACCOUNT_LOCKED: {
        title: "Conta bloqueada",
        description: "Sua conta foi temporariamente bloqueada. Entre em contato com o suporte.",
    },
    GOOGLE_LOGIN_ERROR: {
        title: "Erro no login com Google",
        description: "Não foi possível fazer login com o Google. Tente novamente.",
    },
    FACEBOOK_LOGIN_ERROR: {
        title: "Erro no login com Facebook",
        description: "Não foi possível fazer login com o Facebook. Tente novamente.",
    },
} as const;
