import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, goerli, optimism } from 'wagmi/chains'
import Layout from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [optimism, goerli],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID
          ? process.env.NEXT_PUBLIC_ALCHEMY_ID
          : '',
      }),
    ],

  )
  const projectId = '4fe03bd3764f7528d95b9ebed65f5035'

  const { wallets } = getDefaultWallets({
    appName: 'MINE.FM',
    projectId,
    chains,
  })

  const connectors =connectorsForWallets([
      ...wallets,
    {
      groupName: 'Other',
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ])

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,

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
