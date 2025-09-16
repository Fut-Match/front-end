/**
 * Utilitários para formatação de valores monetários brasileiros
 */

/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param value - Valor numérico
 * @param options - Opções de formatação
 * @returns Valor formatado em Real brasileiro
 */
export const formatCurrency = (
  value: number,
  options?: {
    showSymbol?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string => {
  const {
    showSymbol = true,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {};

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);

  return formatted;
};

/**
 * Remove a formatação de moeda, retornando apenas o valor numérico
 * @param value - Valor formatado (ex: "R$ 1.234,56")
 * @returns Valor numérico
 */
export const unformatCurrency = (value: string): number => {
  // Remove símbolos, espaços e substitui vírgula por ponto
  const cleaned = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  const numericValue = parseFloat(cleaned);
  return isNaN(numericValue) ? 0 : numericValue;
};

/**
 * Aplica máscara de moeda durante a digitação
 * @param value - Valor atual do input
 * @param options - Opções de formatação
 * @returns Valor com máscara de moeda aplicada
 */
export const maskCurrency = (
  value: string,
  options?: {
    prefix?: string;
    allowNegative?: boolean;
    maxValue?: number;
  }
): string => {
  const {
    prefix = 'R$ ',
    allowNegative = false,
    maxValue,
  } = options || {};

  // Remove tudo que não é número
  const cleaned = value.replace(/\D/g, '');
  
  // Se string vazia, retorna só o prefixo
  if (!cleaned) {
    return '';
  }
  
  // Converte para número (considera centavos)
  let numericValue = parseInt(cleaned) / 100;
  
  // Verifica valor máximo
  if (maxValue && numericValue > maxValue) {
    numericValue = maxValue;
  }
  
  // Verifica se permite negativos
  if (!allowNegative && numericValue < 0) {
    numericValue = 0;
  }
  
  // Formata com 2 casas decimais
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
  
  return prefix + formatted;
};

/**
 * Converte valor em string para centavos (útil para APIs)
 * @param value - Valor formatado
 * @returns Valor em centavos
 */
export const toCents = (value: string): number => {
  const numericValue = unformatCurrency(value);
  return Math.round(numericValue * 100);
};

/**
 * Converte centavos para valor formatado
 * @param cents - Valor em centavos
 * @param showSymbol - Se deve mostrar o símbolo da moeda
 * @returns Valor formatado
 */
export const fromCents = (cents: number, showSymbol: boolean = true): string => {
  const value = cents / 100;
  return formatCurrency(value, { showSymbol });
};

/**
 * Formata valor de porcentagem
 * @param value - Valor decimal (ex: 0.15 para 15%)
 * @param decimals - Número de casas decimais
 * @returns Porcentagem formatada
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};