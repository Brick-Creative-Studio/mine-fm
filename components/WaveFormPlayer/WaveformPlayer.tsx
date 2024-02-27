import React, { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Howler, { Howl } from "howler";
import { useMoodPlayerStore } from '../../stores'
import { useGlobalAudioPlayer } from 'react-use-audio-player'
import WaveForm from "../WaveForm/WaveForm";
import { AudioSeekBar } from "../AudioSeek/AudioSeek";
import { VolumeControl } from "../VolumeControl/VolumeControl";
import { TimeAudioLabel } from "../TimeAudioLabel/TimeAudioLabel";

const WaveformPlayer = () => {
  const containerRef = useRef<HTMLMediaElement>(null)
  const {
    isVisible,
    setIsLoading,
    src,
    setIsPlaying,
    setVisibility,
    artworkURL
  } = useMoodPlayerStore((state) => state)
  const { load, play, pause, isLoading, stop, isReady, playing, mute, duration, muted } =
    useGlobalAudioPlayer()
  const [audioUrl, setAudioUrl] = useState();
  const [analyzerData, setAnalyzerData] = useState<any>(null);
  const audioElmRef = useRef<HTMLMediaElement>(null);

  const audioAnalyzer = () => {
    const audioSrcNode = Howler.Howler.ctx.createConstantSource()
    const analyzer = Howler.Howler.ctx.createAnalyser()
    Howler.Howler.masterGain.connect(analyzer);
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    console.log("dataArray init:", dataArray);
    console.log("src node", audioSrcNode);
    audioSrcNode.connect(analyzer)

    analyzer.connect(Howler.Howler.ctx.destination);

    // source.connect(audioCtx.destination);
    console.log('howl analyzer data:', {
      analyzer,
      bufferLength,
      dataArray
    })


    setAnalyzerData({ analyzer, bufferLength, dataArray });
  };

  useEffect(() => {
      load(src! , {
        autoplay: true,
        html5: true,
        format: 'mp3',
        initialMute: false,
        onload: () => {
          setIsLoading(false)
          setIsPlaying(true)
          audioAnalyzer()
        },
        onend: () => console.log('mood ended, cue next song dev')
      })
  }, [load])


  useEffect( () => {
    mute(false)
  },[src])

  const volumeState = () => {
    // if (!isReady) return

    if (muted) {
      return (
        <button className="bg-transparent cursor-pointer" onClick={() => mute(false)}>
        <img src="/speaker-mute.svg" alt="Mute" className={'cursor-pointer w-8 h-8 md:w-10 md:h-10'} />
        </button>
      )
    } else {
      return (
        <button className="bg-transparent cursor-pointer" onClick={() => mute(true)}>

        <img
          src="/speaker-loud.svg"
          alt="Volume"
          className={'cursor-pointer w-8 h-8 md:w-10 md:h-10'}
        />
        </button>
      )
    }
  }

  const audioState = () => {
    if (isLoading) {
      // return <p className={'animate-pulse'}> Loading... </p>
      return (
        <img
          src={'/spinner-48.png'}
          alt={'loading icon'}
          className={'animate-spin border-none w-12 h-12'}
        />
      )
    }

    if (playing) {
      return (
        <button onClick={() => {
          pause()
          setIsPlaying(false)
        }
        } className="bg-transparent w-fit ">
          <img
            src="/Pause.svg"
            className={'cursor-pointer w-8 h-8 md:w-10 md:h-10  p-0 border-none'}
            alt="Pause button"
          />
        </button>

      )
    } else {
      return (
        <button onClick={() => {
          play()
          setIsPlaying(true)
        }
        } className="bg-transparent w-fit ">
        <img
          src="/play.svg"
          className={'cursor-pointer w-8 h-8 md:w-12 md:h-12 p-0 border-none'}
          alt="Play"
        />
        </button>

      )
    }
  }


  return (
    <div
      className={`flex flex-row space-x-1.5 md:space-x-3 ${
        isVisible ? null : `invisible hidden`
      }`}
    >
      <img className={'w-20 m-0 h-20'} alt={'mood poster'} src={artworkURL!}/>
        {audioState()}
        {volumeState()}
      <div className={'flex flex-col w-full items-center justify-center'}>
      {/*<audio ref={containerRef} src={src!} className="w-full p-2 cursor-pointer border-none" />*/}
      {/*{analyzerData && <WaveForm analyzerData={analyzerData} />}*/}
        {/*<VolumeControl/>*/}
        <TimeAudioLabel/>
      </div>
      <button
        className="bg-transparent cursor-pointer"
        onClick={() => {
          setVisibility(false)
          stop()
        }}
      >
        <img
          src={'/cross-white.svg'}
          alt={'close audio button'}
          className={'w-6 h-6 md:w-10 md:h-10 '}
        />
      </button>
    </div>
  )
}

export default WaveformPlayer
