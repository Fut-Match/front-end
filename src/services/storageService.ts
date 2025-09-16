/**
 * Serviço de armazenamento local - Centraliza operações com localStorage/sessionStorage
 */

export class StorageService {
  /**
   * Salva dados no localStorage com serialização automática
   */
  static setLocal<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Erro ao salvar no localStorage: ${key}`, error);
    }
  }

  /**
   * Obtém dados do localStorage com desserialização automática
   */
  static getLocal<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Erro ao obter do localStorage: ${key}`, error);
      return null;
    }
  }

  /**
   * Remove item do localStorage
   */
  static removeLocal(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover do localStorage: ${key}`, error);
    }
  }

  /**
   * Limpa todo o localStorage
   */
  static clearLocal(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar localStorage', error);
    }
  }

  /**
   * Salva dados no sessionStorage
   */
  static setSession<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Erro ao salvar no sessionStorage: ${key}`, error);
    }
  }

  /**
   * Obtém dados do sessionStorage
   */
  static getSession<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Erro ao obter do sessionStorage: ${key}`, error);
      return null;
    }
  }

  /**
   * Remove item do sessionStorage
   */
  static removeSession(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover do sessionStorage: ${key}`, error);
    }
  }

  /**
   * Verifica se localStorage está disponível
   */
  static isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se sessionStorage está disponível
   */
  static isSessionStorageAvailable(): boolean {
    try {
      const test = 'test';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Salva dados com expiração
   */
  static setWithExpiry<T>(key: string, value: T, ttl: number): void {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    this.setLocal(key, item);
  }

  /**
   * Obtém dados verificando expiração
   */
  static getWithExpiry<T>(key: string): T | null {
    const item = this.getLocal<{ value: T; expiry: number }>(key);
    
    if (!item) {
      return null;
    }
    
    const now = new Date();
    if (now.getTime() > item.expiry) {
      this.removeLocal(key);
      return null;
    }
    
    return item.value;
  }
}

export const storageService = StorageService;