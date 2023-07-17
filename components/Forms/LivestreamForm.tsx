import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/future/image'
import styles from '../../pages/create/create-sound/styles.module.css'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'
import { useLayoutStore } from '../../stores'
import SingleImageUpload from '../SingleImageUpload/SingleImageUpload'

type LivestreamInput = {
  title: string
  address: string
  organizer: string
  artist: string
  mood: string
  description: string
  tracklist: string
  posterUrl: string
  audioUrl: string
  color: string
  titleRequired: string
  date: Date
  time: string
}

export default function LivestreamForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LivestreamInput>()
  const [isMounted, setIsMounted] = useState(false)

  const { isMobile } = useLayoutStore()

  const [fileUrl, updateFileUrl] = useState('')

  const onSubmit: SubmitHandler<LivestreamInput> = (data) => console.log(data)

  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFileUpload = async (_input: FileList | null) => {
    console.log('click test')
    if (!_input) return
    const input = _input[0]

    setUploadArtworkError(false)

    if (input?.type?.length && !acceptableMIME.includes(input.type)) {
      setUploadArtworkError({
        message: `Sorry, ${input.type} is an unsupported file type`,
      })
      console.log(`Sorry, ${input.type} is an unsupported file type`)

      return
    }

    try {
      setIsUploading(true)

      const { cid } = await uploadFile(_input[0], { cache: true })

      // formik.setFieldValue(id, normalizeIPFSUrl(cid))
      const url = normalizeIPFSUrl(cid)?.toString()
      updateFileUrl(url ? url : '')
      console.log('mood poster', url)
      setIsUploading(false)
      setUploadArtworkError(null)
    } catch (err: any) {
      setIsUploading(false)
      setUploadArtworkError({
        ...err,
        message: `Sorry, there was an error with our file uploading service. ${err?.message}`,
      })
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <h2> Livestream Information </h2>
        <p className="opacity-40 -mt-4"> Required* </p>
      </div>

      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          isMobile ? (

              <div className="flex flex-col space-y-8">
                <div className={'flex flex-col items-center justify-center'}>
                  <label className="mb-4 self-start"> Artwork </label>
                  <div className="flex justify-center items-center border border-solid w-48 h-48 relative cursor-pointer rounded-md border-zinc-500 mt-4">
                    <label htmlFor="poster-file-input">
                      {fileUrl ? (
                        <Image src={getFetchableUrl(fileUrl) || ''} alt="mood-poster" fill />
                      ) : (
                        <Image
                          src={'/plus-icon.png'}
                          alt="add-art"
                          width={42}
                          height={42}
                          className={fileUrl.length ? 'hidden' : 'cursor-pointer'}
                        />

                      )}
                    </label>
                    <input
                      type="file"
                      id="poster-file-input"
                      className={fileUrl.length ? '' : 'hidden'}
                      {...register('posterUrl')}
                      onChange={(event) => {
                        handleFileUpload(event.currentTarget.files)
                      }}
                    />
                  </div>
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
                  <label htmlFor="tracklist"> Tracklist </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <textarea
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('tracklist')}
                  />
                </div>
                <div >
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
                  <label htmlFor="tracklist"> Tracklist </label>
                  {/* register your input into the hook by invoking the "register" function */}
                  <textarea
                    defaultValue=""
                    className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                    {...register('tracklist')}
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

                <input
                  type="submit"
                  className="bg-[#5971ED] border-transparent h-12 rounded-lg font-mono font-bold text-lg"
                />
              </div>

              <div className="flex flex-col space-y-12 ">
                <div>
                  <label className="mb-4"> Artwork </label>
                  <SingleImageUpload id={'livestream-poster'} alt={'upload image'} name={'posterUrl'} register={register}/>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <label htmlFor="description"> Add a Color to Match the Mood </label>
                  <div className="flex justify-center self-center mt-4 w-40 h-40">
                    <input type="color" className={styles.style2} {...register('color')} />
                  </div>
                </div>
              </div>
            </div> )}

      </form>
    </div>
  )
}
