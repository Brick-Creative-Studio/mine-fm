import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ProfileStoreProps {
  id: string | null
  setId: (id: string) => void
  name: string | null
  hasMoody: boolean
  setHasMoody: (status: boolean) => void
  setName: (name: string) => void
  m_tag: string | null
  email: string | null
  setTag: (m_tag: string) => void
  phone: string | null
  setPhone: (phone: string) => void
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

}

const initialState = {
  name: null,
  id: null,
  hasMoody: false,
  m_tag: null,
  phone: null,
  email: null,
  hasAccount: false,
  instagram: null,
  twitter: null,
  bio: null,
  aura: {
    direction: 'top',
    colorOne: '#000',
    colorTwo: '#FFF',
    colorThree: '#240045'
  },
}

type AuraType = {
  direction: string
  colorOne: string
  colorTwo: string
  colorThree: string
}

type Identity = {
  id: string | null
  name: string | null
  m_tag: string | null
  phone: string | null
  email: string | null
  bio: string | null
  instagram: string | null,
  twitter: string | null,
}

export const useProfileStore = create(
  persist<ProfileStoreProps>(
    (set) => ({
      ...initialState,
      setName: (name: string) => set({ name }),
      setId: (id: string) => set({ id }),
      setHasMoody: (hasMoody: boolean) => set({ hasMoody }),
      setTag: (m_tag: string) => set({ m_tag }),
      setPhone: (phone: string) => set({ phone }),
      setAura: (aura: AuraType) => set({ aura }),
      setHasAccount: (condition: boolean) => set((state) => ({ hasAccount: condition })),
      setIdentity: (identity: Identity) => set({ ...identity }),
      setBio: (bio: string) => set({ bio }),
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
