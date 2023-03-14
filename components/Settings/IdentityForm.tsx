import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutStore, useProfileStore } from 'stores'
import { useRouter } from 'next/router'


type Identity = {
  name: string
  m_tag: string
  phone: string
  email: string
  vibe: string
}

export default function IdentityForm({}) {
  
  const { register, handleSubmit,  getValues} = useForm<Identity>()
  const { setIdentity } = useProfileStore(state => state)
  
  const onSubmit: SubmitHandler<Identity> = (data) => {
    console.log('identity values',data)
    setIdentity(data)
    router.push(`/profile/${address}`)

  }

  const onAuraSubmit = () => {
    const identityValues: Identity = getValues()
    console.log('identity form', identityValues)
    setIdentity(identityValues)
  }

  const { signerAddress: address } = useLayoutStore()
  const router = useRouter()


  return (
    <div className="flex flex-col w-full mt-8 justify-center items-center">
      <div className="flex flex-col items-center h-1/2 w-1/4 rounded-lg">
      <form className="flex flex-col w-full items-center" onSubmit={handleSubmit(onSubmit)}>

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
        <Link href={
          {
            pathname: `/profile/${address}/aura`
          }
        }>
          <button  
          type="button"
          onClick={() => onAuraSubmit()} 
          className="flex flex-row rounded-full  items-center justify-evenly w-32 h-12 mt-8 bg-gradient-to-r from-teal-700 to-indigo-500 cursor-pointer	"
          >
            <h2> Aura </h2>
            <Image src={'/color-wheel.svg'} height={32} width={32} alt="aura button" />
          </button>
        </Link>
        <input
          type="submit"
          title="next"
          value={'Save & Exit'}
          className="not-italic bg-black h-12 rounded-full font-mono font-bold text-lg italic p-2 px-4 border-none mt-6 cursor-pointer"
        />
              </form>

      </div>
    </div>
  )
}
