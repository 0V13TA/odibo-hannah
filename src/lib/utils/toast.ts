import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    add: (type: ToastType, message: string, description?: string, duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const toast: Toast = { id, type, message, description, duration };

      update(toasts => [...toasts, toast]);

      if (duration > 0) {
        setTimeout(() => {
          update(toasts => toasts.filter(t => t.id !== id));
        }, duration);
      }

      return id;
    },
    remove: (id: string) => {
      update(toasts => toasts.filter(t => t.id !== id));
    },
    clear: () => update(() => [])
  };
}

export const toasts = createToastStore();

// Convenience methods
export const toast = {
  success: (message: string, description?: string) => toasts.add('success', message, description),
  error: (message: string, description?: string) => toasts.add('error', message, description),
  warning: (message: string, description?: string) => toasts.add('warning', message, description),
  info: (message: string, description?: string) => toasts.add('info', message, description),
};
