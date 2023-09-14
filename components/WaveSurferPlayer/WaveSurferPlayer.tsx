import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWavesurfer from '../../hooks/useWaveSurfer'
import Image from 'next/image'

const WaveSurferPlayer = (props: any) => {
  const containerRef = useRef<any>()
  const [isPlaying, setIsPlaying] = useState(false)

  const wavesurfer: any = useWavesurfer(containerRef, props)

  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  // Initialize wavesurfer when the container mounts or any of the props change
  useEffect(() => {
    if (!wavesurfer) return

    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <div className="flex flex-row">
      <button onClick={onPlayClick} className="bg-transparent w-fit">
        {isPlaying ? (
          <Image src="/Pause.svg" alt="Play" width={40} height={40} />
        ) : (
          <Image src="/play.svg" alt="Play" width={40} height={40} />
        )}
      </button>
      <button className="bg-transparent">
        <Image src="/Speaker_Loud.svg" alt="Play" width={40} height={40} />
      </button>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}

export default WaveSurferPlayer
