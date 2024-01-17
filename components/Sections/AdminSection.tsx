import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from 'next/router'
import endStream from "../../data/rest/endStream";
import updateSplit from "../../data/contract/requests/updateSplit";
import { Rsvp } from "../../types/Rsvp";
import { RsvpStat } from "../../types/RsvpStat";
import updateEvent from "../../data/rest/updateEvent";
import calculateSplit from "../../utils/calculateSplit";
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from "../../packages/ipfs-service";
import getUserBy from "../../data/rest/getUserBy";
import { Event } from "../../types/Event";
import { MINE_ADMIN_EOA } from "../../constants/addresses";
interface Props {
  event: Event,
  splitAddress: `0x${string}`,
  treasurySum: number | null
}

export default function AdminSection({ event, splitAddress, treasurySum  }: Props) {

  const [ promptOpen, setPrompt] = useState<boolean>(false);
  const router = useRouter()

  const [splitReady, setSplitReady] = useState<boolean>(false)
  const [ rosterData, setRosterData] = useState<Rsvp[]>([])
  const { data,
    isLoading,
    isSuccess,
    write,
    txData, } = updateSplit(splitAddress, rosterData)

  function closeExitModal() {
    setPrompt(false)
  }

  async function endEvent(eventID: string){

    const owner = await getUserBy(event.ownerAddress!)

    const rsvpStats: RsvpStat[] = [{
      userId: '9134100c-2f83-4d57-911f-b492f735d83b',
      walletAddress: MINE_ADMIN_EOA,
      percentageSplit: 100000,
    }, {
      userId: owner?.id!,
      walletAddress: event.ownerAddress!,
      percentageSplit: 500000,
    }]

     const results = await endStream(eventID)


    if(results){
      for (let i = 0; i < results.length; i++) {
          rsvpStats.push({
            userId: results[i].userID,
            walletAddress: results[i].walletAddress,
            percentageSplit: calculateSplit(results[i].weight, treasurySum!),
          })
      }
      const rsvpMeta = JSON.stringify(rsvpStats, null, 2)
      const blob = new Blob([rsvpMeta], { type: 'application/json' })
      const metaDataFile = new File([blob], `${event.id}-rsvp-stats.json`) // Specify the desired filename
      const { cid } = await uploadFile(metaDataFile, { cache: true })
      const url = normalizeIPFSUrl(cid)?.toString()
      const updatedEvents = await updateEvent({
        id: event.id,
        statsMetadata: getFetchableUrl(url)
      })

      if(updatedEvents){
        setSplitReady(true)
        setRosterData(results)
      }
      }

  }

  useEffect(() => {

    if(rosterData.length > 1 && splitReady){
      console.log('write triggered')

      // write?.()
    }
  }, [splitReady, rosterData])


  useEffect(() => {

    if(txData && isSuccess){
      console.log('update split success', txData)
    }
  }, [txData, isSuccess])



  return (
    <div className={'flex flex-col h-full px-4 pt-40 overflow-scroll md:h-[605px]'}>
      <h3 className={'text-center'}> Would You Like to End This Livestream? </h3>
      <button onClick={() => setPrompt(true)} className={'bg-red-500 hover:bg-red-400 border-transparent h-12 rounded-lg font-mono font-bold text-lg cursor-pointer'}>
        <p className={'my-auto'}> End Stream </p>
      </button>

      <Transition appear show={promptOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeExitModal}>
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
                <Dialog.Panel className="w-full max-w-md transform border-solid border-[#B999FA] overflow-hidden rounded-2xl bg-[#12002C] p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="p"
                    className="text-lg font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    Leave Livestream?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Are you sure you want to end the stream? This action cannot be undone, and the memory card sale will end.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      type="button"
                      className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeExitModal}
                    >
                      Continue streaming
                    </button>
                      <button
                        type="button"
                        className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={() => router.push(`/livestream/${eventID}/exit-stream`)}
                        onClick={() => endEvent(event?.id!)}

                      >
                        End Stream
                      </button>
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
