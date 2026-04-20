import {create} from 'zustand';
import { safeGetItem, safeSetItem } from '@/utils/localStorage';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    init: () => {
        const storedTheme = safeGetItem<Theme>('invoiceapp_theme');
        if (storedTheme) {
            set({ theme: storedTheme });
        }
    },

    theme: (safeGetItem<Theme>('invoiceapp_theme') as Theme) || 'light',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        safeSetItem('invoiceapp_theme', newTheme);
        return { theme: newTheme };
    }),
    setTheme: (theme) => set(() => {
        safeSetItem('invoiceapp_theme', theme);
        return { theme };
    }),
}));