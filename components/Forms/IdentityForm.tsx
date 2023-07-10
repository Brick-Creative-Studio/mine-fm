import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import { User } from 'types/User'
import { phoneNumberAutoFormat } from '../../utils/phoneNumberAutoFormat'

type Identity = {
  id: string | null
  name: string
  m_tag: string
  phone: string
  email: string
  bio: string
  twitter: string | null
  instagram: string | null
}

export default function IdentityForm({}) {
  const { register, handleSubmit, getValues } = useForm<Identity>()
  const { setIdentity, name, aura, m_tag, email, phone, bio, id } = useProfileStore(
    (state) => state
  )
  const { signerAddress: address } = useLayoutStore()

  const router = useRouter()
  const path = router.pathname.replace(/\//g, '')

  const isOnboarding = path === 'onboarding'
  const createUser = async (url: string, newUser: any) => {
    let user: User = await axios.post(url, newUser).then((res) => {
      console.log(res.data)
      return res.data
    })
    return user;
  }

  const updateUser = async (url: string, updatedUser: any) => {
    let user: User = await axios.put(url, updatedUser).then((res) => {
      console.log(res.data)
      return res.data
    })
  }

  const [value, setValue] = useState<string>('')

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value)
    setValue(targetValue)
  }

  const onSubmit: SubmitHandler<Identity> = (data) => {
    setIdentity(data)

    if (isOnboarding) {
      const url = `https://minefm-server.herokuapp.com/user/create`
      const newUser = {
        miner_tag: data.m_tag,
        email: data.email,
        phone: data.phone,
        walletAddress: address,
        name: data.name,
        colorOne: aura.colorOne,
        colorTwo: aura.colorTwo,
        colorThree: aura.colorThree,
        direction: aura.direction,
        bio: data.bio,
      }
      try {
        createUser(url, newUser)
          .then((user) => {
            if(user){
              alert('user created')
              console.log(user)
            }
          })
          .catch((e) => {
            console.log('error creating a new user', e)
            alert('creation failed')

          })

      } catch (e) {
        console.log('error creating a new user', e)
        return
      }
    } else {
      const url = `https://minefm-server.herokuapp.com/user`
      const updatedUser = {
        miner_tag: data.m_tag,
        email: data.email,
        phone: data.phone,
        walletAddress: address,
        name: data.name,
        colorOne: aura.colorOne,
        colorTwo: aura.colorTwo,
        colorThree: aura.colorThree,
        direction: aura.direction,
        id: id,
        bio: data.bio,
      }
      try {
        console.log('update user', updatedUser)
        updateUser(url, updatedUser).then(() => {
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
            <label htmlFor="name"> Name </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              placeholder="Lil Miner"
              required
              defaultValue={isOnboarding ? undefined : (name as string)}
              className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
              {...register('name', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="Miner tag"> miner_tag </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              placeholder="@lilMiner"
              required
              defaultValue={isOnboarding ? '@' : (m_tag as string)}
              className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
              {...register('m_tag', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email"> Email </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="text"
              defaultValue={isOnboarding ? undefined : (email as string)}
              placeholder="miner@mine.fm"
              required
              className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
              {...register('email', { required: false })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="phone"> Phone # </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="tel"
              defaultValue={isOnboarding ? undefined : (phone as string)}
              placeholder={phone ? phone : "555-456-6780"}
              value={value}
              className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
              {...register('phone', {
                required: false,
                minLength: 7,
                maxLength: 14,
                onChange: (e) => {
                  const targetValue = phoneNumberAutoFormat(e.target.value)
                  if (targetValue.length < 14) {
                    setValue(targetValue)
                  }
                },
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="bio"> Bio </label>
            {/* include validation with required or other standard HTML validation rules */}
            <textarea
              required
              defaultValue={isOnboarding ? undefined : (bio as string)}
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
            className={`flex flex-row rounded-lg ${
              path === 'onboarding' ? 'collapse -mb-12' : 'visible mb-4'
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
          className="not-italic bg-black h-12 rounded-lg font-mono font-bold text-lg p-2 px-4 border-none cursor-pointer mb-8"
        />
      </form>
    </div>
  )
}
