import React, { useEffect, useMemo, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
import { useMoodPlayerStore } from "../stores";

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    // if(wavesurfer === null){
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
        autoplay: false,
        backend: 'WebAudio',
        waveColor: 'violet',
        progressColor: 'purple',
        dragToSeek: true,
      })
      setWavesurfer(ws as any)

      return () => {
        ws.destroy()

      // }
    }

  }, [containerRef])

  return wavesurfer
}

export default useWavesurfer
