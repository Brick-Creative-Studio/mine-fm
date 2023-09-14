import React, { useEffect, useMemo, useState } from "react";
import WaveSurfer from 'wavesurfer.js'

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
        url: 'https://mfm-audio-bucket.s3.us-east-2.amazonaws.com/because_of_winn_dixie.m4a'
      })
      setWavesurfer(ws as any)

      return () => {
        ws.destroy()

      // }
    }

  }, [])

  return wavesurfer
}

export default useWavesurfer
