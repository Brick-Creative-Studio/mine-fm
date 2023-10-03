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
import axios from "axios";

type Identity = {
  id: string | null
  name: string
  m_tag: string
  email: string
  bio: string
  twitter: string | null
  instagram: string | null
}

export default function IdentityForm({}) {
  const { register, handleSubmit, getValues } = useForm<Identity>()
  const { setIdentity, name, aura, m_tag, email, bio, setHasAccount, id } = useProfileStore(
    (state) => state
  )
  const { signerAddress: address } = useLayoutStore()
  let [isOpen, setSuccessIsOpen] = useState(false)
  let [isFailOpen, setFailureIsOpen] = useState(false)
  let [user, setUser] = useState<Identity | null>(null)

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

    const user = {
      miner_tag: data.m_tag,
      email: data.email,
      walletAddress: address,
      name: data.name,
      colorOne: aura.colorOne,
      colorTwo: aura.colorTwo,
      colorThree: aura.colorThree,
      direction: aura.direction,
      bio: data.bio,
    }
    if (isOnboarding) {


      const endpoint = 'user/create'
      const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

      const newMiner = await axios.post(url, user).then((res) => {
        setSuccessIsOpen(true)
          setHasAccount(true)
        setUser(data)
        router.push(`/livestream/${address}/aura`)
        return res.data
      }).catch((error) => {
        console.log('fetch user error:', error)
        setFailureIsOpen(true)

        return error
      })

    } else {
      const endpoint = 'user/'
      const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

      const updatedUser = await axios.put(url, user).then((res) => {
        console.log(res.data)
        setUser(data)
        return res.data
      }).catch((error) => {
        console.log('error updating user:', error)
        router.push(`/livestream/${address}/aura`)
        return error
      })

    }
  }

  const onAuraSubmit = () => {
    const identityValues: Identity = getValues()
    onSubmit(identityValues)
    setIdentity(identityValues)
  }

  return (
    <div className="flex flex-col mt-24  h-full my-auto  justify-center items-center">
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
              placeholder="@miner_b"
              defaultValue={isOnboarding ? '' : (m_tag as string)}
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
        { isOnboarding ? <NewUserModal isOpen={isOpen}/> : null}

        <UploadFailModal isOpen={isFailOpen} />
        <input
          type="submit"
          title="next"
          value={path === 'onboarding' ? 'Create Account' : 'Save & Exit'}
          className="not-italic bg-black h-12 rounded-lg font-mono font-bold text-lg p-2 px-4 border-none cursor-pointer my-8"
        />
      </form>
    </div>
  )
}
