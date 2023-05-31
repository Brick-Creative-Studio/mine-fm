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
  bio: string
}

export default function IdentityForm({}) {
  const { register, handleSubmit, getValues } = useForm<Identity>()
  const { setIdentity, name, aura, m_tag, email, phone, bio } = useProfileStore(
    (state) => state
  )
  const { signerAddress: address } = useLayoutStore()
  const { needsCard, setStatus } = useMCStore((state) => state)

  const router = useRouter()
  const path = router.pathname.replace(/\//g, '')

  const isOnboarding = path === 'onboarding'
  const createMiner = async (url: string, newMiner: any) => {
    let miner: Miner = await axios.post(url, newMiner).then((res) => {
      console.log(res.data)
      return res.data
    })
  }

  const updateMiner = async (url: string, updatedMiner: any) => {
    let miner: Miner = await axios.put(url, updatedMiner).then((res) => {
      console.log(res.data)
      return res.data
    })
  }

  const onSubmit: SubmitHandler<Identity> = (data) => {
    setIdentity(data)

    if (isOnboarding) {
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
      try {
        createMiner(url, newMiner).then(() => {
          router.push(`/profile/${address}`)
        })
      } catch (e) {
        alert('error creating new account')
        return
      }
    } else {
      const url = `https://minefm-server.herokuapp.com/miner/`
      const updatedMiner = {
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
      try {
        updateMiner(url, updatedMiner).then(() => {
          router.push(`/profile/${address}`)
        })
      } catch (e) {
        alert('error updating account')
        return
      }
    }
  }

  const onAuraSubmit = () => {
    const identityValues: Identity = getValues()
    onSubmit(identityValues)
    setIdentity(identityValues)
  }

  return (
    <div className="flex flex-col mt-8  justify-center items-center">
      <form
        className="flex flex-col w-3/4 md:w-1/3  items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4 > * + * w-full">
          <div className="flex flex-col ">
            <label htmlFor="Miner Name"> Name </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              defaultValue={ isOnboarding ? undefined :  name as string}
              className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
              {...register('name', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="Miner tag"> miner_tag </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              defaultValue={ isOnboarding ? undefined :  m_tag as string}
              className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
              {...register('m_tag', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email"> Email </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              defaultValue={ isOnboarding ? undefined :  email as string}
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
              required
              defaultValue={ isOnboarding ? undefined :  phone as string}
              placeholder="555-456-6780"
              className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
              {...register('phone', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="bio"> Bio </label>
            {/* include validation with required or other standard HTML validation rules */}
            <textarea
              required
              defaultValue={ isOnboarding ? undefined :  name as string}
              placeholder="I am a musician, curator, and miner"
              className=" bg-transparent  h-24 border p-2 border-solid rounded-md text-white "
              {...register('bio', { required: true })}
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
          className="not-italic bg-black h-12 rounded-full font-mono font-bold text-lg p-2 px-4 border-none cursor-pointer mb-4"
        />
      </form>
    </div>
  )
}
