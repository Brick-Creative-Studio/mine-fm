import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface EventStoreProps {
  id: string | null
  title: string | null
  posterUrl: string | null
  memoryCardURL:  string | null
  memoryCardFile: File | null
  address: string | null
  website?: string  | null
  ownerAddress: string | null
  ownerId: string | null,
  organizer: string | null
  artist: string | null
  isFree: boolean
  startingPrice: string | null
  startDate: string | null
  startTime: string | null
  endDate: string | null
  endTime: string | null
  description: string | null
  metaDataURL: string | null
  tokenAddress: `0x${string}` | null
  social: string  | null
  splitAddress: string | null
  setId: (id: string) => void
  setSplitAddress: (splitAddress: string) => void
  setEvent: (initialState: any) => void
  setTitle: (id: string) => void
  setPosterUrl: (url: string | null) => void
  setMemoryFile: (sticker : File) => void
  setCardUrl: (url: string | null) => void
  setTokenAddress: (tokenAddress: `0x${string}`) => void
}

const initialState ={
  id: null,
  title: null,
  posterUrl: null,
  memoryCardURL:  null,
  memoryCardFile: null,
  address: null,
  ownerAddress: null,
  ownerId: null,
  organizer: null,
  artist: null,
  website: null,
  isFree: false,
  startingPrice: null,
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  social: null,
  description: null,
  metaDataURL: null,
  splitAddress: null,
  tokenAddress: null
}
export const useEventStore = create(
  persist<EventStoreProps>(
    (set) => ({
      ...initialState,
      setId: (id: string) => set({ id }),
      setTitle: (title: string) => set({ title }),
      setEvent: (initialState: any) => set({...initialState}),
      setPosterUrl: (posterUrl: string | null) => set({ posterUrl }),
      setMemoryFile: (sticker: File) => set({ memoryCardFile: sticker }),
      setCardUrl: (memoryCardURL: string | null) => set({ memoryCardURL }),
      setSplitAddress: (splitAddress: string) => set({ splitAddress }),
      setTokenAddress: (tokenAddress: `0x${string}`) => set({ tokenAddress })
    }),
    {
      name: `mine-fm-event`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
      skipHydration: false
    }
  )
)