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
import createToken from '../../../../data/contract/requests/createToken'
import createEvent from '../../../../data/rest/createEvent'
import { Event } from '../../../../types/Event'
import useCreateSplit from '../../../../data/contract/requests/useCreateSplit'
import { useRouter } from 'next/router'
import { useCreateEventContract } from '../../../../data/contract/requests/useCreateEventContract'
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
  const [metaURL, setMetaURL] = useState<string | undefined>(undefined)
  const state = useStore(useEventStore, (state) => state)
  const [eventData, setEventData] = useState<Event | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const startTime = state
    ? new Date(`${state.startDate} ${state.startTime}`).toLocaleDateString() +
      ' ' +
      new Date(`${state.startDate} ${state.startTime}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''
  const endTime = state
    ? new Date(`${state.endDate} ${state.endTime}`).toLocaleDateString() +
      ' ' +
      new Date(`${state.endDate} ${state.endTime}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''
  const [promptOpen, setPrompt] = useState<boolean>(false)

  const formattedAddress = formatAddress(state?.ownerAddress!)
  console.log(state?.posterUrl)

  async function eventUpload() {
    const event = {
      address: '',
      artist: state?.artist,
      description: state?.description,
      isFree: false,
      isOnline: true,
      organizer: state?.organizer,
      ownerAddress: state?.ownerAddress,
      posterURL: state?.posterUrl,
      startDate: new Date(startTime),
      startingPrice: state?.startingPrice,
      endDate: new Date(endTime),
      title: state?.title,
      website: state?.website,
      social: state?.social,
      metadata: metaURL,
    }
    return await createEvent(event).then((event) => {
      if (event !== undefined) {
        // router?.push(`/explore?tab=livestream`)
        setIsLoading(false)
        setPrompt(true)
      }
      console.log('form set open check:', event)
    })
  }

  async function uploadMetaData() {
    setIsLoading(true)
    const meta = {
      title: state?.title,
      description: state?.description,
      image: state?.memoryCardURL,
      attributes: [
        {
          trait_type: 'posterUrl',
          value: state?.posterUrl,
        },
      ],
    }

    const metaJSON = JSON.stringify(meta, null, 2)
    const blob = new Blob([metaJSON], { type: 'application/json' })
    const metaDataFile = new File([blob], `${state?.title}.json`) // Specify the desired filename

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
    if (isMounted && state) {
    } else {
      return
    }
  }, [state])

  return !isMounted ? null : (
    <div className={'mx-auto mt-32 w-fit'}>
      <h2>Confirm Livestream Info </h2>
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md h-full'}>
        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Title: </p>
          <p className={'text-lg'}> {state?.title}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Owner Address: </p>
          <p className={'text-lg text-ellipsis overflow-hidden'}> {formattedAddress}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Organizer: </p>
          <p className={'text-lg'}> {state?.organizer}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Artist: </p>
          <p className={'text-lg'}> {state?.artist}</p>
        </div>

        <div className={'flex justify-between'}>
          <p className={'text-lg'}>Initial Price: </p>
          <p className={'text-lg'}> {state?.startingPrice}</p>
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
          <p className={'text-lg '}>Description: </p>
          <p className={'text-lg'}> {state?.description}</p>
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
                src={getFetchableUrl(state?.posterUrl)!!}
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
        onClick={() => uploadMetaData()}
      >
        <p> Upload Metadata and Save For Review </p>
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
                    className="text-lg font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    Event Saved!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-[#B999FA]">
                      We have two options for users to put an event onchain (which requires a gas fee):
                    </p>
                    <ol >
                      <li className=" text-white mb-4">
                        Free Deployment - requires waiting in a queue for your contracts to deployed. Can take 1-3hrs for us to deploy.
                      </li>
                      <li className="text-white mb-8">
                        Paid Deployment - skip the line for fast and immediate deployment. Usually completed in less than 5 minutes.
                      </li>
                    </ol>

                  </div>

                  <div className="mt-4 flex justify-around">
                    <Link href={`/create/stream/${eventData?.id}`}>
                      <button
                        type="button"
                        onClick={() => eventUpload()}
                        className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Paid Deployment
                      </button>
                    </Link>

                    <Link href={'/explore?tab=livestream'}>
                      <button
                        type="button"
                        onClick={() => eventUpload()}
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
