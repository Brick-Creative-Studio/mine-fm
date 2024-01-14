import React, { useEffect, useState } from "react"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { AudioSeekBar } from "../AudioSeek/AudioSeek";

const formatTime = (seconds: number) => {
  if (seconds === Infinity) {
    return "--"
  }
  const floored = Math.floor(seconds)
  let from = 14
  let length = 5
  // Display hours only if necessary.
  if (floored >= 3600) {
    from = 11
    length = 8
  }

  return new Date(floored * 1000).toISOString().substr(from, length)
}

export const TimeAudioLabel = () => {
  const [pos, setPos] = useState(0)
  const { duration, getPosition, playing } = useGlobalAudioPlayer()

  useEffect(() => {
    const i = setInterval(() => {
      setPos(getPosition())
    }, 500)

    return () => clearInterval(i)
  }, [getPosition])

  return <div className={'w-full flex justify-between items-center'}>
    <p className={'px-2'}>
      {`${formatTime(pos)}`}
    </p>
    <AudioSeekBar/>

    <p className={'px-2'} >
      {`${formatTime(duration)}`}
    </p>
  </div>
}
