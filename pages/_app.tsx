import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import {mainnet, goerli} from 'wagmi/chains'
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


function MyApp({ Component, pageProps }: AppProps) {

  const { chains, provider } = configureChains(
    [
      mainnet,
      // chain.polygon,
      // chain.optimism,
      // chain.arbitrum,
      // chain.ropsten,
      goerli,
    ],
    [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ? process.env.NEXT_PUBLIC_ALCHEMY_ID : ""})
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'Mine.fm',
    chains
  })

  const connector = new MetaMaskConnector({
    options: {
      shimDisconnect: false,
    },
  })
  
  
  
  // connectors().push(connector)

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={mainnet}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp