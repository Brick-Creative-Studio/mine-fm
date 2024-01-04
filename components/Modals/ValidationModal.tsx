import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'


interface Props {
  isValidated: boolean
}
export default function ValidationModal({ isValidated }: Props){

  const [shouldTransition, setTranstion ] = useState<boolean>(false)
  const router = useRouter()
  const [modalText, setModalText ] = useState<string>('Verifying Your RSVP...')

  function closeModal(){

  }

  useEffect(() => {
    setTimeout(() => {
      setModalText('RSVP not found. Leaving livestream...');
      if(!isValidated){
        router.push('/explore?tab=livestream')
      }
    }, 3000);
    }, [isValidated])


  return (
    <Transition appear show={isValidated} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                  className="text-lg font-light mx-auto animate-pulse leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                >
                  { modalText }
                </Dialog.Title>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}