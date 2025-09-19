import { INVALID } from "zod";

export const REGISTER_MESSAGES = {
    SUCCESS: {
        title: "Cadastro realizado com sucesso",
        description: "Bem-vindo ao FutMatch!",
    },
    ERROR: {
        title: "Erro ao fazer cadastro",
        description: "Verifique suas informações e tente novamente.",
    },
    VALIDATION_NAME_REQUIRED: {
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome.",
    },
    VALIDATION_LASTNAME_REQUIRED: {
        title: "Sobrenome obrigatório",
        description: "Por favor, informe seu sobrenome.",
    },
    EMAIL_IN_USE: {
        title: "E-mail inválido",
        description: "E-mail já está em uso",
    },
    VALIDATION_PASSWORD_MIN_LENGTH: {
        title: "Senha inválida",
        description: "A senha deve conter pelo menos 6 caracteres, incluindo letras e números.",
    },
    VALIDATION_CONFIRM_PASSWORD_REQUIRED: {
        title: "Confirmação de senha inválida",
        description: "As senhas não coincidem.",
    },
    VALIDATION_PASSWORDS_DO_NOT_MATCH: {
        title: "Confirmação de senha inválida",
        description: "As senhas não coincidem.",
    },
    VALIDATION_TERMS_NOT_ACCEPTED: {
        title: "Termos não aceitos",
        description: "Você deve aceitar os termos e condições para se cadastrar.",
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
    SESSION_EXPIRED: {
        title: "Sessão expirada",
        description: "Sua sessão expirou. Faça login novamente.",
    },


} as const;
