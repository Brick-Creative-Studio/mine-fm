import React from 'react'
import Image from 'next/image'
import WaveSurferPlayer from 'components/WaveSurferPlayer/WaveSurferPlayer'

const Footer = () => {
  return (
    <footer className="flex flex-col w-full h-16">
      <WaveSurferPlayer
        height={100}
        waveColor="#C4C4C4"
        barWidth="3"
        barGap="2"
        barRadius="3"
        url={'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'}
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
