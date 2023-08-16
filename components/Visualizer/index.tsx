import React from 'react'
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers'

const Visualizer = () => {
  return (
    // <SpectrumVisualizer
    //   // audio={'/bloom.mp3'}
    //   audio={
    //     'https://stream-relay-geo.ntslive.net/stream/64.aac?client=NTSWebApp&t=1691770293785'
    //   }
    //   theme={SpectrumVisualizerTheme.radialSquaredBars}
    //   colors={['#6aacfa', '#78ff64']}
    //   iconsColor={'#467be8'}
    //   showMainActionIcon
    //   showLoaderIcon
    //   highFrequency={8000}
    // />
    <>
      <audio controls>
        <source src="https://stream-relay-geo.ntslive.net/stream/64.aac?client=NTSWebApp&t=1691770293785" />
      </audio>
    </>
  )
}

export default Visualizer
