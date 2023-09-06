import Image from 'next/future/image'
import { useFormContext } from 'react-hook-form'
import { useEventStore } from "../../stores";
import React, { ReactElement, useEffect, useState } from 'react'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'

// import { Spinner } from 'src/components/Spinner'

import { defaultUploadStyle } from './MemoryCardUpload.css'

interface MemoryCardUploadProps {
  id: string
  alt: string | ''
  name: string
}


type LivestreamInput = {
  posterUrl: string
  color: string
  titleRequired: string
  date: Date
  time: string
  memoryUrl: string

}

const MemoryCardUpload: React.FC<MemoryCardUploadProps> = ({ id, alt, name }) => {
  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
  const { memoryCardUrl, setMemoryUrl } = useEventStore((state) => state)
  const [fileUrl, updateFileUrl] = useState('')
  const { register, setValue, getValues } = useFormContext<LivestreamInput>() // retrieve all hook methods

  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    if(fileUrl.length > 0){
      const url = getFetchableUrl(fileUrl)
      setMemoryUrl(url!)
    }
  }, [fileUrl])

  const handleFileUpload = React.useCallback(
    async (_input: FileList | null) => {
      if (!_input) return
      const input = _input[0]

      setUploadArtworkError(false)

      if (input?.type?.length && !acceptableMIME.includes(input.type)) {
        setUploadArtworkError({
          message: `Sorry, ${input.type} is an unsupported file type`,
        })
        return
      }

      try {
        setIsUploading(true)

        const { cid } = await uploadFile(_input[0], { cache: true })

        const url = normalizeIPFSUrl(cid)?.toString()

        /** set useState values **/
        updateFileUrl(url ? url : '')
        setIsUploading(false)
        setUploadArtworkError(null)

        /** set form field value in parent **/
        // @ts-ignore
        setValue(name as string, url)

        console.log('file url:', url)
      } catch (err: any) {
        setIsUploading(false)
        setUploadArtworkError({
          ...err,
          message: `Sorry, there was an error with our file uploading service. ${err?.message}`,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div
      className={
        'flex flex-col justify-center items-center border border-solid w-96 h-96 relative cursor-pointer rounded-md border-zinc-500 mt-4'
      }
    >
      {isUploading && (
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="24 24 24 24" />
      )}

      {fileUrl &&  (

        <Image
          src={getFetchableUrl(fileUrl)!!}
          fill
          sizes="100vw"
          className="w-full h-auto"
          alt={alt}
        />
      )}

      <input
        className={'hidden'}
        id="file-upload"
        data-testid="file-upload"
        type="file"

        multiple={false}
        // @ts-ignore
        {...register(name as string)}
        onChange={(event) => {
          handleFileUpload(event.currentTarget.files)
        }}
      />
      <label htmlFor="file-upload">
        <Image
          src={'/plus-icon.png'}
          alt="add-art"
          width={42}
          height={42}
          className={'cursor-pointer'}
        />
      </label>
      <p> Choose File </p>
    </div>
  )
}

export default MemoryCardUpload
