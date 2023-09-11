import React, { useRef, useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveformPlayer = () => {
  const waveRef = useRef<any>(null)
  const container = useRef<any>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    waveRef.current = WaveSurfer.create({
      container: container.current ?? '#container',
      waveColor: '#D9D9D9',
      progressColor: '#FFB800',
      height: 50,
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 0,
      normalize: true,
      url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3',
    })
  }, [])

  const play = () => {
    if (waveRef.current === null) return
    if (isPlaying) {
      waveRef.current.pause()
      setIsPlaying(false)
    }
    if (!isPlaying) {
      waveRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <button className="w-20 px-4 py-2 font-bold" onClick={play}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div ref={container} id="container" className="w-full p-4" />
    </>
  )
}

export default WaveformPlayer
