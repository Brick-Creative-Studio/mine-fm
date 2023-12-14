import React, { useEffect, useState } from "react";
import { useLayoutStore, useEventStore } from 'stores'
import useStore from "../../../../stores/useStore";
import { useIsMounted} from "../../../../hooks/useMounted";
import Image from "next/future/image";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../../../packages/ipfs-service";
import formatAddress from "../../../../utils/formatAddress";
import { MINE_ADMIN_EOA } from "../../../../constants/addresses";
import { BigNumber, BytesLike, ethers } from "ethers";
import updateEvent from "../../../../data/rest/updateEvent";
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
  const eventStore = useStore( useEventStore, (state) => state)
  const startTime = eventStore ? new Date(`${eventStore.startDate} ${eventStore.startTime}`).toLocaleDateString() + " " + new Date(`${eventStore.startDate} ${eventStore.startTime}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : ''
  const endTime =  eventStore ? new Date(`${eventStore.endDate} ${eventStore.endTime}`).toLocaleDateString() + " " + new Date(`${eventStore.endDate} ${eventStore.endTime}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : ''
  const [splitAddress, setSplitAddress] = useState<string | undefined>(undefined)
  const formattedAddress = formatAddress(eventStore?.ownerAddress!)
  const TOKEN_URI = 'https://goerli.basescan.org/address/0x454fd3973a8e532258bd132ae5c696ac2faae180#code'

  //create treasury split contract
  const { data,
    settled: splitSettled,
    isLoading: splitLoading,
    txData: splitTxData,
    write: writeSplit,
    isSuccess: splitSuccess  } = useCreateSplit(eventStore?.ownerAddress as `0x${string}`)

  useEffect(() => {
    if (isMounted && eventStore){
    } else {
      return
    }
  },[eventStore])

  //create 1155 contract
  const {
    settled: tokenContractSettled,
    isLoading: tokenIsLoading,
    txData: tokenTxData,
    write: tokenWrite,
    isSuccess: tokenSuccess  } = useCreateEventContract(
    {
      tokenURI: TOKEN_URI,
      createReferral: MINE_ADMIN_EOA,
      saleStart: eventStore ? new Date(`${eventStore?.startDate} ${eventStore?.startTime}`).getTime() : 0,
      saleEnd: eventStore ? new Date(`${eventStore?.endDate} ${eventStore?.endTime}`).getTime() : 0,
      basePrice: eventStore?.startingPrice ? eventStore?.startingPrice : "0.00",
      splitAddress: splitAddress as `0x${string}`,
      ownerAddress: eventStore?.ownerAddress as `0x${string}`
    })



  useEffect(() => {
    if (splitSuccess && splitSettled){
      setSplitAddress(ethers.utils.hexStripZeros(splitTxData?.logs[0].topics[1]!).toString())
      eventStore?.setSplitAddress(ethers.utils.hexStripZeros(splitTxData?.logs[0].topics[1]!).toString())
    }

  }, [splitTxData, splitSettled, splitSuccess])

  useEffect(() => {
    if(tokenSuccess && tokenContractSettled){
      //TODO: Update event
      console.log('token tx data', tokenTxData?.logs[0].address)
      eventStore?.setTokenAddress(tokenTxData?.logs[0].address!)

       updateEvent({
        id: eventStore?.id,
        tokenAddress: tokenTxData?.logs[0].address!,
        splitAddress: splitAddress,
        memoryCard: getFetchableUrl(eventStore?.memoryCardURL)
      }).then(() => {

        router?.push(`/explore?tab=livestream`)

       })
    }

  }, [tokenSuccess, tokenTxData])


  return !isMounted ? null : (
    <div className={'mx-auto mt-32 w-fit'}>
      <h2> Deploy your Event to Base Chain  </h2>
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md h-full'}>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Title: </p>
          <p className={'text-lg'}> { eventStore?.title }</p>
        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Owner Address: </p>
          <p className={'text-lg text-ellipsis overflow-hidden'}> { formattedAddress }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Organizer: </p>
          <p className={'text-lg'}> { eventStore?.organizer }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Artist: </p>
          <p className={'text-lg'}> { eventStore?.artist }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Initial Price: </p>
          <p className={'text-lg'}> { eventStore?.startingPrice }</p>

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
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventStore?.website}`}>{eventStore?.website}</a></p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Social: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventStore?.social}`}>{eventStore?.social}</a></p>
        </div>


        <div  className={'flex justify-between'}>
          <p className={'text-lg '}>Description:  </p>
          <p className={'text-lg'}> { eventStore?.description  }</p>

        </div>

        <div className={'h-0.5 bg-white w-full mt-0 mb-4 pt-0'}/>
        <div  className={'flex justify-between relative'}>

          <div className={'flex-col items-center justify-center'}>
            <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}> Poster Image </p>
            <div className={'w-64 h-64 relative'}>
              <Image
                src={getFetchableUrl(eventStore?.posterUrl)!!}
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
                src={getFetchableUrl(eventStore?.memoryCardURL)!!}
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
        onClick={() => splitAddress ?  tokenWrite?.() : writeSplit?.()}
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

