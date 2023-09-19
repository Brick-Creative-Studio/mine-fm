import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWavesurfer from '../../hooks/useWaveSurfer'
import Image from 'next/image'
import { useMoodPlayerStore } from "../../stores";

const WaveSurferPlayer = (props: any) => {
  const containerRef = useRef<any>()
  const { isVisible, isPlaying, setIsPlaying, isLoading, setIsLoading} = useMoodPlayerStore((state) => state)
  // const [isPlaying, setIsPlaying] = useState(false)

  const wavesurfer: any = useWavesurfer(containerRef, props)

  const onPlayPause = useCallback(() => {
    wavesurfer.playPause()
  }, [wavesurfer])

  const onVolumeClick = useCallback(() => {
    wavesurfer.getMuted() ? wavesurfer.setMuted(false) : wavesurfer.setMuted(true)
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

  // Use useEffect to add an event listener for the pageChange event
  // useEffect(() => {
  //   window.addEventListener("pageChange", () => {
  //     // Check the current playback state of the audio
  //     if (isPlaying) {
  //       containerRef.current.play();
  //     } else {
  //       containerRef.current.pause();
  //     }
  //   });
  // }, []);

  const audioState = () => {
    if (isLoading){
      return <p> Loading... </p>
    }

    if(isPlaying){
      return (
        <Image src="/Pause.svg" alt="Play" width={40} height={40} />

      )
    } else {
      return (
        <Image src="/play.svg" alt="Play" width={40} height={40} />

      )
    }
  }

  return (
    <div className={`flex flex-row space-x-1.5 md:space-x-3 ${ isVisible ? null : `invisible hidden`}`}>
      <button onClick={onPlayPause} className="bg-transparent w-fit">
        { audioState() }
      </button>
      <button className="bg-transparent" onClick={onVolumeClick}>
        <Image src="/speaker-loud.svg" alt="Play" width={40} height={40} />
      </button>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}

export default WaveSurferPlayer
