import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useProfileStore, useLayoutStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'

export default function CreateAcctModal() {
  let [isOpen, setIsOpen] = useState(false)
  const { needsCard, setStatus } = useMCStore((state) => state)

  const  router  = useRouter()

  function createNewAcct(){
    setStatus(true)
    router.push('/onboarding?tab=aura')
    closeModal()
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer hover:bg-sky-100 border-solid border-yellow-200 hover:text-black rounded-lg bg-black/50"
      >
        <h3> Enter Moodscape </h3>
      </button>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Please Create a New Account to Enter the Moodscape
                  </Dialog.Title>

                  <div className="flex justify-center items-center mt-6">
                    <button
                      onClick={createNewAcct}
                      className="hover:bg-sky-100 hover:text-black cursor-pointer rounded-lg bg-black/50"
                    >
                      <h3> Create a New Account </h3>
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
