/**
 * Utilitários para formatação e manipulação de datas
 */

/**
 * Formata uma data para o padrão brasileiro DD/MM/AAAA
 * @param date - Data (Date, string ou timestamp)
 * @returns Data formatada em DD/MM/AAAA
 */
export const formatDate = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('pt-BR').format(dateObj);
};

/**
 * Formata uma data com horário para o padrão brasileiro
 * @param date - Data (Date, string ou timestamp)
 * @returns Data e hora formatadas em DD/MM/AAAA HH:mm
 */
export const formatDateTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Aplica máscara de data durante a digitação
 * @param value - Valor atual do input
 * @returns Valor com máscara DD/MM/AAAA
 */
export const maskDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) {
    return cleanValue;
  } else if (cleanValue.length <= 4) {
    return cleanValue.replace(/(\d{2})(\d+)/, '$1/$2');
  } else {
    return cleanValue.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
  }
};

/**
 * Converte data brasileira (DD/MM/AAAA) para ISO (AAAA-MM-DD)
 * @param dateString - Data no formato DD/MM/AAAA
 * @returns Data no formato ISO ou null se inválida
 */
export const brazilianToISO = (dateString: string): string | null => {
  const parts = dateString.split('/');
  
  if (parts.length !== 3) {
    return null;
  }
  
  const [day, month, year] = parts;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date.toISOString().split('T')[0];
};

/**
 * Converte data ISO (AAAA-MM-DD) para formato brasileiro (DD/MM/AAAA)
 * @param isoString - Data no formato ISO
 * @returns Data no formato brasileiro ou string vazia se inválida
 */
export const isoToBrazilian = (isoString: string): string => {
  const date = new Date(isoString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return formatDate(date);
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns Diferença em dias (positivo se date2 > date1)
 */
export const daysDifference = (date1: Date | string, date2: Date | string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return 0;
  }
  
  const timeDiff = d2.getTime() - d1.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Verifica se uma data é válida
 * @param dateString - String da data em formato DD/MM/AAAA
 * @returns true se válida, false se inválida
 */
export const validateDate = (dateString: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);
  
  if (!match) {
    return false;
  }
  
  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === parseInt(month) - 1 &&
    date.getDate() === parseInt(day)
  );
};

/**
 * Formata data relativa (ex: "há 2 dias", "em 3 horas")
 * @param date - Data para comparar
 * @param baseDate - Data base (padrão: agora)
 * @returns String da data relativa
 */
export const formatRelativeDate = (date: Date | string, baseDate?: Date): string => {
  const targetDate = new Date(date);
  const base = baseDate || new Date();
  
  if (isNaN(targetDate.getTime())) {
    return '';
  }
  
  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
  const diffInMs = targetDate.getTime() - base.getTime();
  
  const units = [
    { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'day', ms: 1000 * 60 * 60 * 24 },
    { unit: 'hour', ms: 1000 * 60 * 60 },
    { unit: 'minute', ms: 1000 * 60 },
  ] as const;
  
  for (const { unit, ms } of units) {
    const diff = Math.round(diffInMs / ms);
    if (Math.abs(diff) >= 1) {
      return formatter.format(diff, unit);
    }
  }
  
  return 'agora';
};