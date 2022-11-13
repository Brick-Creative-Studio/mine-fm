import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Layout/Nav'
import SearchBar from '../components/SearchBar'
import { inputFocus, container, submitsearch, searchInput } from '../styles/SearchBar.css';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mine.FM</title>
        <meta name="description" content="Discover Music with a Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.bodyGradient}/>
      <main className={styles.main}>
       <Nav/>
       <div className={styles.headerLogo}>
      <Image src='/header-text-logo.png'  width={515} height={232}/>
      </div>
      <div className={styles.searchAndCreate}>
      <SearchBar/>
      <p> Or </p>
      <button className={styles.createButton}> 
      <Image src={'/create-icon.png'} width={24} height={24} /> 
      Create 
      </button>
      </div>
      <div>
        <h1 className={styles.header}> Collections You Like to Listen To </h1>
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

export default Home
