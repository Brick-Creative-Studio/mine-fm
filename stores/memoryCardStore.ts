import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MCStoreProps {
  needsCard: boolean
  setStatus: (condition: boolean) => void
}

export const useMCStore = create(
  persist<MCStoreProps>(
    (set) => ({
      needsCard: true,
      setStatus: (condition: boolean) => set(() => ({ needsCard: condition })),
    }),
    {
      name: `mine-memory-card`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
