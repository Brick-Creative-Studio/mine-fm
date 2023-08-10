import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import Image from 'next/future/image'
import styles from '../../pages/create/create-sound/styles.module.css'
import { getFetchableUrl } from 'packages/ipfs-service'
import { useLayoutStore } from '../../stores'
import SingleImageUpload from '../SingleImageUpload/SingleImageUpload'
import { useEventStore } from '../../stores/useEventStore'
import createEvent from '../../data/rest/createEvent'
import { Event } from '../../types/Event'
import SuccessEventModal from "../Modals/SuccessEventModal";

type LivestreamInput = {
  title: string
  address: string
  organizer: string
  artist: string
  mood: string
  description: string
  trackList: string
  posterUrl: string
  color: string
  titleRequired: string
  date: Date
  time: string
}

export default function LivestreamForm({}) {
  const methods = useForm<LivestreamInput>()

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = methods
  const [isMounted, setIsMounted] = useState(false)
  const { posterUrl, setPosterUrl} = useEventStore((state) => state)
  const { isMobile, signerAddress } = useLayoutStore()
  let [isOpen, setIsOpen] = useState(false)



  const onSubmit: SubmitHandler<LivestreamInput> = async (data) => {


    const event: Event = {
      title: data.title,
      address: signerAddress as string,
      organizer: data.organizer,
      artist: data.artist,
      isOnline: true,
      posterURL: posterUrl ? posterUrl : '',
      mood: data.mood,
      startDate: data.date,
      description: data.description,
    }

    const response = await createEvent(event);

    if(response){
      setIsOpen(true)
    }
    //TODO: Date and time formatter
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col ">
      <div>
        <h2> Livestream Information </h2>
        <p className="opacity-40 -mt-4"> Required* </p>
      </div>

      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isMobile ? (
            <div className="flex flex-col space-y-8">
              <div className={'flex flex-col items-center justify-center'}>
                <label className="mb-4 self-start"> Artwork </label>
                <SingleImageUpload
                  id={'livestream-poster'}
                  alt={'upload image'}
                  name={'posterUrl'}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="song title"> Title </label>
                {/* include validation with required or other standard HTML validation rules */}
                <input
                  type="text"
                  className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                  {...register('title', { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="organizer" className="">
                  {' '}
                  Organizer{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('organizer')}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="artist"> Featured Artist </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('artist')}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Mood"> Mood </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('mood')}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="trackList"> Tracklist </label>
                {/* register your input into the hook by invoking the "register" function */}
                <textarea
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('trackList')}
                />
              </div>
              <div>
                <label htmlFor="MS Date" className="">
                  {' '}
                  Date{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  type="date"
                  className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('date')}
                />

                <label htmlFor="MS Time" className="">
                  {' '}
                  Time{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  type="time"
                  className=" bg-transparent h-10 border p-1 w-fit border-solid rounded-md text-white "
                  {...register('time')}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description">
                  {' '}
                  How Would You Describe the Livestream?{' '}
                </label>
                <p className="opacity-40 "> Description </p>

                {/* register your input into the hook by invoking the "register" function */}
                <textarea
                  defaultValue="feels like summer"
                  className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                  {...register('description')}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label htmlFor="description"> Add a Color to Match the Mood </label>
                <div className="flex justify-center self-center mt-4 w-40 h-40">
                  <input type="color" className={styles.style2} {...register('color')} />
                </div>
              </div>

              {/* errors will return when field validation fails  */}
              {errors.titleRequired && <span>This field is required</span>}
              <SuccessEventModal isOpen={isOpen} eventId={"33121"}/>
              <input
                type="submit"
                className="bg-[#5971ED] border-transparent h-12 rounded-lg font-mono font-bold text-lg"
              />
            </div>
          ) : (
            <div className="flex">
              <div className="flex flex-col space-y-8 basis-1/2 mr-24">
                <div className="flex flex-col">
                  <label htmlFor="song title"> Title </label>
                  {/* include validation with required or other standard HTML validation rules */}
                  <input
                    type="text"
                    className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                    {...register('title', { required: true })}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="organizer" className="">
                    {' '}
                    Organizer{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('organizer')}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="artist"> Featured Artist </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('artist')}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Mood"> Mood </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('mood')}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="trackList"> Tracklist </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <textarea
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('trackList')}
                  />
                </div>
                <div>
                  <label htmlFor="MS Date" className="mr-2">
                    {' '}
                    Date{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    type="date"
                    className="mr-16 w-1/3 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('date')}
                  />

                  <label htmlFor="MS Time" className="mr-2">
                    {' '}
                    Time{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    type="time"
                    className="w-1/3 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('time')}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description">
                    {' '}
                    How Would You Describe the Livestream?{' '}
                  </label>
                  <p className="opacity-40 "> Description </p>

                  {/* register your input into the hook by invoking the "register" function */}
                  <textarea
                    defaultValue="feels like summer"
                    className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                    {...register('description')}
                  />
                </div>

                {/* errors will return when field validation fails  */}
                {errors.titleRequired && <span>This field is required</span>}
                <SuccessEventModal isOpen={isOpen} eventId={"33121"}/>

                <input
                  type="submit"
                  className="bg-[#5971ED] border-transparent h-12 rounded-lg font-mono font-bold text-lg"
                />
              </div>

              <div className="flex flex-col space-y-12 ">
                <div>
                  <label className="mb-4"> Artwork </label>
                  <SingleImageUpload
                    id={'livestream-poster'}
                    alt={'upload image'}
                    name={'posterUrl'}
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <label htmlFor="description"> Add a Color to Match the Mood </label>
                  <div className="flex justify-center self-center mt-4 w-40 h-40">
                    <input
                      type="color"
                      className={styles.style2}
                      {...register('color')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  )
}
