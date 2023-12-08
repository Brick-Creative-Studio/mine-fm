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
import { mainnet, goerli, base, baseGoerli } from 'viem/chains'
import { router } from "next/client";
import Layout  from '../components/Layout/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { chains } from "../data/contract/chains";
import { config } from '../data/contract/config'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import Footer from "../components/Layout/Footer";
import { createPublicClient, http, } from 'viem'
import React from "react";
import Head from "next/head";
import { SplitsProvider, useSplitMetadata } from '@0xsplits/splits-sdk-react'



function MyApp({ Component, pageProps }: AppProps) {

  const publicClient = createPublicClient({
    chain: baseGoerli,
    transport: http()
  })

  const splitsConfig = {
    chainId: 5,
    publicClient,
  }


  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} initialChain={baseGoerli}>
        {/* Head */}
        <Head>
          <title key="title">MINE.FM</title>
          <meta
            name="description"
            content="Discover Music with a Community"
            key="description"
          />
          <meta property="og:title" content="MINE.FM" key="og_title" />
          <meta property="og:type" content="website" key="og_type" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          <meta
            property="og:description"
            content="Discover Music with a Community"
            key="og_description"
          />
          <meta
            property="og:url"
            content={process.env.NEXT_PUBLIC_CLIENT_URL}
            key="og_url"
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_CLIENT_URL}/mine-boxLogo-icon.svg`}
            key="og_image"
          />
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter_card"
          />
          <meta name="twitter:site" content="@_minefm" key="twitter_site" />
          <meta
            name="twitter:creator"
            content="@_minefm"
            key="twitter_creator"
          />
          <meta
            name="twitter:image"
            content={`${process.env.NEXT_PUBLIC_CLIENT_URL}/mine-boxLogo-icon.svg`}
            key="twitter_image"
          />

          {/*{router.pathname.includes("/collect") ? (*/}
          {/*  <link*/}
          {/*    rel="shortcut icon"*/}
          {/*    href={`/img/titles-logo-800.ico`}*/}
          {/*    sizes="any"*/}
          {/*    type="image/x-icon"*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  ""*/}
          {/*)}*/}
        </Head>
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