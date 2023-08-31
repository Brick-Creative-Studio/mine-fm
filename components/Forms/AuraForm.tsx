import React, { useState, useEffect } from 'react'
import { useLayoutStore, useProfileStore } from 'stores'
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
import auraCircle from '../../styles/aura.css'
import { useAccount} from "wagmi";
import useGetUser from "../../hooks/useGetUser";

interface AuraInputs {
  colorOne: string
  colorTwo: string
  colorThree: string
  direction: string
}

const AuraForm: React.FC = ({}) => {
  const router = useRouter()
  const path = router.pathname.replace(/\//g, '')
  const { address, isConnecting, isDisconnected } = useAccount()


  //form handlers
  const { register, handleSubmit } = useForm<AuraInputs>()

  const { setAura } = useProfileStore((state) => state)
  const [colorOne, setOne] = useState<string>('')
  const [colorTwo, setTwo] = useState<string>('')
  const [colorThree, setThree] = useState<string>('')

  const [direction, setDirection] = useState('')
  const { error, isLoading, user } = useGetUser(address as string)

  const initialGradient = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`
  const [gradient, setGradient] = useState<string>('')
  const cardinalMap = new Map<string, string>([
    ['left', 'West'],
    ['right', 'East'],
    ['top', 'North'],
    ['bottom', 'South'],
  ])

  const onSubmit: SubmitHandler<AuraInputs> = (data) => {
    data.direction = direction
    setAura(data)

    if(path === 'onboarding'){
      router.push('/onboarding?tab=identity')
      return
    }

    if (path.includes('profile')){
      router.push(`/profile/${address}/identity`)

    }
  }

  const onChangeColorOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOne(event.target?.value.toString())
    setGradient(`linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`)
  }

  const onChangeColorTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwo(event.target.value.toString())
    const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }

  const onChangeColorThree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThree(event.target.value.toString())
    const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }

  const changeDirection = (event: React.MouseEvent<HTMLInputElement>) => {
    setDirection(event.currentTarget.id)

    const formatColor = `linear-gradient(to ${event.currentTarget.id}, ${colorOne}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }


  useEffect(() => {
    if(colorOne === undefined || !colorOne.length){
      user?.colorOne && setOne(user.colorOne)
      user?.colorTwo && setTwo(user.colorTwo)
      user?.colorThree && setThree(user.colorThree)
      user?.direction && setDirection(user?.direction)
      const formatColor = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`
      setGradient(formatColor)
      return
    }
  })

  useEffect(() => {
    if (colorOne.length){
      const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`
      setGradient(formatColor)
    }

  }, [gradient])


  return (
    <>
      <div className="flex flex-col justify-center items-center my-12">
        <div
          className={auraCircle}
          style={{ background: `${gradient ? gradient : initialGradient}` }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-12">
            <div className="flex flex-row  justify-around" >
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorOne ? colorOne : user?.colorOne!}
                  {...register('colorOne')}
                  onChange={(event) => onChangeColorOne(event)}
                  className="w-24 h-12 border-none bg-transparent	"
                />
                <p>{colorOne ? colorOne : user?.colorOne!}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorTwo ? colorTwo : user?.colorTwo!}
                  {...register('colorTwo')}
                  onChange={(event) => onChangeColorTwo(event)}
                  className="w-24 h-12 border-none bg-transparent"
                />
                <p>{colorTwo ? colorTwo : user?.colorTwo}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="color"
                  value={colorThree ? colorThree : user?.colorThree!}
                  {...register('colorThree')}
                  onChange={(event) => onChangeColorThree(event)}
                  className="w-24 h-12 border-none bg-transparent"
                />
                <p>{colorThree ? colorThree : user?.colorThree}</p>
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
            <h3 className="self-center my-8"> Direction: {cardinalMap.get(direction ? direction : user?.direction!)} </h3>
            <input
              type="submit"
              title="next"
              value={'Generate Aura'}
              className="not-italic bg-[#0E4749] h-12 rounded-lg font-mono font-bold text-lg p-2 px-4 border-none mt-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default AuraForm
