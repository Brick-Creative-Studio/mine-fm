import { Canvas } from '@react-three/fiber'
import AudioScopeVisual from '../visualizers/visualizerAudioScope'

const AudioScopeCanvas = () => {
  return (
    <Canvas style={{ height: '100%' }}>
      <color attach="background" args={['green']} />
      <AudioScopeVisual />
    </Canvas>
  )
}
export default AudioScopeCanvas
