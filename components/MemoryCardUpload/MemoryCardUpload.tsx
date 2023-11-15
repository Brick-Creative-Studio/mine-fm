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
  const { generatedImage, canvas, gatherImages } = useMemCardPreview()

  const [cardArt, setCardArt] = React.useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    if(memoryCardFile?.type?.length){
      console.log('useEffect triggered: running memPreview hook', generatedImage[0])
      gatherImages(memoryCardFile)
      // generateStackedImage()
      setIsUploading(true)
    }
  }, [memoryCardFile])

  useEffect(() => {
    if(generatedImage?.length){
      console.log('generated image is not null', generatedImage)
      setCardArt(generatedImage[0])
    }
  }, [generatedImage[0]])


  return (
    <div
      className={
        'flex flex-col justify-center items-center  w-96 h-96 relative cursor-pointer rounded-md'
      }
    >
      {isUploading && (
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="24 24 24 24" />
      )}

      {cardArt ?  (

        <>
        <img alt={'memory card'} height={'100%'} width={'100%'} src={generatedImage[0]}/>
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
