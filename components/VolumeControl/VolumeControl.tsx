import React, { ChangeEvent, useCallback,useState } from "react"
import { useGlobalAudioPlayer } from "react-use-audio-player"

export const VolumeControl = () => {
  const { setVolume, volume } = useGlobalAudioPlayer()
  const [vol, setVol] = useState(100)

  // const handleChange = useCallback(
  //   (slider: ChangeEvent<HTMLInputElement>) => {
  //
  //     return setVolume(volValue)
  //   },
  //   [setVolume]
  // )

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={0}
        max={100}
        className={'cursor-grab'}
        step={2}
        value={vol }
        onChange={event => {
          setVol(event.target.valueAsNumber)
          setVolume(parseFloat(
            (Number(event.target.value) / 100).toFixed(2)
          ))
        }}
      />
      <i className="volumeControl__icon" />
    </div>
  )
}
