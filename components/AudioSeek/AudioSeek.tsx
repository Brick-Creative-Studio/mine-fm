import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
  MouseEvent, FC, FormEvent
} from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player"

export const AudioSeekBar: FC = ({})=> {
  const { playing, getPosition, duration, seek } = useGlobalAudioPlayer()
  const [pos, setPos] = useState(0)
  const frameRef = useRef<number>()

  const seekBarElem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = () => {
      setPos(getPosition())
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const goTo = useCallback(
    (event: MouseEvent) => {
      const { pageX: eventOffsetX } = event

      if (seekBarElem.current) {
        const elementOffsetX = seekBarElem.current.offsetLeft
        const elementWidth = seekBarElem.current.clientWidth
        const percent = (eventOffsetX - elementOffsetX) / elementWidth
        seek(percent * duration)

      }
    },
    [duration, playing, seek]
  )

  if (duration === Infinity) return null

  return (
    <div
      className={`cursor-pointer bg-white h-4 w-full overflow-hidden rounded-full`}
      ref={seekBarElem}
      onClick={goTo}
      onMouseDown={goTo}
      onMouseUp={goTo}
    >
      <div
        style={{ width: `${(pos / duration) * 100}%` }}
        className="bg-[#B999FA] h-full"
      />
    </div>
  )
}
