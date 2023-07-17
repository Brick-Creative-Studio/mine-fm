import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useLayoutStore } from 'stores'
import LivestreamForm from "../../../components/Forms/LivestreamForm";

const CreateLiveStream: React.FC = () => {
  const { signerAddress } = useLayoutStore((state) => state)
  

  return (
    <div className="flex flex-col justify-center p-4 w-full mt-24 mb-12">
      <Head>
        <title>Create a Livestream Event</title>
  <meta name="description" content="Create Your Moment" />
  <meta property="og:url" content={`https://mine.fm/create}`} />

  <link rel="icon" href="/favicon.ico" />
    </Head>

   <LivestreamForm/>
  </div>
)
}

export default CreateLiveStream
