import React, { useRef, useState } from 'react'
import Image from 'next/image'

const PageAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <>
      {!isPlaying ? (
        <Image
          src="/PlayIcon.svg"
          alt=""
          width={150}
          height={150}
          onClick={handlePlayPause}
        />
      ) : (
        <Image
          src="/PauseIcon.svg"
          alt=""
          width={150}
          height={150}
          onClick={handlePlayPause}
        />
      )}
      <audio ref={audioRef}>
        <source src="https://stream-relay-geo.ntslive.net/stream/64.aac?client=NTSWebApp&t=1691770293785" />
      </audio>
    </>
  )
}

export default PageAudioPlayer
