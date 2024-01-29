import Image from 'next/image'
import {
  APPLICATION_MODE,
  ApplicationMode,
  getAppModeDisplayName,
  getPlatformSupportedApplicationModes,
} from './applicationModes'
import AudioFFTAnalyzer from './analyzers/audioFFTAnalyzer'
import AudioScopeAnalyzer from './analyzers/audioScopeAnalyzer'
import AudioScopeCanvas from './canvas/AudioScope'
import Visual3DCanvas from './canvas/Visual3D'
import { useControls } from 'leva'
import { Suspense } from 'react'

const getAnalyzerComponent = (mode: ApplicationMode) => {
  switch (mode) {
    case APPLICATION_MODE.AUDIO:
      return <AudioFFTAnalyzer />
    case APPLICATION_MODE.AUDIO_SCOPE:
      return <AudioScopeAnalyzer />
    default:
      return null
  }
}

const AVAILABLE_MODES = getPlatformSupportedApplicationModes()

const getCanvasComponent = (mode: ApplicationMode) => {
  switch (mode) {
    case APPLICATION_MODE.AUDIO_SCOPE:
      return <AudioScopeCanvas />
    default:
      return <Visual3DCanvas mode={mode} />
  }
}

export default function AudioVisualizer() {
  const modeParam = new URLSearchParams(global.document?.location.search).get(
    'mode'
  ) as ApplicationMode | null
  const { mode } = useControls({
    mode: {
      value:
        modeParam && AVAILABLE_MODES.includes(modeParam) ? modeParam : AVAILABLE_MODES[2],
      options: AVAILABLE_MODES.reduce(
        (o, mode) => ({ ...o, [getAppModeDisplayName(mode)]: mode }),
        {}
      ),
      order: -100,
    },
  })

  return (
    <main style={{ height: '100%', width: '100%' }}>
      {/* <Suspense fallback={<span>loading...</span>}> */}
      {getAnalyzerComponent(mode as ApplicationMode)}
      {getCanvasComponent(mode as ApplicationMode)}
      {/* </Suspense> */}
    </main>
  )
}
