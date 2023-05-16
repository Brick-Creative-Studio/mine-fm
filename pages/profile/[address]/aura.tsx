import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore, useProfileStore } from 'stores'
import { useForm, SubmitHandler } from 'react-hook-form'
import auraCircle from '../../../styles/Aura.css'
import { useRouter } from 'next/router'

interface AuraInputs {
  colorOne: string
  colorTwo: string
  colorThree: string
  direction: string
}

export default function Aura({})  {
  const router = useRouter()

  const { signerAddress: address } = useLayoutStore()

  //form handlers
  const { register, handleSubmit } = useForm<AuraInputs>()

  const { aura, setAura } = useProfileStore((state) => state)

  const [colorOne, setOne] = useState(aura.colorOne)
  const [colorTwo, setTwo] = useState(aura.colorTwo)
  const [colorThree, setThree] = useState(aura.colorThree)
  const [gradient, setGradient] = useState('')
  const [direction, setDirection] = useState(aura.direction)


  const cardinalMap = new Map<string, string>([
    ['left', 'West'],
    ['right', 'East'],
    ['top', 'North'],
    ['bottom', 'South'],
  ])

  const onSubmit: SubmitHandler<AuraInputs> = (data) => {
    data.direction = direction
    console.log('direction check', data)

    setAura(data)
    router.push(`/profile/${address}`).then((r) => console.log(r))
  }

  const onChangeColorOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOne(event.target?.value.toString())
  }

  const onChangeColorTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwo(event.target.value.toString())
  }

  const onChangeColorThree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThree(event.target.value.toString())
  }

  const changeDirection = (event: React.MouseEvent<HTMLInputElement>) => {
    setDirection(event.currentTarget.id)
  }

  const onGenerateColor = () => {
    const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    aura.direction && setDirection(aura.direction)
    aura.colorOne && setOne(aura.colorOne)
    aura.colorTwo && setTwo(aura.colorTwo)
    aura.colorThree && setThree(aura.colorThree)
    setGradient(
      `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    )
  }, [aura]);

  if (!hydrated) {
    // Returns null on first render, so the client and server match

    return null;
  }

  return (
    <div className="flex flex-col mt-24 ">
      <div className="flex justify-around  items-center">
        <div className="">
          <Link
            href={{
              pathname: `/profile/${address}/identity`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <Image src={'/chevron-left.svg'} width={32} height={32} alt="back button" />
              <h3>Back</h3>
            </div>
          </Link>
        </div>

        <h2 className={'w-24 text-center'}> Change Aura </h2>

        <div className="invisible">
          <Link
            href={{
              pathname: `/profile/${address}/mc-gallery`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <h3>Gallery</h3>
              <Image
                src={'/chevron-right.svg'}
                width={32}
                height={32}
                alt="gallery button"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full border border-white opacity-10 border-solid bg-white" />
      <div className="flex flex-col justify-center items-center m-12">
        <div className={auraCircle} style={{ background:  gradient && gradient }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col m-12">
            <div className="flex flex-row ">
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorOne}
                  {...register('colorOne')}
                  onChange={(event) => onChangeColorOne(event)}
                  className="w-24 h-12 border-none bg-transparent	"
                />
                <p>{colorOne}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorTwo}
                  {...register('colorTwo')}
                  onChange={(event) => onChangeColorTwo(event)}
                  className="w-24 h-12 border-none bg-transparent"
                />
                <p>{colorTwo}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorThree}
                  {...register('colorThree')}
                  onChange={(event) => onChangeColorThree(event)}
                  className="w-24 h-12 border-none bg-transparent"
                />
                <p>{colorThree}</p>
              </div>
            </div>
            <div className="flex justify-center m-8">
              <div className={styles.crossCenter}>
                <input
                  id={'top'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={styles.crossTop}
                />
                <input
                  id={'bottom'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={styles.crossBottom}
                />
                <input
                  id={'left'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={styles.crossLeft}
                />
                <input
                  id={'right'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={styles.crossRight}
                />
                <div className={styles.crossCircle} />
              </div>
            </div>
            <p className="self-center my-8"> Direction: {cardinalMap.get(direction)} </p>
            <button
              type="button"
              onClick={() => onGenerateColor()}
              className=" flex justify-center bg-[#0E4749] items-center mb-4 h-12 rounded-full p-2 border-none cursor-pointer"
            >
              <h2> Generate Aura </h2>
            </button>
            <input
              type="submit"
              title="next"
              value={'Save & Exit'}
              className="not-italic bg-black h-12 rounded-full font-mono font-bold text-lg p-2 px-4 border-none mt-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  )
}


