import React, { useState, useEffect, useRef } from 'react'

interface Props {
  onTimeUpdate?: (currentTime: number) => void
  source: string
}

const AudioPlayer: React.FC<Props> = ({ onTimeUpdate, source }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audioEl = audioRef.current
    audioEl?.addEventListener('timeupdate', handleOnTimeUpdate)
    return () => {
      audioEl?.removeEventListener('timeupdate', handleOnTimeUpdate)
    }
  }, [])

  const handleOnTimeUpdate = () => {
    const audioEl = audioRef.current
    if (!!onTimeUpdate) onTimeUpdate(audioEl?.currentTime || 0)
  }

  return (
    <audio controls id="tts-audio" ref={audioRef}>
      <source src={source} type="audio/mpeg" />
    </audio>
  )
}

export default AudioPlayer
