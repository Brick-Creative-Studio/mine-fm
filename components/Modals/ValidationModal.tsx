import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Link from "next/link";


interface Props {
  isValidated: boolean
}
export default function ValidationModal({ isValidated }: Props){

  function closeModal(){

  }
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
                  Verifying Your RSVP...
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-white">
                    Are you sure you want to leave this page? Leaving will impact your listening stats.
                  </p>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}