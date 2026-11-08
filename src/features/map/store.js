import { useDeferredValue, useMemo } from 'react';
import { create } from 'zustand';
import { BUSINESSES } from './mock';
export const useMapStore = create((set) => ({
    selectedId: null,
    lastSelectedId: null,
    category: 'all',
    query: '',
    savedIds: [],
    select: (id) => set((state) => ({
        selectedId: id,
        lastSelectedId: id ?? state.lastSelectedId,
    })),
    setCategory: (category) => set({ category }),
    setQuery: (query) => set({ query }),
    toggleSave: (id) => set((s) => ({
        savedIds: s.savedIds.includes(id)
            ? s.savedIds.filter((x) => x !== id)
            : [...s.savedIds, id],
    })),
}));
export function useVisibleBusinesses() {
    const category = useMapStore((s) => s.category);
    const query = useDeferredValue(useMapStore((s) => s.query));
    return useMemo(() => {
        const q = query.trim().toLowerCase();
        return BUSINESSES.filter((b) => (category === 'all' || b.category === category) &&
            (!q ||
                b.name.toLowerCase().includes(q) ||
                b.tags.some((t) => t.toLowerCase().includes(q))));
    }, [category, query]);
}
