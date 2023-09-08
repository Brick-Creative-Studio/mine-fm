import React, { BaseSyntheticEvent } from 'react'


export interface UseArtworkPreviewProps {
  image?: File
}

/*
  - user clicks upload then we call useMemCard hook and supply local file as argument
  - we take local file and create an array of our three image files (background, memory card frame, uploaded poster)
  - convert files to JS Image objects then initalize 2d canvas, load images then draw each image onto the canvas
  - once drawing is complete save canvas to blob setState value generatedImages
  - finally return generateStackedImage, imagesToDraw, generatedImages, canvas
 */


export const useMemCardPreview = ({ image }: UseArtworkPreviewProps) => {

  const canvas = React.useRef(null)
  const [generatedImages, setGeneratedImages] = React.useState<any[]>([])
  const [isInit, setIsInit] = React.useState<boolean>(true)
  /*

   create array of Image objects from blob for canvas

 */

  const imagesToDraw = React.useMemo(() => {
    const background = new Image()
    let cardFrame = new Image();
    let stickerImg = new Image()


    background.src = '/memory-cards/bg-cool.png';
    cardFrame.src = '/memory-cards/card-frame.png';
    stickerImg.src = image?.name!

    return [background, cardFrame, stickerImg];

  }, [image])

  const generateStackedImage = React.useCallback(
    async (e?: BaseSyntheticEvent) => {
      try {
        if (e) e.stopPropagation()
        if (!imagesToDraw || !canvas.current) return

          const _canvas: HTMLCanvasElement = canvas.current
          const ctx = _canvas?.getContext('2d')
          const generate = () => {
            _canvas.height = imagesToDraw[0].naturalHeight
            _canvas.width = imagesToDraw[0].naturalWidth

            for (let i = 0; i < imagesToDraw.length; i++) {
              ctx?.drawImage(imagesToDraw[i], 0, 0)
            }

            canvasToBlob(_canvas, imagesToDraw)
          }

          if (isInit) {
            imagesToDraw[0].onload = function () {
              generate()
              setIsInit(false)
            }
          } else {
            generate()
          }

      } catch (err) {
        console.log('err', err)
      }
    },
    [imagesToDraw, canvas, isInit]
  )

  /*

    save blob of stacked image to store
    memory cleanup for saved image

 */
  const canvasToBlob = React.useCallback(
    (canvas: HTMLCanvasElement, stack: HTMLImageElement[] | undefined = []) => {
      if (canvas.height > 0) {
        const data = canvas.toDataURL()

        setGeneratedImages([data, ...generatedImages])
        for (const blob of stack) {
          URL.revokeObjectURL(blob.src)
        }
      }
    },
    [generatedImages]
  )

  return { generateStackedImage, imagesToDraw, generatedImages, canvas }

}
