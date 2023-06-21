import React from 'react'
import Head from 'next/head'
import { FormHandler } from 'components/Layout/FormHandler'
import { useRouter } from 'next/router'
import { useLayoutStore } from 'stores'
import LivestreamForm from "../../../components/Forms/LivestreamForm";

const CreateLiveStream: React.FC = () => {
  const { signerAddress } = useLayoutStore((state) => state)
  const { query } = useRouter()

  const forms = [
    {
      title: 'Mood',
      component: [<LivestreamForm key={'mood-form'} />],
    }
  ]

  return (
    <div className="flex flex-col justify-center px-8 ml-8 w-full mt-24 mb-12">
      <Head>
        <title>Create a Livestream Event</title>
  <meta name="description" content="Create Your Sound" />
  <meta property="og:url" content={`https://mine.fm/create}`} />

  <link rel="icon" href="/favicon.ico" />
    </Head>

    <FormHandler
  forms={forms}
  signerAddress={signerAddress ? signerAddress : undefined}
  activeTab={query?.tab ? (query.tab as string) : undefined}
  />
  </div>
)
}

export default CreateLiveStream
