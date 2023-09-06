import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import {useLayoutStore, useProfileStore} from 'stores'
import Link from "next/link";

interface ModalProps {
  isOpen: boolean,
  eventId: string | undefined
}



export default function SuccessEventModal({ isOpen, eventId } : ModalProps) {
  const { signerAddress } = useLayoutStore((state) => state)
  const streamKey = 'A@12erSUjB24'

  function closeModal() {

  }


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-0" onClose={closeModal}>
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
                <Dialog.Panel className="flex flex-col items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-30% via-black via-60% to-purple-900 via-15%  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6"
                  >
                    Congrats!
                  </Dialog.Title>
                  <p className={'text-center m-0'}>
                    Below is your audio key in order to stream audio on MINE.FM,
                    make sure to keep this key a secret in store it in safe place.
                    Insert this key in your media player in order to connect to our servers
                  </p>

                  <h3 className={'text-lime-400'}> {streamKey}</h3>
                  <Image src={'/gif/mine-cube.gif'} alt={'mine cube gif'} height={64} width={64}/>

                  <div className="mt-4">
                    { eventId ?
                      <Link href={`/livestream/${eventId}`}>
                      <button
                        type="submit"
                        className="not-italic bg-black/40 h-12 rounded-lg font-mono font-bold text-green-200 text-lg p-2 px-4 border-none cursor-pointer mb-8"
                      >
                        Head to your livestream page
                      </button>
                    </Link> :
                      <button
                        type="submit"
                        className="not-italic bg-black/40 h-12 rounded-lg font-mono font-bold text-green-200 text-lg p-2 px-4 border-none cursor-pointer mb-8"
                      >
                        Fetching Event Data
                      </button>
                    }

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
