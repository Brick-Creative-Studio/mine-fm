// import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'
import Image from 'next/future/image'
import React, { ReactElement, useEffect, useState } from 'react'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'

// import { Spinner } from 'src/components/Spinner'

import {
  defaultUploadStyle,
  singleImageUploadWrapper,
  uploadErrorBox,
} from './SingleImageUpload.css'

interface SingleImageUploadProps {
  id: string
  inputLabel: string | ReactElement
  helperText: string | undefined
  value: string
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  id,
  inputLabel,
  helperText,
  value,
}) => {
  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']

  const [isMounted, setIsMounted] = useState(false)
  const [fileUrl, updateFileUrl] = useState('')

  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFileUpload = React.useCallback(
    async (_input: FileList | null) => {
      console.log('image upload clicked')
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
        {isUploading && (
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
        )}

        {!isUploading && isMounted && !!value && (
          <Image
            src={getFetchableUrl(value)!!}
            fill
            sizes="100vw"
            className="w-full h-auto"
            alt="Avatar"
          />
        )}

        <input
          className={defaultUploadStyle}
          id="file-upload"
          data-testid="file-upload"
          name="file"
          type="file"
          multiple={true}
          onChange={(event) => {
            handleFileUpload(event.currentTarget.files)
          }}
        />
    </>
  )
}

export default SingleImageUpload
