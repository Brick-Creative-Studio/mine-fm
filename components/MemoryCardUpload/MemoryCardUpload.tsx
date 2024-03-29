import { useEventStore } from "../../stores";
import React, { ReactElement, useEffect, useState } from 'react'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'packages/ipfs-service'
import { useMemCardPreview } from "../../hooks/useMemCardPreview";


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
  const { posterUrl, memoryCardFile, setCardUrl } = useEventStore((state) => state)
  const { generatedImage, canvas, gatherImages, isLoading } = useMemCardPreview()
  const [fileUrl, updateFileUrl] = useState('')
  const [cardArt, setCardArt] = React.useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    if(memoryCardFile?.type?.length){
      gatherImages(memoryCardFile)
    }
  }, [memoryCardFile])

  useEffect(() => {
    async function uploader(){
      await handleFileUpload(generatedImage[0])
    }

    if(generatedImage?.length){
      setCardArt(generatedImage[0])
      setIsUploading(true)

      uploader()
    }
  }, [generatedImage[0]])

  const handleFileUpload = React.useCallback(
    async (base64_Memory: string | null) => {
      if(!base64_Memory) return

      const binaryString = atob(base64_Memory.split(',')[1])
      const binaryArray = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([binaryArray], { type: 'application/octet-stream' });
      const memoryCardFile = new File([blob], 'memory-card-img'); // Specify the desired filename

      // Now 'file' contains the file created from the Base64 string
      const { cid } = await uploadFile(memoryCardFile, { cache: true })

      const url = normalizeIPFSUrl(cid)?.toString()

      //set ipfs url for memorycard in event store
      if (url) {
        setCardUrl(url)
        setIsUploading(false)

      }

    }, []
  )
  return (
    <div
      className={
        'flex flex-col justify-center items-center  w-96 h-96 relative cursor-pointer rounded-md'
      }
    >
      {isUploading ? (
        <img src={'/spinner-48.png'} alt={'loading icon'} className={'animate-spin border-none w-12 h-12'}/>
      ) :

      cardArt ?  (
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
