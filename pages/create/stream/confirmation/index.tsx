import React, { Fragment, useEffect, useState } from 'react'
import { useLayoutStore, useEventStore } from 'stores'
import useStore from '../../../../stores/useStore'
import { useIsMounted } from '../../../../hooks/useMounted'
import Image from 'next/future/image'
import {
  getFetchableUrl,
  normalizeIPFSUrl,
  uploadFile,
} from '../../../../packages/ipfs-service'
import formatAddress from '../../../../utils/formatAddress'
import { BytesLike, ethers } from 'ethers'
import createEvent from '../../../../data/rest/createEvent'
import { Event } from '../../../../types/Event'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'

export default function ConfirmPage({
  tokenURI,
  createReferral,
  saleStart,
  saleEnd,
  basePrice,
}: {
  tokenURI: string
  createReferral: string
  saleStart: number
  saleEnd: number
  basePrice: number
}) {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [metaURL, setMetaURL] = useState<string | undefined>(undefined)
  const eventStore = useStore(useEventStore, (state) => state)
  const [eventData, setEventData] = useState<Event | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const startTime = eventStore
    ? new Date(`${eventStore.startDate} ${eventStore.startTime}`).toLocaleDateString() +
      ' ' +
      new Date(`${eventStore.startDate} ${eventStore.startTime}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''
  const endTime = eventStore
    ? new Date(`${eventStore.endDate} ${eventStore.endTime}`).toLocaleDateString() +
      ' ' +
      new Date(`${eventStore.endDate} ${eventStore.endTime}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''
  const [promptOpen, setPrompt] = useState<boolean>(false)

  const formattedAddress = formatAddress(eventStore?.ownerAddress!)
  console.log(eventStore?.posterUrl)

  async function eventUpload(isFree: boolean ) {
    const event = {
      address: '',
      artist: eventStore?.artist,
      description: eventStore?.description,
      isFree: isFree,
      isApproved: isFree,
      isOnline: true,
      organizer: eventStore?.organizer,
      ownerAddress: eventStore?.ownerAddress,
      ownerId: eventStore?.ownerId,
      posterURL: eventStore?.posterUrl,
      startDate: new Date(startTime),
      startingPrice: eventStore?.startingPrice,
      endDate: new Date(endTime),
      title: eventStore?.title,
      website: eventStore?.website,
      social: eventStore?.social,
      metadata: metaURL,
      memoryCard: eventStore?.memoryCardURL
    }
    return await createEvent(event).then((newEvent) => {
      if (newEvent !== undefined) {
        // router?.push(`/explore?tab=livestream`)
        setIsLoading(false)
        setPrompt(true)
        eventStore?.setId(newEvent.id!)
        return newEvent.id;
      }
      console.log('form set open check:', event)
    })
  }

  async function selfDeployRoute(){
    const eventID = await eventUpload(false);

    if(eventID){
      await router.push(`/create/stream/deploy/${eventID}`)
    }
    console.log('error fetching event data')
  }

  async function uploadMetaData() {
    setIsLoading(true)
    const meta = {
      title: eventStore?.title,
      description: eventStore?.description,
      image: eventStore?.memoryCardURL,
      attributes: [
        {
          trait_type: 'posterUrl',
          value: eventStore?.posterUrl,
        },
      ],
    }

    //if free skip metadata and deployment prompt
    if(eventStore?.startingPrice == "0"){
      return await eventUpload(true)
    }

    const metaJSON = JSON.stringify(meta, null, 2)
    const blob = new Blob([metaJSON], { type: 'application/json' })
    const metaDataFile = new File([blob], `${eventStore?.title}.json`) // Specify the desired filename

    const { cid } = await uploadFile(metaDataFile, { cache: true })
    const url = normalizeIPFSUrl(cid)?.toString()
    console.log('Livestream Event IPFS url:', url)


    if (url) {
      setMetaURL(url)
      setPrompt(true)

    }
  }

  function closeModal() {
    setPrompt(false)
  }

  function openModal() {
    setPrompt(true)
  }

  useEffect(() => {
    if (isMounted && eventStore) {
    } else {
      return
    }
  }, [eventStore])

  return !isMounted ? null : (
    <div className={'mx-auto mt-32 w-fit'}>
      <h2>Confirm Livestream Info </h2>
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md h-full'}>
        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Title: </p>
          <p className={'text-lg'}> {eventStore?.title}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Owner Address: </p>
          <p className={'text-lg text-ellipsis overflow-hidden'}> {formattedAddress}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Organizer: </p>
          <p className={'text-lg'}> {eventStore?.organizer}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Artist: </p>
          <p className={'text-lg'}> {eventStore?.artist}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Initial Price: </p>
          <p className={'text-lg'}> {eventStore?.startingPrice}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg mr-6'}>Start Date: </p>
          <p className={'text-lg'}> {startTime}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg mr-6'}> End Date: </p>
          <p className={'text-lg'}> {endTime}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Website: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventStore?.website}`}>{eventStore?.website}</a></p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Social: </p>
          <p className={'text-lg text-blue-300 hover:text-blue-600'}> <a target="_blank" href={`https://${eventStore?.social}`}>{eventStore?.social}</a></p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg '}>Description: </p>
          <p className={'text-lg'}> {eventStore?.description}</p>
        </div>

        <div className={'h-0.5 bg-white w-full mt-0 mb-4 pt-0'} />
        <div className={'flex justify-between relative'}>
          <div className={'flex-col items-center justify-center'}>
            <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}>
              {' '}
              Poster Image{' '}
            </p>
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
            <p className={'text-xl text-center text-[#B999FA] mx-auto mb-0'}>
              {' '}
              Memory Card{' '}
            </p>

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
        // onClick={() => metaURL ?  ctWrite?.() : write?.()}
        onClick={() => uploadMetaData()}
      >
        <p> Upload Metadata and Save </p>
      </button>

      <Transition appear show={promptOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md  transform border-solid border-[#B999FA] overflow-hidden rounded-2xl bg-[#12002C] p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="p"
                    className="text-xl font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    Event Saved!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-[#B999FA]">
                      We have two options for users to put an event onchain (which requires a gas fee):
                    </p>
                    <ol >
                      <li className=" text-white mb-4">
                        Free Deployment - requires waiting in a queue for your contracts to be deployed. Can take 1-3hrs for deployment.
                      </li>
                      <li className="text-white mb-8">
                        Paid Deployment - skip the line for fast and immediate deployment. Usually completed in less than 5 minutes.
                      </li>
                    </ol>

                  </div>

                  <div className="mt-4 flex justify-around">
                    {/*<Link href={`/create/stream/${eventData?.id}`}>*/}
                      <button
                        type="button"
                        onClick={() => selfDeployRoute()}
                        className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Paid Deployment
                      </button>
                    {/*</Link>*/}

                    <Link href={'/explore?tab=livestream'}>
                      <button
                        type="button"
                        onClick={() => eventUpload(false)}
                        className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Free Deployment
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
