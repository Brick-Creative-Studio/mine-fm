import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet, goerli, optimism, optimismGoerli } from "wagmi/chains";
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import * as process from "process";


function MyApp({ Component, pageProps }: AppProps) {

  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!!;


  const { chains, publicClient } = configureChains(
    [
      optimism,
      optimismGoerli
    ],
    [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ? process.env.NEXT_PUBLIC_ALCHEMY_ID : ""})
    ]
  )

  const { wallets } = getDefaultWallets({
    appName: 'MINE.FM',
    chains,
    projectId,
  })

  const connectors = connectorsForWallets([
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

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={optimism}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp