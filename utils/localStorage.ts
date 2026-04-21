export function safeGetItem<T>(key: string): T | null {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return null;
        }
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
        console.error(`Error getting item from localStorage with key "${key}":`, error);
        return null;
    }
}

export function safeSetItem<T>(key: string, value: T): void {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item in localStorage with key "${key}":`, error);
    }
}

export function safeRemoveItem(key: string): void {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item from localStorage with key "${key}":`, error);
    }
}
