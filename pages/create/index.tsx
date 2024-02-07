import React, { Fragment, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import ComingSoonModal from "../../components/Modals/ComingSoonModal";
import { Dialog, Transition } from "@headlessui/react";

export default function CreatePage() {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col justify-center items-center my-24 h-full w-full">
      <div className={'flex flex-col w-full items-center justify-center'}>
        <p className={'my-1  md:text-[64px] text-[32px] text-[#B999FA]'}> CREATE </p>
      </div>
      <div
        className={
          'h-full w-full flex flex-col md:flex-row justify-center md:justify-around items-center mt-8 md:mt-40 md:px-12'
        }
      >
        <div className={'flex flex-col items-center'}>

          {/*<Link href={`/create/stream`}>*/}
          <button
            onClick={() => setIsOpen(true)}
            className={'bg-transparent'}

          >

          <div className="flex flex-col justify-center items-center w-96 h-68 p-8 border-solid md:w-[35rem] border-[#B999FA] border-4 rounded-full bg-[#1D0045] mb-10 cursor-pointer hover:opacity-80">
            <p className="text-[#B999FA] text-[48px] m-2"> LIVESTREAM </p>

            <h3 className="text-center text-[20px] font-light text-[#B999FA]">
              {' '}
              Audio livestreams events with reward distributions. Token gated and
              intimate.{' '}
            </h3>
          </div>
          </button>
        {/*</Link>*/}
        </div>
        <div className={'flex flex-col items-center'}>
        {/*<a*/}
        {/*  target="_blank"*/}
        {/*  href="https://mine.fm/Stay-Connected"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
          <button
            onClick={() => setIsOpen(true)}
            className={'bg-transparent'}
          >

        <div className="flex flex-col justify-center items-center border-solid border-4 border-[#B999FA] h-68 p-8 w-96 md:w-[35rem] mb-10 rounded-full bg-[#1D0045] cursor-pointer hover:opacity-80">
          <p className="text-[#B999FA] text-[48px] m-2"> IRL </p>

          <h3 className="text-center text-[20px] font-light text-[#B999FA]">
            {' '}
            Create a hybrid event for IRL and online. Contact team for private access{' '}
          </h3>
        </div>
          </button>
        {/*</a>*/}
        </div>
      </div>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border-solid border-[#B999FA] rounded-2xl bg-[#12002C] p-6  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    This Feature is Coming Soon!
                  </Dialog.Title>

                  <div className="flex justify-center items-center mt-6">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <h3> Dismiss </h3>
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


