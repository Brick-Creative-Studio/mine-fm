import React, { useEffect, useState } from "react";
import { useLayoutStore, useEventStore } from 'stores'
import useStore from "../../../../stores/useStore";
import { useIsMounted} from "../../../../hooks/useMounted";
import Image from "next/future/image";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../../../packages/ipfs-service";
import formatAddress from "../../../../utils/formatAddress";
import { BytesLike, ethers } from "ethers";
import createToken from "../../../../data/contract/requests/createToken";
import createEvent from "../../../../data/rest/createEvent";
import { Event } from '../../../../types/Event'
import useCreateSplit from "../../../../data/contract/requests/useCreateSplit";
import { useRouter } from "next/router";
import { useCreateEventContract } from "../../../../data/contract/requests/useCreateEventContract";


export default function ConfirmPage({ tokenURI, createReferral, saleStart, saleEnd, basePrice }: {
  tokenURI: string;
  createReferral: string;
  saleStart: number;
  saleEnd: number;
  basePrice: number
}) {
  const isMounted = useIsMounted()
  const router = useRouter();
  const [metaURL, setMetaURL] = useState<string | undefined>(undefined)
  const state = useStore( useEventStore, (state) => state)
  const startTime = state ? new Date(`${state.startDate} ${state.startTime}`).toLocaleDateString() + " " + new Date(`${state.startDate} ${state.startTime}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : ''
  const endTime =  state ? new Date(`${state.endDate} ${state.endTime}`).toLocaleDateString() + " " + new Date(`${state.endDate} ${state.endTime}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }) : ''
  const [splitAddress, setSplit] = useState<string>('')
  const formattedAddress = formatAddress(state?.ownerAddress!)
  const { data,
    settled,
    isLoading,
    txData,
    write,
    isSuccess  } = useCreateSplit(state?.ownerAddress as `0x${string}`)
  const startTimestamp =  new Date(`${state?.startDate} ${state?.startTime}`).getDate();
  const endTimestamp = new Date(`${state?.startDate} ${state?.startTime}`).getDate()
  console.log('start timestamp', startTimestamp)
  console.log('end timestamp', endTimestamp)
  const splitArgs = {
    recipients: [
      {
        address: "0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2",
        percentAllocation: 50.0000
      },
      {
        address: "0x364D9b4449331888913D80F52592394c60A155eC",
        percentAllocation: 50.0000
      }
    ],
    distributorFeePercent: 0,
    controller: "0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2"
  }
  const { settled: contractSettled,
    isLoading: ctIsLoading,
    txData: ctTxData,
    write: ctWrite,
    isSuccess: ctIsSuccess  } = useCreateEventContract(
      {
        tokenURI: '',
        createReferral: '0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2' as `0x${string}`,
        saleEnd: 1691125522,
        saleStart: 1796664206,
        basePrice: 0.005,
        splitAddress: '0x236796BF9Ec88Fd7b1F33e06226579029EC5BAFe' as `0x${string}`

      })

  // const {data
  //   ,
  //   txData,
  //   settled,
  //   write,
  //   isSuccess,
  //   isLoading} = useCreateEventContract({
  //   tokenURI: metaURL!,
  //   createReferral: '0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2' ,
  //   saleStart: 1701661197,
  //   saleEnd: 1701661197,
  //   basePrice: 0.001
  //   })



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

    if(url){
      setMetaURL(url);
    }

  }

  // async function createSplitContract(){
  //   const splitResponse = await useCreateSplit(splitArgs).then(() => {
  //     console.log('deploy splits txhash:', txHash);
  //     console.log('deploy splits status:', status);
  //     console.log('deploy splits response:', splitResponse);
  //   })
  //
  //
  // }


  useEffect(() => {
    if (isMounted && state){
    } else {
      return
    }
  },[state])

  useEffect(() => {
    if (txData && settled){
      console.log('deploy splits txdata:', txData?.logs[0].topics[1]);
      console.log('deploy splits address:', ethers.utils.hexStripZeros(txData?.logs[0].topics[1] as BytesLike));
      setSplit(ethers.utils.hexStripZeros(txData?.logs[0].topics[1]!).toString())
      console.log('deploy splits response:', data);
    }

  }, [txData, settled])

  // useEffect(() => {
  //
  //   async function eventUpload(){
  //     const event = {
  //       address: "",
  //       artist: state?.artist,
  //       description: state?.description,
  //       endDate: new Date(endTime),
  //       isFree: false,
  //       isOnline: true,
  //       organizer: state?.organizer,
  //       ownerAddress: state?.ownerAddress,
  //       posterURL: state?.posterUrl,
  //       startDate: new Date(startTime),
  //       startingPrice: state?.startingPrice,
  //       title: state?.title
  //
  //     }
  //     return await createEvent(event).then((event) => {
  //       if (event !== undefined) {
  //         router?.push(`/explore?tab=livestream`)
  //
  //       }
  //       console.log('form set open check:', event)
  //     })
  //   }
  //
  //   if(txData){
  //     console.log('tx data', txData)
  //       eventUpload()
  //   }
  //
  // }, [txData])

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
        // onClick={() => metaURL ?  ctWrite?.() : write?.()}
        onClick={() => ctWrite?.()}

      >
        {
          metaURL ? (
              <p> Put Onchain (2/2) </p>

            ) :
            (
              <p> Upload Metadata (1/2) </p>
            )
        }
      </button>



    </div>
  )
}

