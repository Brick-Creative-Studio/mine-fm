import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Link from 'next/link'
import { useIsMounted } from 'hooks/useMounted'
import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutStore } from '../stores'

import { MoodCard } from "../components/Cards/MoodCard";
import { mood001, mood002, mood003 } from "../constants/moods";
import React from "react";
import Popup from "reactjs-popup";


export default function HomePage({}) {

  const { isMobile } = useLayoutStore()
  const isMounted = useIsMounted()
  
  return (
    <div >

      <Head>
        <title>Mine.FM</title>
        <meta
          name="description"
          content="Discover Music with a Community"
          key="description"
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="MINE.FM" key="og_title" />
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
      </Head>

      <main className={styles.main}>
        <AnimatePresence mode={'wait'}>
          <motion.div
            key={'home'}
            variants={{
              closed: {
                y: 20,
                opacity: 0,
                transition: {ease: "easeIn"}

              },
              open: {
                y: 0,
                opacity: 1,
                transition: { duration: 2.5 },

              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className={'self-center drop-shadow-2xl mt-32 mb-4'}>
              { isMobile ?
                <p className={'text-center text-[24px] text-[#B999FA]'}> STREAM, DISCOVER, EARN.  </p> : null
              }
              <img className={'w-[360px] h-[150px] mx-auto mb-0  md:w-full lg:h-full'} src='/mineHEADER_v3.png' alt='mine-header-logo'/>
            </div>
          </motion.div>
        </AnimatePresence>

        {isMounted && (
          <>

            <div className={'flex justify-evenly md:w-3/5 '}>
              <Link
              href={'/create'}
              >
              <button className={'m-3 bg-transparent text-white flex flex-row-reverse w-40 h-12 md:w-40 md:h-12 hover:bg-fuchsia-950 justify-between items-center cursor-pointer rounded-3xl border-solid border-4 border-[#B999FA]'}>
                <h2 className='mx-auto text-[#B999FA]'>Create</h2>
                {/*<div className={'w-8 h-8 bg-[#B999FA] rounded-full flex justify-center items-center'}>*/}
                {/*  <img className={'h-6 w-6'} alt={'explore button'} src={'/arrow-left.svg'}/>*/}
                {/*</div>*/}
              </button>

              </Link>
              { isMobile ?
                null : <p className={'text-center text-[24px] text-[#B999FA]'}> STREAM, DISCOVER, EARN.  </p>
              }


              <Link
              href={'/explore?tab=livestream'}
              >
                <button className={'m-3 bg-transparent text-white flex flex-row-reverse w-40 h-12 md:w-40 md:h-12 hover:bg-fuchsia-950 justify-between items-center cursor-pointer rounded-3xl border-solid border-4 border-[#B999FA]'}>
                {/*<div className={'w-8 h-8 bg-[#B999FA] rounded-full flex justify-center items-center'}>*/}
                {/*  <img className={'h-6 w-6'} alt={'explore button'} src={'/arrow-right.svg'}/>*/}
                {/*</div>*/}
                <h2 className='mx-auto text-[#B999FA]'> Explore </h2>
              </button>
              </Link>

            </div>
            <div className={'overflow-x-scroll ml-8 mt-8 w-full '}>
            <div className={'border border-[#984DDF]  rounded-md border-solid  md:ml-40 w-max md:w-full h-1/2 px-2 md:px-24 pb-16'}>
                <div className={'flex '}>
                  <h3 className={'text-[#B999FA]'}> LATEST MOODs </h3>
                  <Popup
                    trigger={open => (
                      <img alt={'info-circle'} className={'cursor-pointer m-1'} src={'/info-circled.svg'}/>
                    )}
                    on={'hover'}
                    position="right center"
                    closeOnDocumentClick
                  >
                    <div className={'bg-[#12002C] w-48 p-4 rounded-md border-[#7DD934] border-solid'}>
                      <p className={'text-sm'}><span className={'text-[#B999FA] text-xs'}> MOODs: </span> are audio mixes curated by our community of creative partners for miners (you) to enjoy :)</p>
                    </div>
                  </Popup>

                </div>
              <div className={'flex space-x-4 > * + * md:space-x-24 > * + * pr-4'}>

                <MoodCard mood={mood003}/>

                <MoodCard mood={mood002}/>

                <MoodCard mood={mood001}/>

                <Link href={'/explore?tab=moods'}>
                  <div className={'self-center flex items-center'}>
                  <div className={'w-26 h-26 p-2 bg-[#B999FA] rounded-full self-center flex justify-center items-center cursor-pointer'}>
                    <img className={'h-12 w-12'} alt={'explore button'} src={'/arrow-right.svg'}/>
                  </div>

                  </div>

                </Link>
              </div>


            </div>
            </div>
            <div className={'border border-[#984DDF] rounded-md border-solid mr-8 mt-8 md:mr-40 w-full h-1/2 px-2 md:p-24 mb-12'}>
              <div className={'ml-24 py-8 md:py-2'}>
              <h3 className={'text-[#B999FA]'}> WHAT IS MINE.FM? </h3>
              <p className={'leading-loose text-[#B999FA]'}> MINE.FM combines the ability to LIVESTREAM from anywhere with our unique REVENUE DISTRIBUTION MODEL. We provide a new way for artists and fans to connect and profit together. </p>
              </div>
            </div>
            <div className={'mb-20'}>
              <h3 className={'text-[#B999FA]'}> A GUIDE TO MINE.FM: </h3>

              {
                isMobile ? <img src={'/mine-guide-mobile.png'} alt={'mine.fm infographic'}/> : <img src={'/mine-guide.png'} alt={'mine.fm infographic'}/>
              }

            </div>
            </>
        )}

      </main>
    </div>
  )
}
