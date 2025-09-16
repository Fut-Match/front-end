/**
 * Utilitários para formatação e validação de telefones brasileiros
 */

/**
 * Formata um número de telefone brasileiro
 * @param phone - Número do telefone (apenas números)
 * @returns Telefone formatado
 */
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    // Telefone fixo: (XX) XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    // Celular: (XX) XXXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return cleanPhone;
};

/**
 * Remove a formatação do telefone
 * @param phone - Telefone formatado
 * @returns Telefone apenas com números
 */
export const unformatPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Aplica máscara de telefone durante a digitação
 * @param value - Valor atual do input
 * @returns Valor com máscara aplicada
 */
export const maskPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) {
    return cleanValue;
  } else if (cleanValue.length <= 6) {
    return cleanValue.replace(/(\d{2})(\d+)/, '($1) $2');
  } else if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  } else {
    return cleanValue.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  }
};

/**
 * Valida se o telefone é válido
 * @param phone - Telefone (com ou sem formatação)
 * @returns true se válido, false se inválido
 */
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = unformatPhone(phone);
  
  // Deve ter 10 ou 11 dígitos
  if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
    return false;
  }
  
  // Primeiro dígito deve ser 1-9 (código de área)
  const areaCode = cleanPhone.substring(0, 2);
  if (parseInt(areaCode) < 11 || parseInt(areaCode) > 99) {
    return false;
  }
  
  // Se for celular (11 dígitos), o 3º dígito deve ser 9
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
    return false;
  }
  
  return true;
};