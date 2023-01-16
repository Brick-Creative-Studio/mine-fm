import React from 'react'
import Head from 'next/head'
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { bodyGradient } from 'styles/gradient.css'


const Create: React.FC = () => {

    return (
        <div>
            <Head>
                <title>Create Your Sound</title>
                <meta name="description"  content="Create Your Sound" />
                <meta property="og:url" content={`https://mine.fm/create}`} />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={bodyGradient} />

        </div>
    )
}

export default Create