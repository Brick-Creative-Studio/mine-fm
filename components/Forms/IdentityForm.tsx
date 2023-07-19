import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import createUser from "../../data/rest/createUser";
import updateUser from "../../data/rest/updateUser";
import { phoneNumberAutoFormat } from '../../utils/phoneNumberAutoFormat'
import { User } from "../../types/User";
import NewUserModal from '../Modals/NewUserModal';
import UploadFailModal from "../Modals/UploadFailModal";

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
  let [isOpen, setSuccessIsOpen] = useState(false)
  let [isFailOpen, setFailureIsOpen] = useState(false)

  const router = useRouter()
  const path = router.pathname.replace(/\//g, '')

  const isOnboarding = path === 'onboarding'

  const [value, setValue] = useState<string>('')

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value)
    setValue(targetValue)
  }

  const onSubmit: SubmitHandler<Identity> = async (data) => {
    setIdentity(data)

    if (isOnboarding) {
      const user = {
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
      const newUser = await createUser(address as string, user as User)
      if (newUser){
        setSuccessIsOpen(true)
      }else {
        setFailureIsOpen(true)
        console.log('create user failure')
      }

    } else {
      const updatedUser = {
        miner_tag: data.m_tag,
        email: data.email,
        phone: data.phone,
        walletAddress: address,
        name: data.name,
        bio: data.bio,
      }
      const user = await updateUser(updatedUser)
      if (user){
        console.log('updating user')
        router.push(`/profile/${address}`)
      } else {
        console.log('error updating user')
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
              value={value}
              placeholder={phoneNumberAutoFormat(phone as string)}
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
        { isOnboarding ? <NewUserModal isOpen={isOpen}/> : null}

        <UploadFailModal isOpen={isFailOpen} />
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
