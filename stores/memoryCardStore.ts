import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MCStoreProps {
    needsCard: boolean
    setAttendance: () => void
}

export const useMCStore = create(
    persist<MCStoreProps>(
        (set) => ({
            needsCard: false,
            setAttendance: () => set({ needsCard: true })
        }),
        {
            name: `mine-memory-card`,
            storage: createJSONStorage(() => localStorage),
            version: 0,
          }
    )
)