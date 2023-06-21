import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/future/image'
import styles from '../../pages/create/create-sound/styles.module.css'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'

type LivestreamInput = {
  title: string
  genres: string
  tags: [string]
  description: string
  tracklist: [string]
  posterUrl: string
  audioUrl: string
  color: string
  titleRequired: string
}

export default function LivestreamForm({}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LivestreamInput>()
  const [isMounted, setIsMounted] = useState(false)

  const [fileUrl, updateFileUrl] = useState('')

  const onSubmit: SubmitHandler<LivestreamInput> = (data) => console.log(data)

  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']

  useEffect(() => {
    setIsMounted(true)
  }, [])


  const handleFileUpload = async (_input: FileList | null) => {

    console.log("click test")
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
      const url  = normalizeIPFSUrl(cid)?.toString()
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
        <div className="flex flex-row">
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
              <label htmlFor="producer" className="">
                {' '}
                Producer{' '}
              </label>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue=""
                className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('genres')}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="writers"> Writers </label>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue=""
                className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('tags')}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="featuredArtist"> Featured Artist </label>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue=""
                className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('description')}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mixMaster"> Mix and Master </label>
              {/* register your input into the hook by invoking the "register" function */}
              <input
                defaultValue=""
                className="bg-transparent h-10 border p-2 border-solid rounded-md text-white "
                {...register('tracklist')}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description"> How Would You Describe the Song? </label>
              <p className="opacity-40 "> Description </p>

              {/* register your input into the hook by invoking the "register" function */}
              <textarea
                defaultValue="feels like summer"
                className=" bg-transparent  h-44 border p-2 border-solid  rounded-md text-white "
                {...register('posterUrl')}
              />
            </div>

            {/* errors will return when field validation fails  */}
            {errors.titleRequired && <span>This field is required</span>}

            <input
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-indigo-500 h-12 rounded-lg font-mono font-bold text-lg italic"
            />
          </div>

          <div className="flex flex-col space-y-12 ">
            <div>
              <label className='mb-4'> Artwork </label>

              <div className="flex justify-center items-center border border-solid w-96 h-96 relative cursor-pointer rounded-md border-zinc-500 mt-4">
                <label htmlFor="poster-file-input">

                  {fileUrl ? (
                      <Image
                        src={getFetchableUrl(fileUrl) || ''}
                        alt="mood-poster"
                        fill
                      />
                    ) :
                    <Image
                      src={'/plus-icon.png'}
                      alt="add-art"
                      width={42}
                      height={42}
                      className={ fileUrl.length ? 'hidden' : 'cursor-pointer'}
                    />
                  }
                </label>
                <input
                  type="file"
                  id="poster-file-input"
                  className={ fileUrl.length ? '' : 'hidden'}
                  {...register('posterUrl')}
                  onChange={(event) => {
                    handleFileUpload(event.currentTarget.files)
                  }}

                />
              </div>
            </div>


            <div className='flex flex-col justify-center items-center'>
              <label htmlFor="description"> Add a Color to Match the Mood </label>
              <div className="flex justify-center self-center mt-4 w-40 h-40">
                <input type="color" className={styles.style2} {...register('color')} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
