import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ProfileStoreProps {
  id: string | null
  setId: (id: string) => void
  name: string | null
  setName: (name: string) => void
  miner_tag: string | null
  email: string | null
  setTag: (m_tag: string) => void
  bio: string | null
  setBio: (vibe: string) => void
  instagram: string | null
  twitter: string | null
  setTwitter: (url: string) => void
  setInstagram: (link: string) => void
  hasAccount: boolean
  setHasAccount: (condition: boolean) => void
  aura: AuraType
  setAura: (aura: AuraType) => void
  setIdentity: (identity: Identity) => void
  setBasicInfo: (info: BasicInfo) => void

  resetProfileState: () => void


}

const initialState = {
  name: null,
  id: null,
  miner_tag: null,
  email: null,
  hasAccount: false,
  instagram: null,
  twitter: null,
  bio: null,
  aura: {
    direction: 'top',
    colorOne: '#FFF',
    colorTwo: '#FFF',
    colorThree: '#FFF'
  },
}

type AuraType = {
  direction: string
  colorOne: string
  colorTwo: string
  colorThree: string
}

export type Identity = {
  id: string | null
  name: string | null
  miner_tag: string | null
  email: string | null
  bio: string | null
  instagram: string | null,
  twitter: string | null,
}

type BasicInfo = {
  name: string | null
  miner_tag: string | null
  email: string | null
  bio: string | null
}

export const useProfileStore = create(
  persist<ProfileStoreProps>(
    (set) => ({
      ...initialState,
      setName: (name: string) => set({ name }),
      setId: (id: string) => set({ id }),
      setTag: (m_tag: string) => set({ miner_tag: m_tag }),
      setAura: (aura: AuraType) => set({ aura }),
      setHasAccount: (condition: boolean) => set((state) => ({ hasAccount: condition })),
      setIdentity: (identity: Identity) => set({ ...identity }),
      setBasicInfo: (info: BasicInfo) => set({ ...info }),
      setBio: (bio: string) => set({ bio }),
      setInstagram: (instagram: string) => set({ instagram }),
      setTwitter: (twitter: string) => set({ twitter }),
      resetProfileState: () => {
        set(initialState)
      },
    }),
    {
      name: `mine-fm-profile`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
