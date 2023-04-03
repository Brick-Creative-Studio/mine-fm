import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Message } from 'types/Message'

interface MsgStoreProps {
  messages: Message[]
  setMessages: (message: Message) => void
}

export const useMsgStore = create(
  persist<MsgStoreProps>(
    (set) => ({
      messages: [],
      setMessages: (message: Message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            message
          },
        })
        ),
    }),
    {
      name: `mine-msgs`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
