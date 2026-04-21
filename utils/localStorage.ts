export function safeGetItem<T>(key: string): T | null {
    try {
        console.log(typeof window)
    if (typeof window === 'undefined' || !window.localStorage) {
        console.warn(`localStorage is not available. Cannot get item with key "${key}".`);
        return null;
    }
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    } catch (error) {
        console.error(`Error getting item from localStorage with key "${key}":`, error);
        return null;
    }
}

export function safeSetItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item in localStorage with key "${key}":`, error);
    }
}

export function safeRemoveItem(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item from localStorage with key "${key}":`, error);
    }
}
