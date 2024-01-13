import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWavesurfer from '../../hooks/useWaveSurfer'
import Image from 'next/image'
import Howler, { Howl} from 'howler';
import { useMoodPlayerStore } from "../../stores";
import { useGlobalAudioPlayer } from 'react-use-audio-player';

const WaveSurferPlayer = (props: any) => {
  const containerRef = useRef<any>()
  const { isVisible, isPlaying, setIsPlaying, isLoading, setIsLoading, isMuted, src, setIsMuted, setVisibility} = useMoodPlayerStore((state) => state)
  const { load, play, pause} = useGlobalAudioPlayer();

  const wavesurfer: any = useWavesurfer(containerRef, props)

  // Initialize Howler
  // const sound = new Howler.Howl({
  //   src: [src!],
  //   html5: true, // Enable HTML5 audio
  //   format: ['mp3'],
  //   onload: () => {
  //     console.log('Audio loaded!');
  //   },
  // });


  const onPlayPause = useCallback(() => {
    // wavesurfer.playPause()
    if (!isPlaying){
      play()
      setIsPlaying(true)

    }  }, [wavesurfer])

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

    load(src!, {
      autoplay: true,
      html5: true,
      format: 'mp3'
    });

    const subscriptions = [
      wavesurfer.on('play', () => {
        setIsPlaying(true)
        // sound.play()
      }),
      wavesurfer.on('pause', () =>{
        setIsPlaying(false)
        pause()
      }),
      wavesurfer.on('finish', () =>{
        setIsPlaying(false)
      }),
      wavesurfer.on('ready', () => {
        setIsLoading(false)

        if (!isPlaying){
          //wavesurfer.playPause()
          setIsPlaying(true)

        }

      }),
      wavesurfer.on('destroy', () => {
        console.log('surfer destroyed')
        setIsPlaying(false)
        // sound.unload()
      }),
      wavesurfer.on('loading', () => {
        console.log('surfer destroyed')
        // sound.load()
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
