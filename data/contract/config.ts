import { connectorsForWallets, getDefaultWallets, Wallet, WalletList, getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { createConfig } from 'wagmi'
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { chains, publicClient, webSocketPublicClient } from './chains'
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!!;

const { wallets,  } = getDefaultWallets({
  appName: 'MINE.FM',
  chains,
  projectId,

})

export const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  }
]);
const provider = alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ? process.env.NEXT_PUBLIC_ALCHEMY_ID : ""})


export const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
})