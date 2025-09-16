/**
 * Serviço de validação - Centraliza todas as validações da aplicação
 */
import { validateCPF } from '@/utils/cpf';
import { validatePhone } from '@/utils/phone';
import { validateDate } from '@/utils/date';

export class ValidationService {
  /**
   * Valida email
   */
  static validateEmail(email: string): { isValid: boolean; message?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      return { isValid: false, message: 'Email é obrigatório' };
    }
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email deve ter um formato válido' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida senha
   */
  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (!password) {
      return { isValid: false, message: 'Senha é obrigatória' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }
    
    if (password.length > 50) {
      return { isValid: false, message: 'Senha deve ter no máximo 50 caracteres' };
    }
    
    // Verifica se tem pelo menos uma letra e um número
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasLetter || !hasNumber) {
      return { isValid: false, message: 'Senha deve conter pelo menos uma letra e um número' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida nome
   */
  static validateName(name: string): { isValid: boolean; message?: string } {
    if (!name) {
      return { isValid: false, message: 'Nome é obrigatório' };
    }
    
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Nome deve ter pelo menos 2 caracteres' };
    }
    
    if (name.length > 100) {
      return { isValid: false, message: 'Nome deve ter no máximo 100 caracteres' };
    }
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nameRegex.test(name)) {
      return { isValid: false, message: 'Nome deve conter apenas letras e espaços' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida CPF
   */
  static validateCPF(cpf: string): { isValid: boolean; message?: string } {
    if (!cpf) {
      return { isValid: false, message: 'CPF é obrigatório' };
    }
    
    const isValid = validateCPF(cpf);
    if (!isValid) {
      return { isValid: false, message: 'CPF deve ter um formato válido' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida telefone
   */
  static validatePhone(phone: string): { isValid: boolean; message?: string } {
    if (!phone) {
      return { isValid: false, message: 'Telefone é obrigatório' };
    }
    
    const isValid = validatePhone(phone);
    if (!isValid) {
      return { isValid: false, message: 'Telefone deve ter um formato válido' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida data
   */
  static validateDate(date: string): { isValid: boolean; message?: string } {
    if (!date) {
      return { isValid: false, message: 'Data é obrigatória' };
    }
    
    const isValid = validateDate(date);
    if (!isValid) {
      return { isValid: false, message: 'Data deve ter um formato válido (DD/MM/AAAA)' };
    }
    
    return { isValid: true };
  }

  /**
   * Valida URL
   */
  static validateURL(url: string): { isValid: boolean; message?: string } {
    if (!url) {
      return { isValid: false, message: 'URL é obrigatória' };
    }
    
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, message: 'URL deve ter um formato válido' };
    }
  }

  /**
   * Valida formulário completo
   */
  static validateForm(
    data: Record<string, unknown>,
    rules: Record<string, string[]>
  ): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    for (const [field, validations] of Object.entries(rules)) {
      const value = data[field];
      
      for (const validation of validations) {
        let result: { isValid: boolean; message?: string };
        const stringValue = String(value || '');
        
        switch (validation) {
          case 'email':
            result = this.validateEmail(stringValue);
            break;
          case 'password':
            result = this.validatePassword(stringValue);
            break;
          case 'name':
            result = this.validateName(stringValue);
            break;
          case 'cpf':
            result = this.validateCPF(stringValue);
            break;
          case 'phone':
            result = this.validatePhone(stringValue);
            break;
          case 'date':
            result = this.validateDate(stringValue);
            break;
          case 'url':
            result = this.validateURL(stringValue);
            break;
          case 'required':
            result = { isValid: !!value, message: `${field} é obrigatório` };
            break;
          default:
            result = { isValid: true };
        }
        
        if (!result.isValid) {
          errors[field] = result.message || 'Campo inválido';
          break; // Para na primeira validação que falhar
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export const validationService = ValidationService;