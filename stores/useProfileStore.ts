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
  vibe: string | null
  setVibe: (vibe: string) => void
  instagram: string | null
  twitter: string | null
  setTwitter: (url: string) => void
  setInstagram: (link: string) => void
  hasAccount: boolean
  setHasAccount: (condition: boolean) => void
  aura: AuraType
  setAura: (aura: AuraType) => void
  setIdentity: (identity: Identity) => void
  hasVote: boolean
  setVoteStatus: (status: boolean) => void
}

const initialState = {
  name: null,
  id: null,
  hasMoody: false,
  m_tag: null,
  phone: null,
  email: null,
  hasVote: true,
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
      setId: (id: string) => set({ id }),
      setHasMoody: (status: boolean) => set({ status }),
      setTag: (m_tag: string) => set({ m_tag }),
      setPhone: (phone: string) => set({ phone }),
      setAura: (aura: AuraType) => set({ aura }),
      setHasAccount: (condition: boolean) => set((state) => ({ hasAccount: condition })),
      setIdentity: (identity: Identity) => set({ ...identity }),
      setVibe: (vibe: string) => set({ vibe }),
      setInstagram: (instagram: string) => set({ instagram }),
      setTwitter: (twitter: string) => set({ twitter }),
      setVoteStatus: (status: boolean) => set({ status }),
    }),
    {
      name: `mine-fm-profile`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
