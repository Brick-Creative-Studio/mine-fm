// import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'
import Image from 'next/image'
import React, { ReactElement, useEffect, useState } from 'react'

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
  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

        // formik.setFieldValue(id, normalizeIPFSUrl(cid))
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
    <div >
      <div width={'100%'}>
        <div
          className={singleImageUploadWrapper}
        >
          {isUploading && <Spinner alignSelf={'center'} m={'x0'} />}

          {!isUploading && isMounted && !!value && (
            <Image
              src={getFetchableUrl(value) || ''}
              fill
              alt="Avatar"
              style={{
                objectFit: 'contain',
              }}
            />
          )}

          {!isUploading && isMounted && !value && (
            <>
              <div>
                {inputLabel}
              </div>
              <div>{helperText}</div>
            </>
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
        </div>

        {uploadArtworkError && (
          <div data-testid="error-msg" className={uploadErrorBox}>
            <div>
              <li>{uploadArtworkError.message}</li>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleImageUpload
