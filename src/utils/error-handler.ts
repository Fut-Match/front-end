import { toast } from "sonner";

export interface ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;
  backendMessage?: string;
}

interface ErrorHandlerOptions {
  /**
   * Título do toast de erro (padrão: "Erro")
   */
  title?: string;
  /**
   * Se true, exibe a mensagem do backend ao invés da genérica
   * (padrão: false - sempre exibe mensagem genérica)
   */
  useBackendMessage?: boolean;
  /**
   * Callback customizado para tratar o erro (opcional)
   */
  onError?: (error: ApiError) => void;
}

/**
 * Trata erros de API exibindo toast apropriado
 * Por padrão, exibe mensagem genérica
 *
 * @param error - Erro capturado
 * @param options - Opções de tratamento do erro
 *
 * @example
 * // Exibir erro genérico (padrão)
 * handleApiError(error, {
 *   title: "Erro no cadastro"
 * });
 *
 * @example
 * // Exibir mensagem do backend
 * handleApiError(error, {
 *   title: "Erro no cadastro",
 *   useBackendMessage: true
 * });
 */
export function handleApiError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): void {
  const { title = "Erro", useBackendMessage = false, onError } = options;

  const apiError = error as ApiError;

  // Executar callback customizado se fornecido
  if (onError) {
    onError(apiError);
  }

  // Determinar a mensagem a ser exibida
  let description: string;

  if (useBackendMessage && apiError.backendMessage) {
    // Usar mensagem específica do backend
    description = apiError.backendMessage;
  } else {
    // Usar mensagem genérica (padrão)
    description =
      apiError.message || "Erro, não foi possível realizar ação desejada";
  }

  // Exibir toast de erro
  toast.error(title, {
    description,
  });
}

/**
 * Retorna a mensagem do backend se disponível
 */
export function getBackendMessage(error: unknown): string | undefined {
  const apiError = error as ApiError;
  return apiError.backendMessage;
}

/**
 * Verifica se o erro possui mensagem do backend
 */
export function hasBackendMessage(error: unknown): boolean {
  const apiError = error as ApiError;
  return !!apiError.backendMessage;
}

/**
 * Verifica se o erro é de validação (status 422)
 */
export function isValidationError(error: unknown): boolean {
  const apiError = error as ApiError;
  return apiError.status === 422;
}

/**
 * Verifica se o erro é de autenticação (status 401)
 */
export function isAuthError(error: unknown): boolean {
  const apiError = error as ApiError;
  return apiError.status === 401;
}

/**
 * Verifica se o erro é de email já em uso (status 422)
 */
export function isEmailInUseError(error: unknown): boolean {
  const apiError = error as ApiError;
  return (
    apiError.status === 422 &&
    !!apiError.errors?.email &&
    apiError.errors.email.some(
      (msg) =>
        msg.toLowerCase().includes("email") &&
        (msg.toLowerCase().includes("já") ||
          msg.toLowerCase().includes("uso") ||
          msg.toLowerCase().includes("em uso"))
    )
  );
}

/**
 * Extrai mensagens de validação específicas dos erros
 */
export function getValidationMessages(
  error: unknown
): Record<string, string[]> {
  const apiError = error as ApiError;
  return apiError.errors || {};
}
