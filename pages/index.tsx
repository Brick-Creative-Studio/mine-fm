import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import Link from 'next/link'
import { useIsMounted } from 'hooks/useMounted'


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
        <div className={'self-center drop-shadow-2xl mt-32 mb-4'}>
          <img className={'w-[360px] h-[150px] mx-auto mb-0  md:w-full lg:h-full'} src='/mineHEADER_v3.png' alt='mine-header-logo'/>
        </div>
        {isMounted && (
          <>
            <div className={'flex justify-evenly md:w-full'}>
              <Link
              href={'/create'}
              >
              <button className={'m-3 bg-transparent text-white flex flex-row-reverse w-40 h-12 md:w-48 md:h-12 justify-between items-center cursor-pointer rounded-3xl border-solid border-2 border-[#B999FA]'}>
                <h2 className='mx-auto text-[#B999FA]'>Create</h2>
                <div className={'w-8 h-8 bg-[#B999FA] rounded-full flex justify-center items-center'}>
                  <img className={'h-6 w-6'} alt={'explore button'} src={'/arrow-left.svg'}/>
                </div>
              </button>

              </Link>

              <Link
              href={'/explore?tab=livestream'}
              >
                <button className={'m-3 bg-transparent text-white flex flex-row-reverse w-40 h-12 md:w-48 md:h-12  justify-between items-center cursor-pointer rounded-3xl border-solid border-2 border-[#B999FA]'}>
                <div className={'w-8 h-8 bg-[#B999FA] rounded-full flex justify-center items-center'}>
                  <img className={'h-6 w-6'} alt={'explore button'} src={'/arrow-right.svg'}/>
                </div>
                <h2 className='mx-auto text-[#B999FA]'> Explore </h2>
              </button>
              </Link>
            
            </div>
            <div className={'border border-[#984DDF] rounded-md border-solid ml-8 mt-8 md:ml-40 w-full h-1/2 px-2 md:px-24 pb-16'}>
                <div className={'flex justify-between'}>
                  <h3 className={'text-[#B999FA]'}> LATEST </h3>
                  <Link href={'/explore?tab=livestream'}>
                  <p className={'mr-8 md:mr-24 text-[#B999FA] md:text-lg cursor-pointer'}> {`All Moods >`} </p>
                  </Link>
                </div>
              <div className={'flex space-x-4 > * + * md:space-x-24 > * + *'}>
                  <div className={'flex flex-col p-2 px-4 mb-4 rounded-md drop-shadow-lg w-72 bg-[#1D0045]'}>
                    <img alt={'Mood artwork'} className={'self-center w-64 h-48 border-solid  rounded-md border-[#B999FA]'} src={'/stock/stonie-test-poster.jpeg'} />
                    <div className={'flex justify-between'}>
                      <p className={'text-[#B999FA]'}>Bad Bunny </p>
                      <p className={'text-[#B999FA]'}> 08-07-23 </p>
                    </div>
                    <p className={'my-0 text-xl text-[#B999FA]'}> any Other Name </p>

                    <p className={'my-0 text-sm'}> Morem ipsum dolor sit amet, consectetur adipiscing elit... </p>

                    <div className={'flex my-2'}>
                      <div className={'border-solid border border-[#984DDF] px-2 py-0 mr-6'}> <h3 className={'text-sm text-[#984DDF]'}> EXPERIMENTAL </h3>  </div>
                      <div className={' border-solid border border-[#984DDF] px-2'}> <h3 className={'text-sm text-[#984DDF]'}> AMBIENT </h3>  </div>

                    </div>
                  </div>


                <div className={'flex flex-col p-2 px-4 mb-4 rounded-md drop-shadow-lg w-72 bg-[#1D0045]'}>
                  <img alt={'Mood artwork'} className={'self-center w-64 h-48 border-solid  rounded-md border-[#B999FA]'} src={'/stock/stonie-test-poster.jpeg'} />
                  <div className={'flex justify-between'}>
                    <p className={'text-[#B999FA]'}>Bad Bunny </p>
                    <p className={'text-[#B999FA]'}> 08-07-23 </p>
                  </div>
                  <p className={'my-0 text-xl text-[#B999FA]'}> any Other Name </p>

                  <p className={'my-0 text-sm'}> Morem ipsum dolor sit amet, consectetur adipiscing elit... </p>

                  <div className={'flex my-2'}>
                    <div className={'border-solid border border-[#984DDF] px-2 py-0 mr-6'}> <h3 className={'text-sm text-[#984DDF]'}> EXPERIMENTAL </h3>  </div>
                    <div className={' border-solid border border-[#984DDF] px-2'}> <h3 className={'text-sm text-[#984DDF]'}> AMBIENT </h3>  </div>

                  </div>
                </div>

              </div>
            </div>
            <div className={'border border-[#984DDF] rounded-md border-solid mr-8 mt-8 md:mr-40 w-full h-1/2 px-2 md:p-24 mb-12'}>
              <div className={'ml-24 py-8 md:py-2'}>
              <h3 className={'text-[#B999FA]'}> WHAT IS MINE.FM? </h3>
              <p className={'leading-loose text-[#B999FA]'}> MINE.FM combines the ability to LIVESTREAM from anywhere with our unique REVENUE DISTRIBUTION MODEL. We provide a new way for artists and fans to connect and profit together. </p>
              </div>
            </div>
            </>
        )}

      </main>
    </div>
  )
}
