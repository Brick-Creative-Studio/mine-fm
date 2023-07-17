import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface EventStoreProps {
  id: string | null
  setId: (id: string) => void
  title: string | null
  setTitle: (id: string) => void

}

const initialState ={
  id: null,
  title: null
}
export const useEventStore = create(
  persist<EventStoreProps>(
    (set) => ({
      ...initialState,
      setId: (id: string) => set({ id }),
      setTitle: (title: string) => set({ title }),

    }),
    {
      name: `mine-fm-event`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)