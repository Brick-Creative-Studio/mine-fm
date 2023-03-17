import React from 'react'
import Head from 'next/head'
import SongForm from 'components/Forms/SongForm'
import MoodForm from 'components/Forms/MoodForm'
import CollectionForm from 'components/Forms/CollectionForm'
import { FormHandler } from 'components/Layout/FormHandler'
import { useRouter } from 'next/router'
import { useLayoutStore } from 'stores'

const Create: React.FC = () => {
  const { signerAddress } = useLayoutStore((state) => state)
  const { query } = useRouter()

  const forms = [
    {
      title: 'Mood',
      component: [<MoodForm key={'mood-form'} />],
    },
    {
      title: 'Song',
      component: [<SongForm key={'song-form'} />],
    },
    {
      title: 'Collection',
      component: [<CollectionForm key={'collection-form'} />],
    },
  ]

  return (
    <div className="flex flex-col justify-center px-8 ml-8 w-full mt-24 mb-12">
      <Head>
        <title>Put Your Sound Onchain</title>
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

export default Create
