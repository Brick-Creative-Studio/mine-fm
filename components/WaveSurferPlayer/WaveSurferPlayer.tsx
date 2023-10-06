import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWavesurfer from '../../hooks/useWaveSurfer'
import Image from 'next/image'
import { useMoodPlayerStore } from "../../stores";

const WaveSurferPlayer = (props: any) => {
  const containerRef = useRef<any>()
  const { isVisible, isPlaying, setIsPlaying, isLoading, setIsLoading, isMuted, setIsMuted, setVisibility} = useMoodPlayerStore((state) => state)

  const wavesurfer: any = useWavesurfer(containerRef, props)

  const onPlayPause = useCallback(() => {
    wavesurfer.playPause()
  }, [wavesurfer])

  const onVolumeClick = useCallback(() => {
    if(wavesurfer.getMuted()) {
      setIsMuted(false)
      wavesurfer.setMuted(false)
    } else {
      wavesurfer.setMuted(true)
      setIsMuted(true)
    }

  }, [wavesurfer])

  //init wavsurfer
  useEffect(() => {
    if (!wavesurfer) return

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('finish', () => setIsPlaying(false)),
      wavesurfer.on('ready', () => {
        setIsLoading(false)

        if (!isPlaying){
          wavesurfer.playPause()
          setIsPlaying(true)

        }

      }),
      wavesurfer.on('destroy', () => {
        console.log('surfer destroyed')
        setIsPlaying(false)
      }),
      wavesurfer.on('loading', () => {
        console.log('surfer destroyed')
        setIsLoading(true)
      })

    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return

    if (isPlaying){
      wavesurfer.play()
    } else {
      wavesurfer.pause()
    }

  }, [isPlaying])

  const volumeState = () => {
    if (!wavesurfer) return

    if(wavesurfer.getMuted()){
      return <img src="/speaker-mute.svg" alt="Mute" className={'cursor-pointer w-10 h-10'} />
    } else {
      return <img src="/speaker-loud.svg" alt="Volume" className={'cursor-pointer w-10 h-10'} />

    }
  }

  const audioState = () => {
    if (isLoading){
      // return <p className={'animate-pulse'}> Loading... </p>
      return <img src={'/spinner-48.png'} alt={'loading icon'} className={'animate-spin border-none w-12 h-12'}/>

    }

    if(isPlaying){
      return (
        <img src="/Pause.svg" className={'cursor-pointer w-10 h-10 p-0 border-none'} alt="Play button" />

      )
    } else {
      return (
        <img src="/play.svg" className={'cursor-pointer w-12 h-12 p-0 border-none'} alt="Play" />

      )
    }
  }

  return (
    <div className={`flex flex-row space-x-1.5 md:space-x-3 ${ isVisible ? null : `invisible hidden`} pl-4`}>
      <button onClick={onPlayPause} className="bg-transparent w-fit ">
        { audioState() }
      </button>
      <button className="bg-transparent cursor-pointer" onClick={onVolumeClick}>
        {volumeState()}
      </button>
      <div ref={containerRef} className="w-full p-2 cursor-pointer border-none" />
      <button className="bg-transparent cursor-pointer" onClick={() => setVisibility(false)}>
        <img src={'/cross-white.svg'} alt={'close audio button'} className={'w-10 h-10 '}/>
      </button>
    </div>
  )
}

export default WaveSurferPlayer
