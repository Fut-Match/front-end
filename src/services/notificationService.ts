/**
 * Serviço de notificações - Centraliza notificações toast e push
 */
import { useToast } from '@/hooks/use-toast';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastOptions extends NotificationOptions {
  variant?: 'default' | 'destructive';
}

export class NotificationService {
  private static toastHook: ReturnType<typeof useToast>['toast'] | null = null;

  /**
   * Inicializa o serviço com o hook de toast
   */
  static initialize(toast: ReturnType<typeof useToast>['toast']) {
    this.toastHook = toast;
  }

  /**
   * Exibe notificação de sucesso
   */
  static success(options: NotificationOptions) {
    this.showNotification('success', {
      title: '✅ Sucesso',
      ...options,
    });
  }

  /**
   * Exibe notificação de erro
   */
  static error(options: NotificationOptions) {
    this.showNotification('error', {
      title: '❌ Erro',
      ...options,
      variant: 'destructive',
    });
  }

  /**
   * Exibe notificação de aviso
   */
  static warning(options: NotificationOptions) {
    this.showNotification('warning', {
      title: '⚠️ Atenção',
      ...options,
    });
  }

  /**
   * Exibe notificação informativa
   */
  static info(options: NotificationOptions) {
    this.showNotification('info', {
      title: 'ℹ️ Informação',
      ...options,
    });
  }

  /**
   * Exibe notificação personalizada
   */
  private static showNotification(type: NotificationType, options: unknown) {
    if (!this.toastHook) {
      console.warn('NotificationService não foi inicializado');
      return;
    }

    this.toastHook(options);
  }

  /**
   * Solicita permissão para notificações push
   */
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações push');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  /**
   * Exibe notificação push
   */
  static async showPushNotification(title: string, options?: NotificationOptions) {
    const hasPermission = await this.requestPermission();
    
    if (!hasPermission) {
      console.warn('Permissão para notificações negada');
      return;
    }

    new Notification(title, {
      body: options?.description,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
  }

  /**
   * Atalhos para notificações comuns
   */
  static loginSuccess() {
    this.success({
      title: 'Login realizado com sucesso!',
      description: 'Bem-vindo de volta!',
    });
  }

  static loginError(message?: string) {
    this.error({
      title: 'Erro no login',
      description: message || 'Credenciais inválidas',
    });
  }

  static saveSuccess() {
    this.success({
      title: 'Dados salvos com sucesso!',
      description: 'Suas alterações foram salvas.',
    });
  }

  static saveError(message?: string) {
    this.error({
      title: 'Erro ao salvar',
      description: message || 'Não foi possível salvar os dados.',
    });
  }

  static deleteSuccess() {
    this.success({
      title: 'Item removido com sucesso!',
      description: 'O item foi excluído permanentemente.',
    });
  }

  static deleteError(message?: string) {
    this.error({
      title: 'Erro ao remover',
      description: message || 'Não foi possível remover o item.',
    });
  }

  static networkError() {
    this.error({
      title: 'Erro de conexão',
      description: 'Verifique sua conexão com a internet.',
    });
  }

  static permissionDenied() {
    this.warning({
      title: 'Acesso negado',
      description: 'Você não tem permissão para esta ação.',
    });
  }
}

export const notificationService = NotificationService;