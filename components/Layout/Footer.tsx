import React from 'react'
import Image from 'next/image'
import WaveSurferPlayer from 'components/WaveSurferPlayer/WaveSurferPlayer'

const Footer = () => {
  return (
    <footer className="flex flex-col w-screen h-16 px-2">
      <WaveSurferPlayer
        height={50}
        waveColor="#C4C4C4"
        progressColor="#7B57E4"
        barWidth="3"
        barGap="2"
        barRadius="3"
        url={'https://cdn.freesound.org/previews/702/702367_1089955-lq.mp3'}
      />
      <a href="https://brickxstudio.com" target="_blank" rel="noopener noreferrer">
        A Brick Studio Product{' '}
        <span>
          <Image
            src="/BrckStd_logo-white.png"
            alt="Brick Studio Logo"
            width={42}
            height={42}
          />
        </span>
      </a>
    </footer>
  )
}

export default Footer
