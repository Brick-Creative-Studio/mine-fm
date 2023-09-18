import React, { useEffect } from "react";
import Image from "next/image";
import styles from './MoodCard.module.css'
import { useMoodPlayerStore} from "../../stores";



type Mood = {
  audioSrc: string,
  artworkURL: string | null,
  artist: string | null,
  title: string | null,
  tags: any,
  description: string | null,
  date: string | null,
}
interface CardProps {
  mood: Mood
}
export const MoodCard = (props: CardProps) => {

  const { setVisibility, setIsPlaying, setSrc, isPlaying, isVisible, isLoading } = useMoodPlayerStore(state => state)

  function play(){

      if(isVisible){
        setIsPlaying(true)
      }
      setVisibility(true)
      setSrc(props.mood.audioSrc)

  }

  const audioState = () => {
    if (isLoading){
      return (
        <div className={'md:opacity-0 md:hover:opacity-100 w-64 h-48 fixed bg-transparent'}>
        <p className={'text-center absolute md:top-16 md:left-24 top-28'}> Loading... </p>
        </div>

      )
    }

    if(isPlaying){
      return (
        <div onClick={() => pause()} className={'md:opacity-0 md:hover:opacity-100 w-64 h-48 fixed bg-transparent cursor-pointer'}>
          <img alt={'pause-icon'} src={'/w-pause-icon.svg'} className={'z-20 w-20 h-20 absolute md:top-16 md:left-24 top-28'} />
        </div>
      )
    } else {
      return (
        <div onClick={() => play()} className={'md:opacity-0 md:hover:opacity-100 w-64 h-48 fixed bg-transparent cursor-pointer'}>
          <img alt={'play-icon'} src={'/play-icon.svg'} className={'z-20 w-20 h-20 absolute md:top-16 md:left-24 top-28'} />
        </div>
      )
    }
  }

  function pause() {
    setIsPlaying(false)

  }

  useEffect(() => {

  }, [isPlaying])

    return (
      <div className={'flex flex-col justify-between  p-2 px-4 mb-4 rounded-md drop-shadow-lg h-[26.625rem] w-72 bg-[#1D0045]'}>
        <div>
        <div className={styles.overlay}>

          { audioState() }

          <img alt={'Mood artwork'} className={'-z-10 self-center w-64 h-48 border-solid rounded-md border-[#B999FA]'} src={`${props.mood.artworkURL ?  props.mood.artworkURL : '/stock/stonie-test-poster.jpeg'}`} />
        </div>
        <div className={'flex justify-between'}>
          <p className={'text-[#B999FA]'}> { props.mood.artist } </p>
          <p className={'text-[#B999FA]'}> { props.mood.date } </p>
        </div>
        <p className={'my-0 text-xl text-[#B999FA]'}> { props.mood.title } </p>

        <p className={'my-0 text-sm'}> { props.mood.description }</p>
        </div>
        <div className={'flex my-2'}>
          <div className={'border-solid border border-[#984DDF] px-2 py-0 mr-6'}> <h3 className={'text-sm text-[#984DDF]'}> { props.mood.tags[0].toUpperCase() } </h3>  </div>
          <div className={' border-solid border border-[#984DDF] px-2'}> <h3 className={'text-sm text-[#984DDF]'}> {props.mood.tags.length > 1 ? props.mood.tags[1].toUpperCase()!! : ''} </h3>  </div>

        </div>
      </div>
    )
}