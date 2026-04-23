import { create } from 'zustand';
import { safeGetItem, safeSetItem } from '@/utils/localStorage';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: (safeGetItem<Theme>('invoiceapp_theme') as Theme) || 'light',

  initTheme: () => {
    const storedTheme = safeGetItem<Theme>('invoiceapp_theme');
    const theme = storedTheme || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    safeSetItem('invoiceapp_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    set({ theme: newTheme });
  },

  setTheme: (theme) => {
    safeSetItem('invoiceapp_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },
}));