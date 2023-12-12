import React, { useEffect, useState } from "react";
import { useLayoutStore, useEventStore } from 'stores'
import useStore from "../../../../stores/useStore";
import { useIsMounted} from "../../../../hooks/useMounted";
import Image from "next/future/image";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../../../packages/ipfs-service";
import formatAddress from "../../../../utils/formatAddress";
import { MINE_ADMIN_EOA } from "../../../../constants/addresses";
import { BigNumber, BytesLike, ethers } from "ethers";
import createToken from "../../../../data/contract/requests/createToken";
import createEvent from "../../../../data/rest/createEvent";
import { Event } from '../../../../types/Event'
import useCreateSplit from "../../../../data/contract/requests/useCreateSplit";
import { useRouter } from "next/router";
import { useCreateEventContract } from "../../../../data/contract/requests/useCreateEventContract";


export default function DeployEventPage({ tokenURI, createReferral, saleStart, saleEnd, basePrice }: {
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
  const [splitAddress, setSplitAddress] = useState<string | undefined>(undefined)
  const formattedAddress = formatAddress(state?.ownerAddress!)
  const TOKEN_URI = 'https://goerli.basescan.org/address/0x454fd3973a8e532258bd132ae5c696ac2faae180#code'
  console.log('mount check', state?.ownerAddress)

  //create treasury split contract
  const { data,
    settled: splitSettled,
    isLoading: splitLoading,
    txData: splitTxData,
    write: writeSplit,
    isSuccess: splitSuccess  } = useCreateSplit(state?.ownerAddress as `0x${string}`)

  useEffect(() => {
    if (isMounted && state){
    } else {
      return
    }
  },[state])

  //create 1155 contract
  const {
    settled: contractSettled,
    isLoading: ctIsLoading,
    txData: ctTxData,
    write: ctWrite,
    isSuccess: ctIsSuccess  } = useCreateEventContract(
    {
      tokenURI: TOKEN_URI,
      createReferral: MINE_ADMIN_EOA,
      saleStart: state ? new Date(`${state?.startDate} ${state?.startTime}`).getTime() : 0,
      saleEnd: state ? new Date(`${state?.endDate} ${state?.endTime}`).getTime() : 0,
      basePrice: state?.startingPrice ? state?.startingPrice : "0.00",
      splitAddress: splitAddress as `0x${string}`,
      ownerAddress: state?.ownerAddress as `0x${string}`
    })



  useEffect(() => {
    if (splitSuccess && splitSettled){
      console.log('deploy splits txdata:', splitTxData?.logs[0].topics[1]);
      setSplitAddress(ethers.utils.hexStripZeros(splitTxData?.logs[0].topics[1]!).toString())
    }

  }, [splitTxData, splitSettled, splitSuccess])

  useEffect(() => {
    if(ctIsSuccess && contractSettled){
      //TODO: Update event
    }
    //         router?.push(`/explore?tab=livestream`)

  }, [])


  return !isMounted ? null : (
    <div className={'mx-auto mt-32 w-fit'}>
      <h2> Deploy your Event to Base Chain  </h2>
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


        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Website: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${state?.website}`}>{state?.website}</a></p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Social: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${state?.social}`}>{state?.social}</a></p>
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
        onClick={() => splitAddress ?  ctWrite?.() : writeSplit?.()}
        // onClick={() => ctWrite?.()}

      >
        {
          splitAddress ? (
              <p> Deploy Event Contract (2/2) </p>

            ) :
            (
              <p> Deploy Treasury (1/2) </p>
            )
        }
      </button>



    </div>
  )
}

