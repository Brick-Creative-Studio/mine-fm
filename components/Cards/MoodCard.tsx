import React from 'react'
import styles from './MoodCard.module.css'
import { useMoodPlayerStore } from '../../stores'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

type Mood = {
  audioSrc: string
  artworkURL: string | null
  artist: string | null
  title: string | null
  tags: any
  description: string | null
  date: string | null
  socialURL: string
}
interface CardProps {
  mood: Mood
}
export const MoodCard = (props: CardProps) => {
  const { setVisibility, setSrc, isVisible, setArtwork, src } =
    useMoodPlayerStore((state) => state)

  const { load, play, pause, isLoading, stop, isReady, playing, mute, duration, muted } =
    useGlobalAudioPlayer()
  function playAudio() {

    if (isVisible && props.mood.audioSrc !== src) {
      load(props.mood.audioSrc, {
        autoplay: true,
        html5: true,
        format: 'mp3',
      })
    }
    setSrc(props.mood.audioSrc)
    setArtwork(props.mood.artworkURL!)
    if(isVisible && !playing){
      play()
    }
    setVisibility(true)
  }

  function pauseAudio() {
    pause()
  }

  const audioState = () => {
    if (isLoading && props.mood.audioSrc === src) {
      return (
        <div
          className={'md:opacity-0 md:hover:opacity-100 w-64 h-48 fixed bg-transparent'}
        >
          <img
            src={'/spinner-48.png'}
            alt={'loading icon'}
            className={'animate-spin  w-12 h-12 absolute md:top-16 md:left-24 top-28'}
          />
        </div>
      )
    }

    if (playing && props.mood.audioSrc === src) {
      return (
        <div
          onClick={() => pauseAudio()}
          className={
            'md:opacity-0 md:hover:opacity-100 w-64 h-48 absolute bg-transparent cursor-pointer'
          }
        >
          <img
            alt={'pause-icon'}
            src={'/w-pause-icon.svg'}
            className={'z-20 w-20 h-20 absolute md:top-16 md:left-24 top-28'}
          />
        </div>
      )
    } else {
      return (
        <div
          onClick={() => playAudio()}
          className={
            'md:opacity-0 md:hover:opacity-100 w-64 h-48 absolute bg-transparent cursor-pointer'
          }
        >
          <img
            alt={'play-icon'}
            src={'/play-icon.svg'}
            className={'z-20 w-20 h-20 absolute md:top-16 md:left-24 top-28'}
          />
        </div>
      )
    }
  }



  return (
    <div
      className={
        'flex flex-col justify-between  p-2 px-4 mb-4 rounded-md drop-shadow-lg h-[26.625rem] w-72 bg-[#1D0045]'
      }
    >
      <div>
        <div className={styles.overlay}>
          {audioState()}

          <img
            alt={'Mood artwork'}
            className={
              '-z-10 object-cover self-center w-64 h-48 border-solid rounded-md border-[#B999FA]'
            }
            src={`${
              props.mood.artworkURL
                ? props.mood.artworkURL
                : '/stock/stonie-test-poster.jpeg'
            }`}
          />
        </div>
        <div className={'flex justify-between'}>
          <a href={props.mood.socialURL} target="_blank">
            <p className={'text-[#B999FA] cursor-pointer'}> {props.mood.artist} </p>
          </a>
          <p className={'text-[#B999FA]'}> {props.mood.date} </p>
        </div>
        <p className={'my-0 text-xl text-[#B999FA]'}> {props.mood.title} </p>

        <p className={'my-0 text-sm'}> {props.mood.description}</p>
      </div>
      <div className={'flex my-2'}>
        <div
          className={
            'border-solid border border-[#984DDF] px-2 mr-6 h-10 rounded-sm flex items-center'
          }
        >
          {' '}
          <h3 className={'text-[13px] text-[#984DDF]'}>
            {' '}
            {props.mood.tags[0].toUpperCase()}{' '}
          </h3>{' '}
        </div>
        <div
          className={
            ' border-solid border border-[#984DDF] px-2 rounded-sm h-10 flex items-center'
          }
        >
          {' '}
          <h3 className={'text-[13px] text-[#984DDF]'}>
            {' '}
            {props.mood.tags.length > 1 ? props.mood.tags[1].toUpperCase()!! : ''}{' '}
          </h3>{' '}
        </div>
      </div>
    </div>
  )
}
