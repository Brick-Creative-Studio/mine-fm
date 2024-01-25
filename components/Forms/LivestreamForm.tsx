import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import Popup from 'reactjs-popup'
import { useLayoutStore, useEventStore, useProfileStore } from '../../stores'
import SingleImageUpload from '../SingleImageUpload/SingleImageUpload'
import MemoryCardUpload from '../MemoryCardUpload/MemoryCardUpload'
import { streamValidationSchema } from './LivestreamForm.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

type LivestreamInput = {
  title: string
  organizer: string
  ownerAddress: string
  artist: string
  description: string
  posterUrl: string
  website?: string
  social: string
  startDate: string
  startTime: string
  startingPrice: string
  isApproved: boolean
  isFree: boolean
  endDate: string
  endTime: string
}

export default function LivestreamForm({}) {
  const methods = useForm<LivestreamInput>()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods
  const [isMounted, setIsMounted] = useState(false)
  const state = useEventStore((state) => state)
  const { id : userID } = useProfileStore((state) => state)
  const { isMobile, signerAddress } = useLayoutStore()
  let [isOpen, setIsOpen] = useState(false)
  const [eventID, setEventId] = useState<string>()
  const [isChecked, setIsChecked] = useState(false)
  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  const onSubmit: SubmitHandler<LivestreamInput> = async (data) => {
    const fStartTime = new Date(`${data.startDate} ${data.startTime}`)
    const fEndTime = new Date(`${data.endDate} ${data.endTime}`)

    const event = {
      title: data.title,
      ownerAddress: signerAddress as string,
      organizer: data.organizer,
      artist: data.artist,
      ownerId: userID,
      isOnline: true,
      website: data.website,
      social: data.social,
      posterUrl: state?.posterUrl ? state?.posterUrl : '',
      memoryCardURL: state?.memoryCardURL ? state?.memoryCardURL : '',
      description: data.description,
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      startingPrice: isChecked ? "0.00" : data.startingPrice,
      isFree: isChecked,
    }

    state.setEvent(event)
    await router.push(`/create/stream/confirmation`)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col ">
      <div>
        <h2> Livestream Information </h2>
        <p className="opacity-40 -mt-4"> * = Required </p>
      </div>

      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isMobile ? (
            <div className="flex flex-col space-y-8">
              <div className={'flex flex-col items-center justify-center'}>
                <label className="mb-1 self-start">
                  {' '}
                  Artwork<span className={'text-red-600'}>*</span>{' '}
                </label>
                <SingleImageUpload
                  id={'livestream-poster'}
                  alt={'upload image'}
                  name={'posterUrl'}
                />
              </div>
              <div>
                <label className="mb-4">
                  {' '}
                  Memory Card
                  <Popup
                    trigger={(open) => (
                      <img
                        alt={'info-circle'}
                        className={'cursor-pointer m-1'}
                        src={'/info-circled.svg'}
                      />
                    )}
                    on={'hover'}
                    position="right center"
                    closeOnDocumentClick
                  >
                    <div
                      className={
                        'bg-[#12002C] w-48 p-4 rounded-md border-[#7DD934] border-solid'
                      }
                    >
                      <p className={'text-sm'}>
                        <span className={'text-[#B999FA] '}> Memory Cards: </span> an
                        (erc-1155) NFT that provides miners access to their livestreams
                        and rewards.
                      </p>
                    </div>
                  </Popup>
                </label>
                <MemoryCardUpload
                  id={'livestream-poster'}
                  alt={'upload image'}
                  name={'posterUrl'}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="livestream title">
                  {' '}
                  Title<span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* include validation with required or other standard HTML validation rules */}
                <input
                  type="text"
                  defaultValue={state?.title ? state?.title : undefined}
                  placeholder={'Your Stream Title'}
                  className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <p className={'text-sm text-red-500 '} role="alert">
                    A title is required.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="organizer" className="">
                  {' '}
                  Organizer<span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue={state?.organizer ? state?.organizer : undefined}
                  placeholder={'MINE Records'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('organizer', { required: true })}
                />
                {errors.organizer && (
                  <p className={'text-sm text-red-500 '} role="alert">
                    A organizer is required.
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="ownerAddress" className="">
                  {' '}
                  Organizer Wallet Address <span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue={state?.ownerAddress ? state?.ownerAddress : undefined}
                  placeholder={'0x4bf...28eA3'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('ownerAddress', { required: true })}
                />
                {errors.ownerAddress && (
                  <p className={'text-sm text-red-500 '} role="alert">
                    An owner is required to earn rewards.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="artist">
                  {' '}
                  Featured Artist<span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  placeholder={'0xStevie wonder'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('artist', { required: true })}
                />
                {errors.artist && (
                  <p className={'text-sm text-red-500 '} role="alert">
                    An artist is required.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="website"> Website </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue={state?.website ? state?.website : undefined}
                  placeholder={'www.mine.fm'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('website')}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="social"> Social </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue={state?.social ? state?.social : undefined}
                  placeholder={'www.instagram.com/mine.fm'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('social')}
                />
              </div>
              <div className="flex items-center">
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  type={'checkbox'}
                  checked={isChecked}
                  onClick={() => handleOnChange()}
                  className="bg-transparent h-6 border p-2 mr-2 border-solid rounded-md "
                  {...register('isFree')}
                />
                <label htmlFor="Is Free" className={'text-lg'}>
                  {' '}
                  Free Entry{' '}
                </label>
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="startPrice">
                  {' '}
                  Starting Price<span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  placeholder=".005 ETH"
                  min={0}
                  defaultValue={state?.startingPrice && !isChecked ? state?.startingPrice : 0.00 }
                  type={'number'}
                  value={isChecked ? 0.00 : undefined}
                  disabled={isChecked}
                  step={0.0001}
                  autoComplete={'off'}
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('startingPrice', { required: true })}
                />
                <div className={'absolute text-white right-4 top-7'}> ETH </div>
              </div>
              <div>
                <div className={'my-2'}>
                  <label htmlFor="startDate" className="mr-4">
                    {' '}
                    Start Date<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.startDate ? state.startDate : ""}
                    type="date"
                    className=" bg-transparent h-10 w-fit border p-2 border-solid rounded-md text-white "
                    {...register('startDate', { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="mr-4">
                    {' '}
                    Start Time<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.startTime ? state.startTime : ""}
                    type="time"
                    className=" bg-transparent h-10 border p-1 w-fit border-solid rounded-md text-white "
                    {...register('startTime', { required: true })}
                  />
                </div>
              </div>

              <div>
                <div className={'my-2'}>
                  <label htmlFor="endDate" className="mr-8">
                    {' '}
                    End Date<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.endDate ? state.endDate : ""}
                    type="date"
                    className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('endDate', { required: true })}
                  />
                </div>

                <div>
                  <label htmlFor="endTime" className="mr-8">
                    {' '}
                    End Time<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.endTime ? state.endTime : ""}
                    type="time"
                    className=" bg-transparent h-10 border p-1 w-fit border-solid rounded-md text-white "
                    {...register('endTime', { required: true })}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description">
                  {' '}
                  How Would You Describe the Livestream?{' '}
                </label>
                <p className="opacity-40 "> Description </p>

                {/* register your input into the hook by invoking the "register" function */}
                <textarea
                  placeholder="A livestream for your mood"
                  defaultValue={state?.description ? state?.description : undefined}
                  className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                  {...register('description')}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {/*{errors && <span>This field is required</span>}*/}
              {/*<SuccessEventModal isOpen={isOpen} eventId={eventID} />*/}
              <input
                type="submit"
                className="bg-black hover:bg-black/60 hover:border-emerald-700 border-transparent h-12 rounded-lg font-mono font-bold text-lg cursor-pointer"
              />
            </div>
          ) : (
            /*
             * MOBILE VIEW ABOVE ^^^
             *
             *
             * DESKTOP VIEW BELOW
             * */
            <div className="flex">
              <div className="flex flex-col space-y-8 basis-1/2 mr-24">
                <div className="flex flex-col">
                  <label htmlFor="song title">
                    {' '}
                    Title<span className={'text-red-600'}>*</span>{' '}
                  </label>
                  {/* include validation with required or other standard HTML validation rules */}
                  <input
                    type="text"
                    defaultValue={state?.title ? state?.title : undefined}
                    placeholder={'Your Stream Title'}
                    className=" bg-transparent  h-10 border p-2 border-solid rounded-md text-white "
                    {...register('title', { required: true })}
                  />
                  {errors.title && (
                    <p className={'text-sm text-red-500 '} role="alert">
                      A title is required.
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="organizer" className="">
                    {' '}
                    Organizer<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state?.organizer ? state?.organizer : undefined}
                    placeholder={'MINE Records'}
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('organizer', { required: true })}
                  />
                  {errors.organizer && (
                    <p className={'text-sm text-red-500 '} role="alert">
                      An organizer is required.
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="owner address" className="">
                    {' '}
                    Organizer Wallet Address <span className={'text-red-600'}>
                      *
                    </span>{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state?.ownerAddress ? state?.ownerAddress : undefined}
                    placeholder={'0x4bf...28eA3'}
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('ownerAddress', { required: true })}
                  />
                  {errors.ownerAddress && (
                    <p className={'text-sm text-red-500 '} role="alert">
                      An address is required to claim your rewards.
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="artist">
                    {' '}
                    Featured Artist<span className={'text-red-600'}>*</span>{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state?.artist ? state?.artist : undefined}
                    placeholder={'0xStevieWonder'}
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('artist', { required: true })}
                  />
                  {errors.artist && (
                    <p className={'text-sm text-red-500 '} role="alert">
                      An artist is required.
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="website"> Website </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state?.website ? state?.website : undefined}
                    placeholder={'www.your-amazing.com'}
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('website')}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="social"> Social </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state?.social ? state?.social : undefined}
                    placeholder={'www.myspace.com/minefm'}
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('social')}
                  />
                </div>

                <div className="flex items-center">
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    type={'checkbox'}
                    checked={isChecked}
                    onClick={() => handleOnChange()}
                    className="bg-transparent h-6 border p-2 mr-2 border-solid rounded-md "
                    {...register('isFree')}
                  />
                  <label htmlFor="Is Free" className={'text-lg'}>
                    {' '}
                    Free Entry{' '}
                  </label>
                </div>

                <div className="flex flex-col relative">
                  <label htmlFor="starting entry price">
                    {' '}
                    Starting Entry Price<span className={'text-red-600'}>*</span>{' '}
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    placeholder="0.005 ETH"
                    min={0}
                    step={0.0001}
                    defaultValue={state?.startingPrice && !isChecked ? state?.startingPrice : 0.00 }
                    type={'number'}
                    value={isChecked ? 0.00 : undefined}
                    autoComplete={'off'}
                    className="bg-transparent appearance-none	 h-10 w-1/3 border p-2 px-4 border-solid rounded-md text-white "
                    {...register('startingPrice', { required: true })}
                  />
                  <div className={'absolute text-white left-52 top-7'}> ETH </div>
                </div>
                <div>
                  <label htmlFor="MS Date" className="mr-2">
                    {' '}
                    Start Date<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.startDate ? state.startDate : ""}
                    type="date"
                    className="mr-16 w-1/4 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('startDate', { required: true })}
                  />

                  <label htmlFor="MS Time" className="mr-2">
                    {' '}
                    Start Time<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.startTime ? state.startTime : ""}
                    type="time"
                    className="w-1/4 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('startTime', { required: true })}
                  />
                </div>

                <div>
                  <label htmlFor="MS Date" className="mr-6">
                    {' '}
                    End Date<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.endDate ? state.endDate : ""}
                    type="date"
                    className="mr-16 w-1/4 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('endDate', { required: true })}
                  />

                  <label htmlFor="MS Time" className="mr-6">
                    {' '}
                    End Time<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue={state.endTime ? state.endTime : ""}
                    type="time"
                    className="w-1/4 bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('endTime', { required: true })}
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
                    placeholder="A livestream for your mood"
                    defaultValue={state?.description ? state?.description : undefined}
                    className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                    {...register('description')}
                  />
                </div>

                {/* errors will return when field validation fails  */}
                {/*{errors && <span>This field is required</span>}*/}
                {/*// <SuccessEventModal isOpen={isOpen} eventId={eventID} />*/}

                <input
                  type="submit"
                  value={'Review Details'}
                  className="bg-black hover:bg-black/60 hover:border-emerald-700 border-transparent h-12 rounded-lg font-mono font-bold text-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col space-y-12 ">
                <div>
                  <label className="mb-4">
                    {' '}
                    Artwork<span className={'text-red-600'}>*</span>{' '}
                  </label>
                  <SingleImageUpload
                    id={'livestream-poster'}
                    alt={'upload image'}
                    name={'posterUrl'}
                  />
                </div>
                <div>
                  <label className="mb-4">
                    {' '}
                    Memory Card
                    <Popup
                      trigger={(open) => (
                        <img
                          alt={'info-circle'}
                          className={'cursor-pointer m-1'}
                          src={'/info-circled.svg'}
                        />
                      )}
                      on={'hover'}
                      position="right center"
                      closeOnDocumentClick
                    >
                      <div
                        className={
                          'bg-[#12002C] w-48 p-4 rounded-md border-[#7DD934] border-solid'
                        }
                      >
                        <p className={'text-sm'}>
                          <span className={'text-[#B999FA] '}> Memory Cards: </span> A
                          (erc-1155) token that grants miners access to livestreams and
                          rewards. This can be thought of as a "loyalty" card as well.
                        </p>
                      </div>
                    </Popup>
                  </label>
                  <div
                    className={
                      'w-full h-full bg-black/50 border-solid border-[#7DD934] rounded-md  mt-4 items-center flex'
                    }
                  >
                    <MemoryCardUpload
                      id={'livestream-poster'}
                      alt={'upload image'}
                      name={'memory card image'}
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
