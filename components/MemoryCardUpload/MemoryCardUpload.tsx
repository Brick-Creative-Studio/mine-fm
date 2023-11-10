import Image from 'next/future/image'
import { useFormContext } from 'react-hook-form'
import { useEventStore } from "../../stores";
import React, { ReactElement, useEffect, useState } from 'react'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'
import { useMemCardPreview } from "../../hooks/useMemCardPreview";
// import { Spinner } from 'src/components/Spinner'

import { defaultUploadStyle } from './MemoryCardUpload.css'
import { useIsMounted } from "../../hooks/useMounted";

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
  const { posterUrl, memoryCardFile } = useEventStore((state) => state)
  const { generateStackedImage, generatedImages, canvas } = useMemCardPreview({ image: memoryCardFile })

  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    if(memoryCardFile){
      generateStackedImage()
      console.log('new stack triggered', memoryCardFile)
    }
  }, [])


  return (
    <div
      className={
        'flex flex-col justify-center items-center  w-96 h-96 relative cursor-pointer rounded-md'
      }
    >
      {isUploading && (
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="24 24 24 24" />
      )}

      {posterUrl ?  (

        <>
        <img alt={'memory card'} height={'100%'} width={'100%'} src={generatedImages[0]}/>
        <canvas ref={canvas} style={{ display: 'none' }} />
        </>
      ): (
        <>
        <img alt={'memory card'} height={'100%'} width={'100%'} src={'/memory-cards/card-frame.png'}/>
        <canvas ref={canvas} style={{ display: 'none' }} />
        </>
      )
      }



    </div>
  )
}

export default MemoryCardUpload
