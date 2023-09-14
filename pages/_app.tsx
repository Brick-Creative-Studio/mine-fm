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
import { mainnet, goerli, optimism, optimismGoerli, zora, zoraTestnet } from "wagmi/chains";
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { chains } from '../data/contract/chains'
import { config } from '../data/contract/config'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import Footer from "../components/Layout/Footer";
import React from "react";



function MyApp({ Component, pageProps }: AppProps) {


  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} initialChain={zora}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
        <Footer />

        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp