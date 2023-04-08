import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useProfileStore } from 'stores'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useLayoutStore } from 'stores'



export default function ConnectModal() {

 
  let [isOpen, setIsOpen] = useState(false)
  const { signerAddress, setSignerAddress } = useLayoutStore()

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
      closeModal()

    },
  })

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
        className="cursor-pointer hover:bg-sky-100 border-solid border-red-400 hover:text-black rounded-lg bg-black/50"
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
                    Please Connect Your Wallet to Enter the Moodscape
                  </Dialog.Title>
              
                  <div className="flex justify-center items-center mt-6">
                  <ConnectButton showBalance={false} />

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
