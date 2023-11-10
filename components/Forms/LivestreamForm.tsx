import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import Popup from 'reactjs-popup';
import { useLayoutStore } from '../../stores'
import SingleImageUpload from '../SingleImageUpload/SingleImageUpload'
import { useEventStore } from '../../stores/useEventStore'
import createEvent from '../../data/rest/createEvent'
import SuccessEventModal from '../Modals/SuccessEventModal'
import MemoryCardUpload from "../MemoryCardUpload/MemoryCardUpload";

type LivestreamInput = {
  title: string
  address: string
  organizer: string
  artist: string
  description: string
  posterUrl: string
  website: string
  social: string
  titleRequired: string
  startDate: string
  startTime: string
  startingPrice: string | null
  isApproved: boolean
  isFree: boolean
  endDate: string
  endTime: string
}

export default function LivestreamForm({}) {
  const methods = useForm<LivestreamInput>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  const [isMounted, setIsMounted] = useState(false)
  const { posterUrl, setPosterUrl } = useEventStore((state) => state)
  const { isMobile, signerAddress } = useLayoutStore()
  let [isOpen, setIsOpen] = useState(false)
  const [eventID, setEventId] = useState<string>()
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    console.log('onchecked?', isChecked)

    setIsChecked(!isChecked);
  };

  const onSubmit: SubmitHandler<LivestreamInput> = async (data) => {
    const event = {
      title: data.title,
      address: signerAddress as string,
      ownerAddress: signerAddress as string,
      organizer: data.organizer,
      artist: data.artist,
      isOnline: true,
      website: data.website,
      social: data.social,
      posterURL: posterUrl ? posterUrl : '',
      startDate: data.startDate,
      description: data.description,
    }

    const response = await createEvent(event).then((event) => {
      if (event !== undefined) {
        setEventId(event.id!)
        setIsOpen(true)
        console.log('form set open check:', event)
        return event
      }
      console.log('form set open check:', event)
    })

    //TODO: Date and time formatter
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
                <label className="mb-1 self-start"> Artwork<span className={'text-red-600'}>*</span> </label>
                <SingleImageUpload
                  id={'livestream-poster'}
                  alt={'upload image'}
                  name={'posterUrl'}
                />
              </div>
              <div>

                <label className="mb-4"> Memory Card

                  <Popup
                    trigger={open => (
                      <img alt={'info-circle'} className={'cursor-pointer m-1'} src={'/info-circled.svg'}/>
                    )}
                    on={'hover'}
                    position="right center"
                    closeOnDocumentClick
                  >
                    <div className={'bg-[#12002C] w-48 p-4 rounded-md border-[#7DD934] border-solid'}>
                      <p className={'text-sm'}><span className={'text-[#B999FA] '}> Memory Cards: </span> an (erc-1155) NFT that provides miners access to their livestreams and rewards.</p>
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
                <label htmlFor="song title"> Title<span className={'text-red-600'}>*</span> </label>
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
                  Organizer<span className={'text-red-600'}>*</span>{' '}
                </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('organizer', { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="artist"> Featured Artist<span className={'text-red-600'}>*</span> </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('artist', { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="website"> Website </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                  {...register('website')}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="social"> Social </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
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
                <label htmlFor="startPrice"> Starting Price<span className={'text-red-600'}>*</span> </label>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  placeholder="ETH"
                  min={0}
                  defaultValue={0}
                  type={'number'}
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
                    defaultValue=""
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
                    defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue="feels like summer"
                  className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                  {...register('description')}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.titleRequired && <span>This field is required</span>}
              <SuccessEventModal isOpen={isOpen} eventId={eventID} />
              <input
                type="submit"
                className="bg-[#5971ED] border-transparent h-12 rounded-lg font-mono font-bold text-lg"
              />
            </div>
          ) : (
            <div className="flex">
              <div className="flex flex-col space-y-8 basis-1/2 mr-24">
                <div className="flex flex-col">
                  <label htmlFor="song title"> Title<span className={'text-red-600'}>*</span> </label>
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
                    Organizer<span className={'text-red-600'}>*</span>
                  </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('organizer')}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="artist"> Featured Artist<span className={'text-red-600'}>*</span> </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('artist')}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="website"> Website </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('website')}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="social"> Social </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    defaultValue=""
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
                  <label htmlFor="starting entry price"> Starting Entry Price<span className={'text-red-600'}>*</span> </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    placeholder="ETH"
                    min={0}
                    type={'number'}
                    step={0.0001}
                    disabled={isChecked}
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
                    defaultValue=""
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
                    defaultValue=""
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
                    defaultValue=""
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
                    defaultValue=""
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
                    className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                    {...register('description')}
                  />
                </div>

                {/* errors will return when field validation fails  */}
                {errors.titleRequired && <span>This field is required</span>}
                <SuccessEventModal isOpen={isOpen} eventId={eventID} />

                <input
                  type="submit"
                  className="bg-[#5971ED] border-transparent h-12 rounded-lg font-mono font-bold text-lg"
                />
              </div>

              <div className="flex flex-col space-y-12 ">
                <div>
                  <label className="mb-4"> Artwork<span className={'text-red-600'}>*</span> </label>
                  <SingleImageUpload
                    id={'livestream-poster'}
                    alt={'upload image'}
                    name={'posterUrl'}
                  />
                </div>
                <div>

                  <label className="mb-4"> Memory Card

                    <Popup
                      trigger={open => (
                        <img alt={'info-circle'} className={'cursor-pointer m-1'} src={'/info-circled.svg'}/>
                      )}
                      on={'hover'}
                      position="right center"
                      closeOnDocumentClick
                    >
                      <div className={'bg-[#12002C] w-48 p-4 rounded-md border-[#7DD934] border-solid'}>
                        <p className={'text-sm'}><span className={'text-[#B999FA] '}> Memory Cards: </span> an (erc-1155) NFT that provides miners access to their livestreams and rewards.</p>
                      </div>
                    </Popup>
                    </label>
                  <div className={'w-full h-full bg-black/50 border-solid border-[#7DD934] rounded-md  mt-4 items-center flex'}>
                  <MemoryCardUpload
                    id={'livestream-poster'}
                    alt={'upload image'}
                    name={'posterUrl'}
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
