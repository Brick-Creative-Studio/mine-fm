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


export const useMemCardPreview = () => {

  const canvas = React.useRef(null)
  const [generatedImages, setGeneratedImages] = React.useState<any[]>([])
  const [isInit, setIsInit] = React.useState<boolean>(true)
  /*

   create array of Image objects from blob for canvas

 */

  const imagesToDraw = () => {
    const background = new Image();
    const cardFrame = new Image();
    const stickerImg = new Image()


    background.src = '/memory-cards/card-frame.png';
    // imgFrame.src = '/memory-cards/MINEcard2.0_STICKER_01.png';
    cardFrame.src = '/memory-cards/bg-cool.png';
    stickerImg.src = '/stock/stonie-test-poster.jpeg'
    stickerImg.src = '/stock/wd-mj-2.png'
    stickerImg.src = '/stock/mood-3-alt-cover.jpeg'

    // stickerImg.src = image?.name!
    // stickerImg.src = '/memory-cards/MINEcard2.0_STICKER_01.png

    cardFrame.height = 200
    cardFrame.width = 200
    stickerImg.height = 100
    stickerImg.width = 100

    // return [background, cardFrame, stickerImg];

    return [background, cardFrame, stickerImg];
  }

  const generateStackedImage = React.useCallback(
    async (e?: BaseSyntheticEvent) => {
      try {
        if (e) e.stopPropagation()
        if (!imagesToDraw || !canvas.current) return

          const _canvas: HTMLCanvasElement = canvas.current
          const ctx = _canvas?.getContext('2d')
          const generate = () => {
            _canvas.height = imagesToDraw()[0].naturalHeight
            _canvas.width = imagesToDraw()[0].naturalWidth

              console.log('ct x', ctx?.getImageData(0, 0, 1500 , 1500))

              ctx?.drawImage(imagesToDraw()[0], 0, 0, 1500, 1500)
            ctx?.drawImage(imagesToDraw()[1], 315, 452, 865, 860)
            ctx?.drawImage(imagesToDraw()[2], 325, 460, 845, 845)


            canvasToBlob(_canvas, imagesToDraw())
          }

            imagesToDraw()[0].onload = function () {
              generate()
              // setIsInit(false)
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
