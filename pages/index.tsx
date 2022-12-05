import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Layout/Nav'
import SearchBar from '../components/SearchBar'
import CollectionGrid from '../components/Collections'
import { inputFocus, container, submitsearch, searchInput } from '../styles/SearchBar.css';

export const getServerSideProps: GetServerSideProps = async (context) => {

  try {
    
    const favoriteCollections = [
      {
        url: '/sample-cl-freddie.png', 
        artist: 'Freddie Gibbs',
        title: 'Alfredo'
      }, 
      {
        url: '/sample-cl-jaquell.png', 
        artist: 'Jaquell',
        title: 'Exit Earth'
      }, 
      {
        url: '/sample-cl-saba.png', 
        artist: 'Saba',
        title: 'Few Good Things'
      }, 
      {
        url: '/sample-cl-sango.png', 
        artist: 'Sango',
        title: 'Deep End'
      }, 
      {
        url: '/sample-cl-solange.png', 
        artist: 'Solange',
        title: 'When I Get Home'
      }, 
      {
        url: '/sample-cl-ljune.png', 
        artist: 'Larry June',
        title: 'Spaceships on...'
      }, 
      {
        url: '/sample-cl-alchemist.png', 
        artist: 'Roc Marcian..',
        title: 'Rubber Hand Gr..'
      }, 
      {
        url: '/sample-cl-pusha.png', 
        artist: 'Pusha T',
        title: 'Neck and Wrist'
      }, 
      
    ]
    return {
      props: {favoriteCollections}, // will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
    return {
      notFound: true,
    }
  }
  
}

export default function HomePage({favoriteCollections}: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mine.FM</title>
        <meta name="description" content="Discover Music with a Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.bodyGradient} />
      <main className={styles.main}>
        <Nav />
        <div className={styles.headerLogo}>
          <Image src='/header-text-logo.png' width={515} height={232} />
        </div>
        <div className={styles.searchAndCreate}>
          <SearchBar />
          <p> Or </p>
          <button className={styles.createButton}>
            <Image src={'/create-icon.png'} width={24} height={24} />
            Create
          </button>
        </div>
        <div>
          <h1 className={styles.header}> Collections You Like to Listen To </h1>
        </div>
        <div>
          <CollectionGrid collectionData={favoriteCollections}/> 
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="brickxstudio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Brick Studio Product{' '}
          <span className={styles.logo}>
            <Image src="/BrckStd_BS-logo-Black.svg" alt="Brick Studio Logo" width={42} height={42} />
          </span>
        </a>
      </footer>
    </div>
  )
}
