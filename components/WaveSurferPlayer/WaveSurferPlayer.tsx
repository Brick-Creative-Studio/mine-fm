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

  const onVolumeClick = useCallback(() => {
    wavesurfer.getMuted() ? wavesurfer.setMuted(false) : wavesurfer.setMuted(true)
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return

    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('finish', () => setIsPlaying(false)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <div className="flex flex-row space-x-1.5 md:space-x-3">
      <button onClick={onPlayClick} className="bg-transparent w-fit">
        {isPlaying ? (
          <Image src="/pause.svg" alt="Play" width={40} height={40} />
        ) : (
          <Image src="/play.svg" alt="Play" width={40} height={40} />
        )}
      </button>
      <button className="bg-transparent" onClick={onVolumeClick}>
        <Image src="/speaker-loud.svg" alt="Play" width={40} height={40} />
      </button>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}

export default WaveSurferPlayer
