import React, { BaseSyntheticEvent, useEffect } from "react";


export interface UseArtworkPreviewProps {
  image: File | null
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
  const [generatedImage, setGeneratedImage] = React.useState<string[]>([])
  const [cardStack, setCardStack] = React.useState<HTMLImageElement[]>([])

  /*

  create 3 sets if images the first 2 to set the card backdrop and frame.
  the last one being the uploaded file from the user
  to read the image from the input upload create a file reader
  then assign the url to the img src attribute
  then set our cardStack state variable to update state.
 */
  const gatherImages = (image: File)  => {
    console.log('gatherImgs() run--img file check:',image)

    // stickerImg.src = '/stock/stonie-test-poster.jpeg'
    const readURL = (file: File) => {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target?.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
      });
    };
    async function setURL(){
      const mcBackdrop = new Image();
      const stickerFrame = new Image();
      const stickerImg = new Image();
      let arr : HTMLImageElement[] = [mcBackdrop, stickerFrame, stickerImg]
      console.log('setURL() run--img file check:',image)

      const url = image ? await readURL(image) : '';
      arr[0].src = '/memory-cards/card-frame.png';
      arr[1].src = '/memory-cards/bg-cool.png';
      // arr[2].src = '/stock/stonie-test-poster.jpeg';
      arr[2].src = url as string;

      // imgFrame.src = '/memory-cards/MINEcard2.0_STICKER_01.png';
      setCardStack(arr)
      //uggj
      // await generateStackedImage()
    }
    if(image.name){
      setURL()
    }
    // const imageSet = setURL()
  }

  /*
  * usecallback to generate the image stack on a canvas so that it fits--
  *  on top of the card frame and background
  *
  * */
  React.useEffect(() => {

      try {
        if (!cardStack[0] || !canvas.current) return
        console.log('generatedStackedImage() run')

        const _canvas: HTMLCanvasElement = canvas.current
        const ctx = _canvas?.getContext('2d')
        const generate = () => {

            console.log('img[2].src check', cardStack[2])

            _canvas.height = cardStack[0].naturalHeight
            _canvas.width = cardStack[0].naturalWidth
            ctx?.drawImage(cardStack[0], 0, 0, 1500, 1500)
            ctx?.drawImage(cardStack[1], 315, 452, 865, 860)
            ctx?.drawImage(cardStack[2], 325, 460, 845, 845)

            canvasToBlob(_canvas, cardStack)
        }

        // cardStack[0].onload = function () {
        //   generate()
        //   // setIsInit(false)
        // }
        generate()
        // generate()
      } catch (err) {
        console.log('err', err)
      }
    }, [cardStack, canvas]);
  /*
    save blob of stacked image to store
    memory cleanup for saved image
 */
  const canvasToBlob = React.useCallback(
    (canvas: HTMLCanvasElement, stack: HTMLImageElement[] | undefined = []) => {
      if (canvas.height > 0) {
        const data = canvas.toDataURL()

        setGeneratedImage([data, ...generatedImage])
        for (const blob of stack) {
          URL.revokeObjectURL(blob.src)
        }
      }
    },
    [generatedImage]
  )

  return { generatedImage, canvas, gatherImages }

}
