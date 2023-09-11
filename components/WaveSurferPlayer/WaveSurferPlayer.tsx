import React, { useRef, useEffect, useState, useCallback } from 'react'
import useWavesurfer from '../../hooks/useWaveSurfer'

const WaveSurferPlayer = (props: any) => {
  const containerRef = useRef<any>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const wavesurfer: any = useWavesurfer(containerRef, props)

  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  // Initialize wavesurfer when the container mounts or any of the props change
  useEffect(() => {
    if (!wavesurfer) return

    setCurrentTime(0)
    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime: any) => setCurrentTime(currentTime)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <>
      <div ref={containerRef} />
      <button onClick={onPlayClick} className="bg-blue-500 w-fit">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>{currentTime}</div>
    </>
  )
}

export default WaveSurferPlayer
