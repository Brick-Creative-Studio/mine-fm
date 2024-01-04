import React, { useEffect, useState } from "react";
import { useLayoutStore, useEventStore } from 'stores'
import useStore from "../../../../../stores/useStore";
import { useIsMounted} from "../../../../../hooks/useMounted";
import Image from "next/future/image";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../../../../packages/ipfs-service";
import formatAddress from "../../../../../utils/formatAddress";
import { MINE_ADMIN_EOA } from "../../../../../constants/addresses";
import { BigNumber, BytesLike, ethers } from "ethers";
import updateEvent from "../../../../../data/rest/updateEvent";
import useCreateSplit from "../../../../../data/contract/requests/useCreateSplit";
import { useRouter } from "next/router";
import { BONDING_CURVE_V3_GB } from "../../../../../constants/addresses";
import { useCreateEventContract } from "../../../../../data/contract/requests/useCreateEventContract";
import { GetServerSideProps } from "next";
import { Event } from "../../../../../types/Event";
import axios from "axios";


interface Props {
  eventInfo: Event
}

export default function DeployEventPage({ eventInfo }: Props) {

  const isMounted = useIsMounted()
  const router = useRouter();
  const [metaURL, setMetaURL] = useState<string | undefined>(undefined)
  const eventStore = useStore( useEventStore, (state) => state)
  const startTime =  new Date(`${eventInfo.startDate}`).toLocaleDateString() + " " + new Date(`${eventInfo.startDate}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const endTime = new Date(`${eventInfo.endDate}`).toLocaleDateString() + " " + new Date(`${eventInfo.endDate}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const [splitAddress, setSplitAddress] = useState<string | undefined>(undefined)
  const formattedAddress = formatAddress(eventInfo.ownerAddress!)
  const TOKEN_URI = 'https://goerli.basescan.org/address/0x454fd3973a8e532258bd132ae5c696ac2faae180#code'
  const BASE_FEE = "0.001";

  //create treasury split contract
  const { data,
    settled: splitSettled,
    isLoading: splitLoading,
    txData: splitTxData,
    write: writeSplit,
    isSuccess: splitSuccess  } = useCreateSplit(eventInfo.ownerAddress as `0x${string}`)

  useEffect(() => {
    if (isMounted && eventInfo){
    } else {
      return
    }
  },[eventInfo])

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
      saleStart: new Date(`${eventInfo.startDate}`).getTime() / 1000,
      saleEnd: new Date(`${eventInfo.endDate}`).getTime() / 1000,
      initialPrice: eventInfo.startingPrice!,
      basePrice: BASE_FEE,
      splitAddress: splitAddress as `0x${string}`,
      ownerAddress: eventInfo.ownerAddress as `0x${string}`,
      tokenName: eventInfo.title
    })



  useEffect(() => {
    if (splitSuccess && splitSettled){
      setSplitAddress(ethers.utils.hexStripZeros(splitTxData?.logs[0].topics[1]!).toString())
      eventStore?.setSplitAddress(ethers.utils.hexStripZeros(splitTxData?.logs[0].topics[1]!).toString())
    }
    console.log('split data', data)

  }, [splitTxData, splitSettled, splitSuccess])

  useEffect(() => {
    if(tokenSuccess && tokenContractSettled){
      //TODO: Update event
      console.log('token tx data', tokenTxData?.logs[0].address)
      eventStore?.setTokenAddress(tokenTxData?.logs[0].address!)

       updateEvent({
        id: eventInfo.id,
        tokenAddress: tokenTxData?.logs[0].address!,
        splitAddress: splitAddress,
        memoryCard: getFetchableUrl(eventInfo?.memoryCard),
        minterContract: BONDING_CURVE_V3_GB,
        tokenId: 1,
        isApproved: true
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
          <p className={'text-lg'}> { eventInfo?.title }</p>
        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Owner Address: </p>
          <p className={'text-lg text-ellipsis overflow-hidden'}> { formattedAddress }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Organizer: </p>
          <p className={'text-lg'}> { eventInfo?.organizer }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Artist: </p>
          <p className={'text-lg'}> { eventInfo?.artist }</p>

        </div>

        <div  className={'flex justify-between'}>
          <p className={'text-lg'}>Initial Price: </p>
          <p className={'text-lg'}> { eventInfo?.startingPrice }</p>

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
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventInfo.website!}`}>{eventInfo.website}</a></p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Social: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventInfo.social}`}>{eventInfo?.social}</a></p>
        </div>


        <div  className={'flex justify-between'}>
          <p className={'text-lg '}>Description:  </p>
          <p className={'text-lg'}> { eventInfo?.description  }</p>

        </div>

        <div className={'h-0.5 bg-white w-full mt-0 mb-4 pt-0'}/>
        <div  className={'flex justify-between relative'}>

          <div className={'flex-col items-center justify-center'}>
            <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}> Poster Image </p>
            <div className={'w-64 h-64 relative'}>
              <Image
                src={getFetchableUrl(eventInfo.posterURL)!}
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
                src={getFetchableUrl(eventInfo?.memoryCard)!}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const eventID = params?.id?.toString()
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint

  const eventInfo: Event | null = eventID
    ? await axios
      .post(eventURL, {
        id: eventID,
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error fetching event info', error)
      })
    : null

  if (!eventID) {
    return {
      notFound: true,
    }
  }

  if (!eventInfo) {
    return {
      notFound: true,
    }
  }



  const props: Props = {
    eventInfo,
  }
  return {
    props,
  }
}

