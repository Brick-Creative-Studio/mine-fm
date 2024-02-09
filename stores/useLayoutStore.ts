import { Provider } from '@ethersproject/abstract-provider'
import { GetWalletClientResult } from '@wagmi/core'
import {create} from 'zustand'

interface LayoutStoreProps {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  signer: GetWalletClientResult | undefined
  signerAddress: string | null
  setSignerAddress: (address: string | null) => void
  setSigner: (signer: GetWalletClientResult | undefined) => void
  provider: Provider | undefined
  setProvider: (provider: Provider) => void
}

export const useLayoutStore = create<LayoutStoreProps>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set( {isMobile }),

  signer: undefined,
  setSigner: (signer: GetWalletClientResult | undefined) => set({ signer }),

  signerAddress: null,
  setSignerAddress: (signerAddress: string | null) => set({ signerAddress }),

  provider: undefined,
  setProvider: (provider: Provider | undefined) => set({ provider }),

  //TODO: isAudioInit value
  // setter function and reference in page audio player will have setter function and will be reading isAudioPlaying in the viz component
}))
