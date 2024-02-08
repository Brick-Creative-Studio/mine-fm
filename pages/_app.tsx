import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import {PrivyProvider} from '@privy-io/react-auth';
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet, goerli, base, baseGoerli } from 'viem/chains'
import Layout  from '../components/Layout/Layout'
import { config } from '../data/contract/config'
import Footer from "../components/Layout/Footer";
import { createPublicClient, http, } from 'viem'
import React from "react";
import Head from "next/head";
import {publicProvider} from 'wagmi/providers/public';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';



function MyApp({ Component, pageProps }: AppProps) {

  // This method will be passed to the PrivyProvider as a callback
// that runs after successful login.
  const handleLogin = (user: any) => {
    console.log(`User ${user.id} logged in!`)
  }
  const configureChainsConfig = configureChains([base, baseGoerli], [publicProvider()]);



  return (
    <>
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
        </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        onSuccess={handleLogin}
        config={{
          loginMethods: ['email', 'wallet', 'sms'],
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: '/mine-boxLogo-icon.svg',
          },
          supportedChains: [ baseGoerli ]
        }}
      >
        <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>

        <Layout>
        <Component {...pageProps} />
      </Layout>
        <Footer />

        <Analytics />
        </PrivyWagmiConnector>

      </PrivyProvider>
    </>
  )
}

export default MyApp