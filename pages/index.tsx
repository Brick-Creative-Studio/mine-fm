import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useIsMounted } from 'hooks/useMounted'




//TODO: check signer to see if connected then render Buttons based on proper state
export default function HomePage({}) {

  // const { setSigner, setSignerAddress, signer, signerAddress } = useLayoutStore()

  const isMounted = useIsMounted()
  
  return (
    <div >
      <Head>
        <title>Mine.FM</title>
        <meta name="description" content="Discover Music with a Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.headerLogo}>
          <Image src='/text-logo-pr-header.png' alt='mine-header-logo' width={515} height={232} />
        </div>
        {isMounted && (
          <>
            <div className={styles.exploreAndCreate}>
              <Link
              href={'/create'}
              >
              <button className={styles.createButton}>
                <Image src={'/boulder.svg'} className="m-4"  alt='create button'  width={28} height={28} />
                <h2 className='mr-2'>Create</h2>
              </button>
              </Link>

              <Link
              href={'/explore'}
              >
              <button className={styles.exploreButton}>
                <Image src={'/shovel.svg'} className="m-4"  alt='explore button'  width={28} height={28} />
                <h2 className='mr-2'>Explore</h2>
              </button>
              </Link>
            
            </div>
            <div>
            </div>
          </>
        )}

      </main>
    </div>
  )
}
