import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from 'wagmi'
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet, goerli, optimism, optimismGoerli, zora, zoraTestnet } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { chains, publicClient } from './chains'

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!!;

const { wallets } = getDefaultWallets({
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
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})