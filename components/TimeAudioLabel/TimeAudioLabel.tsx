import React, { useEffect, useState } from "react"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { AudioSeekBar } from "../AudioSeek/AudioSeek";
import { useLayoutStore } from "../../stores";
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
  const { isMobile } = useLayoutStore((state) => state)
  useEffect(() => {
    const i = setInterval(() => {
      setPos(getPosition())
    }, 500)

    return () => clearInterval(i)
  }, [getPosition])

  return(
    <>
      {
        isMobile ? (
          <div className={'w-full flex flex-col mt-4 bottom-0'}>

            <AudioSeekBar/>
            <div className={'w-full justify-between p-0 m-0 h-fit flex'}>
            <p className={' text-sm md:text-md p-0 m-0 '}>
              {`${formatTime(pos)}`}
            </p>
            <p className={'text-sm md:text-md p-0 m-0 '} >
              {`${formatTime(duration)}`}
            </p>
            </div>
          </div>
        ) : (
          <div className={'w-full flex justify-between items-center'}>
            <p className={'pr-2 text-sm md:text-md'}>
              {`${formatTime(pos)}`}
            </p>
            <AudioSeekBar/>

            <p className={'pl-2 text-sm md:text-md'} >
              {`${formatTime(duration)}`}
            </p>
          </div>
        )
      }

    </>
  )
}
