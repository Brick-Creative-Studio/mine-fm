import React from 'react'
import Head from 'next/head'
import SongForm from 'pages/create/onchain/SongForm'


const Create: React.FC = () => {

  


    return (
        <div className='flex w-full px-8 '>
            <Head>
                <title>Create Your Sound</title>
                <meta name="description" content="Create Your Sound" />
                <meta property="og:url" content={`https://mine.fm/create}`} />

                <link rel="icon" href="/favicon.ico" />
            </Head>

        <SongForm/>

          
        </div>
    )
}

export default Create