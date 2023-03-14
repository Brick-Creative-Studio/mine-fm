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
  //   colorOne: string | null
  //   colorTwo: string | null
  //   direction: string | null
  aura: AuraType
  setAura: (aura: AuraType) => void
  setIdentity: (identity: Identity) => void
}

const initialState = {
  name: null,
  m_tag: null,
  phone: null,
  email: null,
  vibe: null,
  aura: {
    colorOne: '#000',
    colorTwo: '#FFF',
    direction: 'top',
  },
}

type AuraType = {
  colorOne: string 
  colorTwo: string 
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
      setIdentity: (identity: Identity) => set({ ...identity }),
      setVibe: (vibe: string) => set({ vibe })
    }),
    {
      name: `mine-fm-profile`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
