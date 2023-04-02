import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MsgStoreProps {
  messages: Messages[]
  setMessages: (message: Messages) => void
}

type Messages = {
  message: string
  time: string
  mTag: string
}

const initialState = {
  messages: [],
}

export const useMsgStore = create(
  persist<MsgStoreProps>(
    (set) => ({
      ...initialState,
      setMessages: (message: Messages) =>
        set((state) => ({
          messages: {...state.messages, message},
        }))
  }),
  {
    name: `mine-msgs`,
    storage: createJSONStorage(() => localStorage),
    version: 0,
  }
  )
)