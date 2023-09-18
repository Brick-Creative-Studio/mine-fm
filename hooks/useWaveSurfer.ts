import React, { useEffect, useMemo, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
import { useMoodPlayerStore } from "../stores";

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const { src } = useMoodPlayerStore((state) => state)
  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    // if(wavesurfer === null){
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
        autoplay: false,
        url: src,
      })
      setWavesurfer(ws as any)

      return () => {
        ws.destroy()

      // }
    }

  }, [src])

  return wavesurfer
}

export default useWavesurfer
