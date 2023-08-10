import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface EventStoreProps {
  id: string | null
  setId: (id: string) => void
  title: string | null
  setTitle: (id: string) => void
  setEvent: (initialState: any) => void
  posterUrl: string | null
  setPosterUrl: (url: string) => void
}

const initialState ={
  id: null,
  title: null,
  posterUrl: null
}
export const useEventStore = create(
  persist<EventStoreProps>(
    (set) => ({
      ...initialState,
      setId: (id: string) => set({ id }),
      setTitle: (title: string) => set({ title }),
      setEvent: (initialState: any) => set({...initialState}),
      setPosterUrl: (posterUrl: string) => set({ posterUrl })
    }),
    {
      name: `mine-fm-event`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)