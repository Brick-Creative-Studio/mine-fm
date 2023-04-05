import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ProfileStoreProps {
  name: string | null
  setName: (name: string) => void
  m_tag: string | null
  email: string | null
  setTag: (m_tag: string) => void
  phone: string | null
  setPhone: (phone: string) => void
  vibe: string | null
  setVibe: (vibe: string) => void
  instagram: string | null
  twitter: string | null
  setTwitter: (url: string) => void
  setInstagram: (link: string) => void
  hasAccount: boolean,
  setHasAccount: (condition: boolean) => void
  aura: AuraType
  setAura: (aura: AuraType) => void
  setIdentity: (identity: Identity) => void
}

const initialState = {
  name: null,
  m_tag: null,
  phone: null,
  email: null,
  hasAccount: false,
  instagram: null,
  twitter: null,
  vibe: null,
  aura: {
    colorOne: '#000',
    colorTwo: '#FFF',
    colorThree: '#240045',
    direction: 'top',
  },
}

type AuraType = {
  colorOne: string
  colorTwo: string
  colorThree: string
  direction: string
}

type Identity = {
  name: string | null
  m_tag: string | null
  phone: string | null
  email: string | null
  vibe: string | null
}

export const useProfileStore = create(
  persist<ProfileStoreProps>(
    (set) => ({
      ...initialState,
      setName: (name: string) => set({ name }),
      setTag: (m_tag: string) => set({ m_tag }),
      setPhone: (phone: string) => set({ phone }),
      setAura: (aura: AuraType) => set({ aura }),
      setHasAccount: (condition: boolean) => set((state) => ({ hasAccount: condition})),
      setIdentity: (identity: Identity) => set({ ...identity }),
      setVibe: (vibe: string) => set({ vibe }),
      setInstagram: (instagram: string) => set({ instagram }),
      setTwitter: (twitter: string) => set({ twitter }),
    }),
    {
      name: `mine-fm-profile`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
