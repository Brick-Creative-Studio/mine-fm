import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLayoutStore, useProfileStore } from 'stores'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  crossBottom,
  crossCenter,
  crossCircle,
  crossLeft,
  crossRight,
  crossTop,
} from '../../styles/controlPad.css'
import auraCircle from '../../styles/Aura.css'

interface AuraInputs {
  colorOne: string
  colorTwo: string
  colorThree: string
  direction: string
}

const AuraForm: React.FC = ({}) => {
  const router = useRouter()
  const path = router.pathname.replace(/\//g, '')

  const { signerAddress: address } = useLayoutStore()

  //form handlers
  const { register, handleSubmit } = useForm<AuraInputs>()

  const { aura, setAura } = useProfileStore((state) => state)
  const [colorOne, setOne] = useState('#240045')
  const [colorTwo, setTwo] = useState('#FF8500')
  const [colorThree, setThree] = useState('#FF8500')

  const [direction, setDirection] = useState('top')
  const [gradient, setGradient] = useState('')

  const initialGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, #240045)`

  const cardinalMap = new Map<string, string>([
    ['left', 'West'],
    ['right', 'East'],
    ['top', 'North'],
    ['bottom', 'South'],
  ])

  const onSubmit: SubmitHandler<AuraInputs> = (data) => {
    data.direction = direction
    setAura(data)
    console.log('aura state set', data)
    router.push('/onboarding?tab=identity')
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

  useEffect(() => {
    console.log(initialGradient)
    aura?.colorOne && setOne(aura.colorOne)
    aura?.colorTwo && setTwo(aura.colorTwo)
    aura?.colorThree && setThree(aura.colorThree)
    aura?.direction && setDirection(aura?.direction)
  }, [])

  return (
    <>
      <div className="flex justify-center items-center m-12">
        <div
          className={auraCircle}
          style={{ background: `${gradient ? gradient : initialGradient}` }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col m-12">
            <div className="flex flex-row space-x-12 > * + *">
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
              <div className={crossCenter}>
                <input
                  id={'top'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={crossTop}
                />
                <input
                  id={'bottom'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={crossBottom}
                />
                <input
                  id={'left'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={crossLeft}
                />
                <input
                  id={'right'}
                  type="button"
                  onClick={(event) => changeDirection(event)}
                  className={crossRight}
                />
                <div className={crossCircle} />
              </div>
            </div>
            <p className="self-center my-8"> Direction: {cardinalMap.get(direction)} </p>
            <button
              type="button"
              onClick={() => onGenerateColor()}
              className=" flex justify-center bg-[#0E4749] items-center mb-4 h-12 rounded-full p-2 border-none cursor-pointer"
            >
              <h2> Generate Aura </h2>{' '}
            </button>
            <input
              type="submit"
              title="next"
              value={path === 'onboarding' ? 'Create Idenity' : 'Save and Exit'}
              className="not-italic bg-black h-12 rounded-full font-mono font-bold text-lg p-2 px-4 border-none mt-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default AuraForm
