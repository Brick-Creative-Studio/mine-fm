import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const PageAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playable, setPlayable]: [null | boolean, Function] = useState(null)
  const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)

  // useEffect to check if audio src is playable
  // will need a way to communicate from the server to the client
  // when a stream goes live, and when it ends
  // for when a user is on the page before the stream goes live
  useEffect(() => {
    const audio = audioRef.current?.currentSrc
    fetch(audio as string)
      .then((res) => {
        if (res.ok) {
          setPlayable(true)
        } else {
          setPlayable(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handlePlayPause = () => {
    if (!playable) return
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
      {!isPlaying && playable ? (
        <Image
          src="/PlayIcon.svg"
          alt=""
          width={150}
          height={150}
          onClick={handlePlayPause}
        />
      ) : isPlaying && playable ? (
        <Image
          src="/PauseIcon.svg"
          alt=""
          width={150}
          height={150}
          onClick={handlePlayPause}
        />
      ) : playable === false ? (
        <div>Stream is not Live</div>
      ) : null}
      <audio ref={audioRef}>
        <source src="https://stream-relay-geo.ntslive.net/stream/64.aac?client=NTSWebApp&t=1691770293785" />
        {/* <source src="https://s1.evenings.co/s/mine.fm" /> */}
      </audio>
    </>
  )
}

export default PageAudioPlayer
