import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import {mainnet, goerli, optimism} from 'wagmi/chains'
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


function MyApp({ Component, pageProps }: AppProps) {

  const { chains, provider } = configureChains(
    [
      // mainnet,
      // chain.polygon,
      optimism
      // chain.arbitrum,
      // goerli,
    ],
    [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ? process.env.NEXT_PUBLIC_ALCHEMY_ID : ""})
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'MINE.FM',
    chains
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={optimism}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp