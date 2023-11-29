import React, { useEffect, useState } from "react";
import { useLayoutStore, useEventStore } from 'stores'
import useStore from "../../../../stores/useStore";
import { useIsMounted} from "../../../../hooks/useMounted";
import Image from "next/future/image";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../../../packages/ipfs-service";
import formatAddress from "../../../../utils/formatAddress";


export default function ConfirmPage() {
  const isMounted = useIsMounted()
  const state = useStore( useEventStore, (state) => state)
  const startTime = state ? new Date(`${state.startDate} ${state.startTime}`).toLocaleDateString() + " " + new Date(`${state.startDate} ${state.startTime}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : ''
  const endTime =  state ? new Date(`${state.endDate} ${state.endTime}`).toLocaleDateString() + " " + new Date(`${state.endDate} ${state.endTime}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }) : ''

  const formattedAddress = formatAddress(state?.ownerAddress!)


  // const response = await createEvent(event).then((event) => {
  //   if (event !== undefined) {
  //     setEventId(event.id!)
  //     setIsOpen(true)
  //     console.log('form set open check:', event)
  //     return event
  //   }
  //   console.log('form set open check:', event)
  // })

  async function uploadMetaData(){
    const meta = {
      title: state?.title,
      description: state?.description,
      image: state?.memoryCardURL,
      attributes: [
        {
          trait_type: "posterUrl",
          value: state?.posterUrl
        }
      ]
    }

    const metaJSON = JSON.stringify(meta, null, 2)
    const blob = new Blob([metaJSON], { type: 'application/json' });
    const metaDataFile = new File([blob], `${state?.title}.json`); // Specify the desired filename

    const { cid } = await uploadFile(metaDataFile, { cache: true })
    const url = normalizeIPFSUrl(cid)?.toString()
    console.log('Livestream Event IPFS url:', url)
  }


  useEffect(() => {
    if (isMounted && state){
    } else {
      return
    }
  },[state])

  return !isMounted ? null : (
    <div className={'mx-auto mt-32 w-fit'}>
      <h2>Confirm Livestream Info </h2>
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md h-full'}>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Title: </p>
          <p className={'text-lg'}> { state?.title }</p>
        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Owner Address: </p>
          <p className={'text-lg text-ellipsis overflow-hidden'}> { formattedAddress }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Organizer: </p>
          <p className={'text-lg'}> { state?.organizer }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Artist: </p>
          <p className={'text-lg'}> { state?.artist }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Initial Price: </p>
          <p className={'text-lg'}> { state?.startingPrice }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg mr-6'}>Start Date: </p>
          <p className={'text-lg'}> { startTime }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg mr-6'}> End Date: </p>
          <p className={'text-lg'}> { endTime }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg '}>Description:  </p>
          <p className={'text-lg'}> { state?.description  }</p>

        </div>

        <div className={'h-0.5 bg-white w-full mt-0 mb-4 pt-0'}/>
        <div  className={'flex justify-between relative'}>

        <div className={'flex-col items-center justify-center'}>
          <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}> Poster Image </p>
          <div className={'w-64 h-64 relative'}>
          <Image
            src={getFetchableUrl(state?.posterUrl)!!}
            fill
            sizes="100vw"
            className="w-full h-auto"
            alt={'poster image'}
          />
          </div>

        </div>
          <div className={'flex-col'}>
            <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}> Memory Card </p>

          <div className={'w-64 h-64 relative'}>
          <Image
            src={getFetchableUrl(state?.memoryCardURL)!!}
            fill
            sizes="100vw"
            className="w-full h-auto"
            alt={'poster image'}
          />
          </div>
          </div>

        </div>
      </div>
      <button
        className="not-italic w-full bg-black hover:bg-black/50 rounded-lg font-mono font-bold text-lg p-2 px-4 border-none cursor-pointer my-8"
        onClick={() => uploadMetaData()}
      >
        <p> Upload Metadata (1/2) </p>
      </button>



    </div>
  )
}

