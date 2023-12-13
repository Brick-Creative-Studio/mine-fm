import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import {useLayoutStore, useProfileStore} from 'stores'
import Link from "next/link";


interface ModalProps {
  isOpen: boolean
}

export default function ErrorModal({ isOpen } : ModalProps) {
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
                    Oops! There was error creating your account :(
                  </Dialog.Title>
                  <Image src={'/gif/mineCUBE-bw.gif'} alt={'mine bw cube gif'} height={64} width={64}/>

                  <div className="mt-4">
                    <Link href={'/onboarding?tab=aura'}>

                      <button
                        type="submit"
                        className="not-italic bg-black/40 h-12 rounded-lg font-mono font-bold text-green-200 text-lg p-2 px-4 border-none cursor-pointer mb-8"
                      >
                        Retry
                      </button>
                    </Link>
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
