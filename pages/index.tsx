import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CollectionGrid from '../components/Collections'
import { useLayoutStore } from 'stores'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'



//TODO: check signer to see if connected then render Buttons based on proper state
export default function HomePage({ favoriteCollections }: any) {

  const signerAddress = useLayoutStore((state) => state.signerAddress)
  // const signerAddress = null
  console.log('home signer', signerAddress)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mine.FM</title>
        <meta name="description" content="Discover Music with a Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.bodyGradient} />
      <main className={styles.main}>
        <div className={styles.headerLogo}>
          <Image src='/header-text-logo.png' width={515} height={232} />
        </div>
        {signerAddress ? (
          <>
            <div className={styles.searchAndCreate}>
              <button className={styles.exploreButton}>
                <Image src={'/map-icon.png'} width={24} height={24} />
                Explore
              </button>
              <p> Or </p>
              <Link 
                key={'create'}
                href={'./create'}
                >
              <button className={styles.createButton}>
           
                <Image src={'/create-icon.png'} width={24} height={24} />
                Create
               
              </button>
              </Link>
            </div>
            <div>
              <h1 className={styles.header}> Collections You Like to Listen To </h1>
            </div>
            <div>
              <CollectionGrid collectionData={favoriteCollections} />
            </div>
          </>
        ) : <ConnectButton />
        }

      </main>
    </div>
  )
}
