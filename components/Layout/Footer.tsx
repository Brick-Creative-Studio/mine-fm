import React, { Suspense } from "react";
import Image from 'next/image'
import WaveSurferPlayer from '../WaveSurferPlayer/WaveSurferPlayer'
import { useMoodPlayerStore } from "../../stores";

const Footer = () => {

  const { src, setSrc, setVisibility, isVisible} = useMoodPlayerStore((state) => state)

  return (
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
        <footer className='flex h-16 mx-0 mt-8'>
          <a
            href="https://brickxstudio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            A Brick Studio Product{' '}
            <span>
            <Image src="/BrckStd_logo-white.png" alt="Brick Studio Logo" width={42} height={42} />
          </span>
          </a>
        </footer>
      )}
    </>
  )
}

export default Footer
