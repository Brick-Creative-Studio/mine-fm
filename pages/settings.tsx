import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function SettingsPage({}) {

    const { register, handleSubmit, formState: { errors } } = useForm<MSInputs>();
    const onSubmit: SubmitHandler<MSInputs> = data => console.log(data);

  return (
    <div className="flex flex-col mt-32 justify-center items-center">
      <h1> Identity </h1>
      <div className="flex flex-col items-center h-1/2 p-8 w-1/3 border-solid rounded-lg">
        <h2 className="opacity-50"> Name / Tag / Phone </h2>
        <div className='space-y-12 > * + * w-full'>
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
        </div>
      </div>
    </div>
  )
}
