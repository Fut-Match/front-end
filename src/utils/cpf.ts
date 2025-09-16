/**
 * Utilitários para formatação e validação de CPF
 */

/**
 * Formata uma string de CPF para o padrão XXX.XXX.XXX-XX
 * @param cpf - String do CPF (apenas números)
 * @returns CPF formatado ou string vazia se inválido
 */
export const formatCPF = (cpf: string): string => {
  // Remove tudo que não é número
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Se não tem 11 dígitos, retorna como está
  if (cleanCPF.length !== 11) {
    return cleanCPF;
  }
  
  // Aplica a máscara XXX.XXX.XXX-XX
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Remove a formatação do CPF, deixando apenas números
 * @param cpf - CPF formatado
 * @returns CPF apenas com números
 */
export const unformatCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

/**
 * Valida se o CPF é válido
 * @param cpf - CPF (com ou sem formatação)
 * @returns true se válido, false se inválido
 */
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = unformatCPF(cpf);
  
  // CPF deve ter 11 dígitos
  if (cleanCPF.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  const digit1 = remainder >= 10 ? 0 : remainder;
  
  if (digit1 !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  const digit2 = remainder >= 10 ? 0 : remainder;
  
  return digit2 === parseInt(cleanCPF.charAt(10));
};

/**
 * Aplica máscara de CPF durante a digitação
 * @param value - Valor atual do input
 * @returns Valor com máscara aplicada
 */
export const maskCPF = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 3) {
    return cleanValue;
  } else if (cleanValue.length <= 6) {
    return cleanValue.replace(/(\d{3})(\d+)/, '$1.$2');
  } else if (cleanValue.length <= 9) {
    return cleanValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  } else {
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  }
};