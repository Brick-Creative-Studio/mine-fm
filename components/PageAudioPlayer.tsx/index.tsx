import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Player.module.css'
import { VolumeControl } from "../VolumeControl/VolumeControl";
import AudioVisualizer from 'components/AudioVisualizer/AudioVisualizer'

interface Station {
  id: string
  name: string
  host: string
  description: string
  streamUrl: string
  image: string
  online: boolean
  listeners: number
}
const PageAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playable, setPlayable] = useState<boolean>(false)
  const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
  const [vol, setVol] = useState(1)


  // useEffect to check if audio src is playable
  // useEffect(() => {
  //   const eveningsAPI = 'https://api.evenings.co/v1/streams/mine.fm/public'
  //   async function fetchStatus() {
  //     const stationData = await fetch(eveningsAPI)
  //     const data: Station = await stationData?.json()

  //     if (data.online) {
  //       setPlayable(true)
  //     } else {
  //       setPlayable(false)
  //     }
  //   }
  //   fetchStatus()
  // }, [])

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
        audioRef.current?.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if(audioRef.current){
      audioRef.current!.volume = vol
      console.log('change vol', audioRef.current!.volume)
    }
  }, [vol])

  return (
    <>
      {!isPlaying && playable ? (
        <div className={styles.overlay}>
          <div
            className={
              'absolute w-full md:opacity-0 md:hover:opacity-100 h-64 md:h-[600px]'
            }
          >
            <img
              src="/PlayIcon.svg"
              alt="play button"
              width={150}
              height={150}
              onClick={handlePlayPause}
              className={
                'cursor-pointer relative left-1/3 top-1/4 md:absolute  md:left-[28rem] md:top-[12rem]  '
              }
            />
          </div>
          <img
            src={'/gif/mineCUBE-bw.jpeg'}
            alt={'mine-cube gif'}
            className={'m-auto w-full h-full object-contain'}
          />
        </div>
      ) : isPlaying && playable ? (
        <div className={styles.overlay}>
          {/* <div
            className={
              'absolute w-full md:opacity-0 md:hover:opacity-100 h-64 md:h-[600px]'
            }
          >

          </div> */}
          <AudioVisualizer />
          <div className={'w-full h-12 bg-black/50 absolute bottom-0 flex items-center'}>
            <img
              src="/w-pause-icon.svg"
              alt=""
              onClick={handlePlayPause}
              className={
                'h-10 w-10 cursor-pointer opacity-0 active:opacity-100 md:opacity-100'
              }
            />

            <div className="flex items-center">
              <input
                type="range"
                min={0}
                max={1}
                className={'cursor-grab'}
                step={.02}
                value={vol }
                onChange={event => {
                  setVol(event.target.valueAsNumber)
                  audioRef.current!.volume = vol
                }}
              />
              <i className="volumeControl__icon" />
            </div>          </div>
        </div>
      ) : !playable ? (
        <div>Stream is not Live</div>
      ) : null}
      <audio ref={audioRef}>
      </audio>
    </>
  )
}

export default PageAudioPlayer
