import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Player.module.css'

const PageAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playable, setPlayable] = useState<boolean>(false)
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

        <div className={styles.overlay}>
          <div className={'absolute w-full md:opacity-0 md:hover:opacity-100 h-64 md:h-[600px]'}>
            <img
              src="/PlayIcon.svg"
              alt="play button"
              width={150}
              height={150}
              onClick={handlePlayPause}
              className={'cursor-pointer relative left-1/3 top-1/4 md:absolute  md:left-[28rem] md:top-[12rem]  '}
            />
          </div>
          <img src={'/gif/mineCUBE-bw.jpeg'} alt={'mine-cube gif'} className={'m-auto w-full h-full object-contain'}/>

        </div>
      ) : isPlaying && playable ? (
        <div className={styles.overlay}>
          <div className={'absolute w-full md:opacity-0 md:hover:opacity-100 h-64 md:h-[600px]'}>
            <img
              src="/PauseIcon.svg"
              alt=""
              width={150}
              height={150}
              onClick={handlePlayPause}
              className={'cursor-pointer relative left-1/3 opacity-0 active:opacity-100 md:opacity-100 top-1/4 md:relative  md:left-[28rem] md:top-[12rem]'}
            />
          </div>
          <img src={'/gif/mine-cube.gif'} alt={'mine-cube gif'} className={' w-full h-full object-contain'}/>

        </div>
      ) : !playable ? (
        <div>Stream is not Live</div>
      ) : null}
      <audio ref={audioRef}>
        {/*<source src="https://stream-relay-geo.ntslive.net/stream/64.aac?client=NTSWebApp&t=1691770293785" />*/}
         <source src="rtmp://s2.evenings.co/evenings" />
      </audio>
    </>
  )
}

export default PageAudioPlayer
