import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import { Miner } from 'types/Miner'



type Identity = {
  name: string
  m_tag: string
  phone: string
  email: string
  vibe: string
}

export default function IdentityForm({}) {
  const { register, handleSubmit, getValues } = useForm<Identity>()
  const { setIdentity, setHasAccount, hasAccount, aura } = useProfileStore((state) => state)
  const { signerAddress: address } = useLayoutStore()
  const { needsCard, setStatus } = useMCStore((state) => state)

  const createMiner = async (url: string, newMiner: any) => {
    let miner: Miner = await axios.post(url, newMiner).then((res) => {
      console.log(res.data)
      return res.data
    })
  }

  const onSubmit: SubmitHandler<Identity> = (data) => {
    setIdentity(data)

    if (!hasAccount) {
      const url = `https://minefm-server.herokuapp.com/miner/create`
      const newMiner = {
        miner_tag: data.m_tag,
        email: data.email,
        phone: data.phone,
        walletAddress: address,
        name: data.name,
        colorOne: aura.colorOne,
        colorTwo: aura.colorTwo,
        colorThree: aura.colorThree,
        direction: aura.direction,
      }
      try{ 
        createMiner(url, newMiner).then(() => {
          console.log("create miner request")

          if(needsCard){
            router.push('/onboarding?tab=mintMC')
          } else{
            router.push(`/profile/${address}`)
          }
  
        })
      } catch(e){
        alert('error creating account')
        return
      }
  
      }    
    router.push(`/profile/${address}`)
  }

  const onAuraSubmit = () => {
    const identityValues: Identity = getValues()
    console.log('identity form', identityValues)
    setIdentity(identityValues)
  }

  const router = useRouter()

  const path = router.pathname.replace(/\//g, '')

  useEffect(() => {
    console.log('check path', path)
  }, [router])

  return (
    <div className="flex flex-col w-full mt-8 justify-center items-center">
      <div className="flex flex-col items-center h-1/2 w-1/4 rounded-lg">
        <form
          className="flex flex-col w-full items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4 > * + * w-full">
            <div className="flex flex-col ">
              <label htmlFor="Miner Name"> Name </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                type="text"
                className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('name', { required: true })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="Miner tag"> miner_tag </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                type="text"
                className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('m_tag', { required: true })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email"> Email </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                type="text"
                placeholder="miner@mine.fm"
                className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('email', { required: false })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phone"> Phone # </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                placeholder="555-456-6780"
                className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                {...register('phone', { required: true })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="vibe"> Vibe </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input
                type="text"
                required
                placeholder="ex: moody, mellow, just-me"
                className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                {...register('vibe', { required: true })}
              />
            </div>
          </div>
          <Link
            href={{
              pathname: `/profile/${address}/aura`,
            }}
          >
            <button
              type="button"
              onClick={() => onAuraSubmit()}
              className={`flex flex-row rounded-full ${
                path === 'onboarding' ? 'invisible' : 'visible mb-4'
              }  items-center justify-evenly w-32 h-12 mt-8 bg-gradient-to-r from-teal-700 to-indigo-500 cursor-pointer`}
            >
              <h2> Aura </h2>
              <Image src={'/color-wheel.svg'} height={32} width={32} alt="aura button" />
            </button>
          </Link>
          <input
            type="submit"
            title="next"
            value={path === 'onboarding' ? 'Create Account' : 'Save & Exit'}
            className="not-italic bg-black h-12 rounded-full font-mono font-bold text-lg italic p-2 px-4 border-none cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}
