import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

function MyApp({ Component, pageProps }: AppProps) {
  
const { chains, provider } = configureChains(
  [
    // chain.mainnet,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
    // chain.ropsten,
    chain.goerli,
  ],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: () => ({
        http: process?.env?.ETH_RPC_URL || '',
      }),
    }),
    publicProvider({ priority: 1 }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Zounds forms',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

return( 

<Component {...pageProps} />
)
}

export default MyApp
