import React, { useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState(null)

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    })

    setWavesurfer(ws as any)

    return () => {
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}

export default useWavesurfer
