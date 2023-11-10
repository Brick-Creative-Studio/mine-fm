import React, { BaseSyntheticEvent } from 'react'


export interface UseArtworkPreviewProps {
  image?: File | null
}

/*
  - user clicks upload then we call useMemCard hook and supply local file as argument
  - we take local file and create an array of our three image files (background, memory card frame, uploaded poster)
  - convert files to JS Image objects then initalize 2d canvas, load images then draw each image onto the canvas
  - once drawing is complete save canvas to blob setState value generatedImages
  - finally return generateStackedImage, imagesToDraw, generatedImages, canvas
 */


export const useMemCardPreview = ({ image } : UseArtworkPreviewProps) => {

  const canvas = React.useRef(null)
  const [generatedImages, setGeneratedImages] = React.useState<any[]>([])
  const [isInit, setIsInit] = React.useState<boolean>(true)
  /*

   create array of Image objects from blob for canvas

 */

  const imagesToDraw = () => {
    const mcBackdrop = new Image();
    const stickerFrame = new Image();
    const stickerImg = new Image()


    mcBackdrop.src = '/memory-cards/card-frame.png';
    // imgFrame.src = '/memory-cards/MINEcard2.0_STICKER_01.png';
    stickerFrame.src = '/memory-cards/bg-cool.png';
    // stickerImg.src = '/stock/stonie-test-poster.jpeg'
    // stickerImg.src = '/stock/wd-mj-2.png';
    // stickerImg.src = '/stock/mood-3-alt-cover.jpeg'

    // stickerImg.src = image?.name!
    // stickerImg.src = '/memory-cards/MINEcard2.0_STICKER_01.png

    // return [background, cardFrame, stickerImg];

    return [mcBackdrop, stickerFrame, stickerImg];
  }

  const generateStackedImage = React.useCallback(
    async () => {
      try {
        if (!imagesToDraw || !canvas.current) return

        // const blob = URL.createObjectURL(stickerFile)

        // console.log('sticker load running')
        // let data = await fetch(`https://localhost:3000 ${blob}`).then(r => r.blob());

        // const url = new URL('https://localhost:3000')
        // url.searchParams.append('images', encodeURI(blob))
        // const response = await fetch(url.href, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // })
        // const data = await response.json()
        // let data = await fetch(blob).then(r => r.blob());
        // console.log('fetched blob data',data)
        // imagesToDraw()[2].src = blob


        // assign ug file to image src
        // const reader = new FileReader();
        // convert file to a base64 url
        const readURL = (file: File) => {
          return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target?.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
          });
        };




        // console.log('memory name888', url)
        // imagesToDraw()[2].src = url as string
        // console.log('memory name9999', imagesToDraw()[2].src)

          const _canvas: HTMLCanvasElement = canvas.current
          const ctx = _canvas?.getContext('2d')
          const generate = () => {

            _canvas.height = imagesToDraw()[0].naturalHeight
            _canvas.width = imagesToDraw()[0].naturalWidth
              ctx?.drawImage(imagesToDraw()[0], 0, 0, 1500, 1500)
            ctx?.drawImage(imagesToDraw()[1], 315, 452, 865, 860)
            ctx?.drawImage(imagesToDraw()[2], 325, 460, 845, 845)

            canvasToBlob(_canvas, imagesToDraw())
          }

            imagesToDraw()[2].onload = function () {


              generate()
              // setIsInit(false)
            }

          const url = await readURL(image!);
          imagesToDraw()[2].src = url as string

        // generate()

        // imagesToDraw()[2].onload = function () {
        //   generate()
        //   // setIsInit(false)
        // }

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
