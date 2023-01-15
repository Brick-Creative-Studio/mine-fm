import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'

function MyApp({ Component, pageProps }: AppProps) {

  const { chains, provider } = configureChains(
    [
      chain.mainnet,
      // chain.polygon,
      // chain.optimism,
      // chain.arbitrum,
      // chain.ropsten,
      chain.goerli,
    ],
    [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID })
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'Mine.fm',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={chain.mainnet}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
