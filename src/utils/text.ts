/**
 * Utilitários para formatação e manipulação de texto
 */

/**
 * Capitaliza a primeira letra de uma string
 * @param text - Texto para capitalizar
 * @returns Texto com primeira letra maiúscula
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitaliza a primeira letra de cada palavra
 * @param text - Texto para capitalizar
 * @returns Texto com cada palavra capitalizada
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Remove acentos de uma string
 * @param text - Texto com acentos
 * @returns Texto sem acentos
 */
export const removeAccents = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Cria um slug a partir de um texto
 * @param text - Texto para converter em slug
 * @returns Slug (texto-com-hifens)
 */
export const createSlug = (text: string): string => {
  return removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_-]+/g, '-') // Substitui espaços e _ por -
    .replace(/^-+|-+$/g, ''); // Remove - do início e fim
};

/**
 * Trunca um texto com reticências
 * @param text - Texto para truncar
 * @param maxLength - Tamanho máximo
 * @param suffix - Sufixo (padrão: '...')
 * @returns Texto truncado
 */
export const truncate = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
};

/**
 * Conta palavras em um texto
 * @param text - Texto para contar
 * @returns Número de palavras
 */
export const countWords = (text: string): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Extrai iniciais de um nome
 * @param name - Nome completo
 * @param maxInitials - Máximo de iniciais (padrão: 2)
 * @returns Iniciais do nome
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Formata um nome removendo espaços extras e capitalizando
 * @param name - Nome para formatar
 * @returns Nome formatado
 */
export const formatName = (name: string): string => {
  if (!name) return '';
  
  return name
    .trim()
    .replace(/\s+/g, ' ') // Remove espaços extras
    .split(' ')
    .map(word => {
      // Não capitaliza preposições comuns
      const prepositions = ['de', 'da', 'do', 'dos', 'das', 'e'];
      return prepositions.includes(word.toLowerCase()) 
        ? word.toLowerCase() 
        : capitalize(word);
    })
    .join(' ');
};

/**
 * Valida se uma string contém apenas letras e espaços
 * @param text - Texto para validar
 * @returns true se válido, false se inválido
 */
export const isValidName = (text: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  return nameRegex.test(text.trim());
};

/**
 * Gera um ID aleatório
 * @param length - Tamanho do ID (padrão: 8)
 * @returns ID aleatório
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Formata número com separadores de milhares
 * @param number - Número para formatar
 * @returns Número formatado (ex: 1.234.567)
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('pt-BR').format(number);
};