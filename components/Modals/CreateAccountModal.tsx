import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Link from 'next/link'


export default function CreateAccountModal() {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  // function openModal() {
  //   setIsOpen(true)
  // }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                    Create An Account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Please create an account to continue with mine.fm's features.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <Link href={'/onboarding?tab=aura'}>
                      <button
                        type="button"
                        className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Create Account
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeModal()}
                    >
                       Dismiss
                    </button>
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
