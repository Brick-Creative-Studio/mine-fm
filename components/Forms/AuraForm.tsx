import React, { useState, useEffect } from 'react'
import { useLayoutStore, useProfileStore } from 'stores'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './AuraForm.module.css'
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
import axios from "axios";

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
  const { error, isLoading, user } = useGetUser(address as string)


  //form handlers
  const { register, handleSubmit } = useForm<AuraInputs>()

  const { setAura, hasAccount } = useProfileStore((state) => state)

  const [colorOne, setOne] = useState<string>(hasAccount ? user?.colorOne! : "#FFFFFF")
  const [colorTwo, setTwo] = useState<string>(hasAccount ? user?.colorTwo! : "#FFFFFF")
  const [colorThree, setThree] = useState<string>(hasAccount ? user?.colorThree! : "#FFFFFF")
  const [direction, setDirection] = useState(hasAccount ? user?.direction! : "top")
  const initialGradient = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${colorThree})`
  const [gradient, setGradient] = useState<string>(initialGradient)

  const cardinalMap = new Map<string, string>([
    ['left', 'Left'],
    ['right', 'Right'],
    ['top', 'Top'],
    ['bottom', 'Bottom'],
  ])

  const onSubmit: SubmitHandler<AuraInputs> = async (data) => {
    data.direction = direction
    setAura(data)

    if(path === 'onboarding'){
      await router.push('/onboarding?tab=identity')
      return
    }

    if (path.includes('profile')){
      const updateEndpoint = 'user'
      const url = process.env.NEXT_PUBLIC_BASE_URL + updateEndpoint

      const updateData = {
        colorOne: colorOne,
        colorTwo: colorTwo,
        colorThree: colorThree,
        direction: direction,
        walletAddress: address,
        id: user?.id
      }

      const res = await axios.put(url, updateData).then((res) => {
        setAura({
          colorOne: colorOne,
          colorTwo: colorTwo,
          colorThree: colorThree,
          direction: direction,
        })
        router.push(`/profile/${address}/settings?tab=identity`)
      }).catch((error) => {
        console.log('error updating user:', error)
        return error
      })
    }
  }

  const onChangeColorOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOne(event.target?.value.toString())
    const formatColor = `linear-gradient(to ${direction}, ${event.target?.value.toString()}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }

  const onChangeColorTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwo(event.target?.value.toString())
    const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${event.target?.value.toString()}, ${colorThree})`
    setGradient(formatColor)
  }

  const onChangeColorThree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThree(event.target?.value.toString())
    const formatColor = `linear-gradient(to ${direction}, ${colorOne}, ${colorTwo}, ${event.target?.value.toString()})`
    setGradient(formatColor)
  }

  const changeDirection = (event: React.MouseEvent<HTMLInputElement>) => {
    setDirection(event.currentTarget.id)

    const formatColor = `linear-gradient(to ${event.currentTarget.id}, ${colorOne}, ${colorTwo}, ${colorThree})`
    setGradient(formatColor)
  }

  useEffect(() => {
    if(user){
      setGradient(`linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`)
      setOne(user.colorOne!)
      setTwo(user.colorTwo!)
      setThree(user.colorThree!)
      setDirection(user.direction!)
    }
  }, [isLoading, user])


  return (
    <>
      { isLoading ? <h3 className={'animate-pulse'}> LOADING...</h3> :
        (
          <div className="flex flex-col justify-center items-center my-12">
            <div
              className={'w-64 h-64 mr-12 ml-12 rounded-full'}
              style={{ background: `${gradient}` }}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col m-12">
                <div className="flex flex-row  justify-around" >
                  <div className="flex flex-col justify-center items-center">
                    <div className={'w-24 h-12 mx-6 appearance-none p-0 border-none bg-transparent rounded-full cursor-pointer'}>

                    <input
                      type="color"
                      value={colorOne}
                      {...register('colorOne')}
                      onChange={(event) => onChangeColorOne(event)}
                      className={styles.style2}                    />
                    </div>
                    <p>{colorOne}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center ">
                    <div className={'w-24 h-12 appearance-none p-0 border-none bg-transparent rounded-full cursor-pointer'}>

                    <input
                      type="color"
                      value={colorTwo}
                      {...register('colorTwo')}
                      onChange={(event) => onChangeColorTwo(event)}
                      className={styles.style2}
                    />
                    </div>
                    <p>{colorTwo}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center mx-6">
                    <div className={'w-24 h-12 appearance-none p-0 border-none bg-transparent rounded-full cursor-pointer'}>
                    <input
                      type="color"
                      value={colorThree }
                      {...register('colorThree')}
                      onChange={(event) => onChangeColorThree(event)}
                      className={styles.style2}
                      // className="w-24 h-12 appearance-none p-0 border-none bg-transparent rounded-full cursor-pointer"
                    />
                    </div>

                    <p>{colorThree}</p>
                  </div>
                </div>
                <div className={'flex justify-around items-center'}>
                <div className="flex justify-center m-8">
                  <div className={'bg-gray-800 w-8 h-8 m-6'}>
                    <input
                      id={'top'}
                      type="button"
                      onClick={(event) => changeDirection(event)}
                      className={'bg-gray-800 w-8 h-12 absolute -mt-12 cursor-pointer'}
                    />
                    <input
                      id={'bottom'}
                      type="button"
                      onClick={(event) => changeDirection(event)}
                      className={'bg-gray-800 w-8 h-12 absolute mt-8 cursor-pointer rounded-md'}
                    />
                    <input
                      id={'left'}
                      type="button"
                      onClick={(event) => changeDirection(event)}
                      className={'bg-gray-800 w-12 h-8 absolute -ml-12 cursor-pointer rounded-md'}
                    />
                    <input
                      id={'right'}
                      type="button"
                      onClick={(event) => changeDirection(event)}
                      className={'bg-gray-800 w-12 h-8 absolute ml-8 cursor-pointer rounded-md'}
                    />
                    <div className={'bg-gray-900 w-6 h-6 absolute mt-1 ml-1 rounded-full'} />
                  </div>
                </div>
                <p className="self-center"> Direction: {cardinalMap.get(direction)} </p>
                </div>
                <input
                  type="submit"
                  title="next"
                  value={'Save Aura'}
                  className="not-italic bg-transparent h-12 rounded-lg font-mono font-bold text-lg p-2 px-4 border-solid border-[#B999FA] m-6 cursor-pointer"
                />
              </div>
            </form>
          </div>
        )
      }

    </>
  )
}

export default AuraForm
