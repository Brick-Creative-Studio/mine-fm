import React, { Suspense, useEffect, useState } from "react";
import Image from 'next/image'
import WaveSurferPlayer from '../WaveSurferPlayer/WaveSurferPlayer'
import { useMoodPlayerStore } from "../../stores";
import { useRouter } from "next/router";

const Footer = () => {

  const { src, setSrc, setVisibility, isVisible} = useMoodPlayerStore((state) => state)
  const [ hideFooter, setHidden ] = useState<boolean>( false )
  const router = useRouter()

  useEffect(() => {
    if(router.pathname.includes('livestream')){
      setHidden(true)
      return
    }
    setHidden(false)

  }, [router])
  return hideFooter ? null : (
    <>
      { isVisible ? (
        <footer className="flex flex-col bg-[#1D0045] mt-8 ml-0 justify-center fixed bottom-0 left-0 right-0  w-full h-16">

          <WaveSurferPlayer
            height={36}
            waveColor="#C4C4C4"
            progressColor="#7B57E4"
            barWidth="3"
            barGap="2"
            barRadius="3"
          />

        </footer>
      ) : (
        <footer className='flex h-16 mx-0'>
          <a
            href="https://brickxstudio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={'text-[#B999FA] text-[16px] font-[Carbon] font-bold'}>A Brick Studio Product{' '}</p>

          </a>
        </footer>
      )}
    </>
  )
}

export default Footer
