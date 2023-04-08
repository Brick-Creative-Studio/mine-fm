import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import {useLayoutStore, useProfileStore} from 'stores'
import axios from "axios";

type InstaInput = {
  url: string
}


export default function InstaModal() {
  let [isOpen, setIsOpen] = useState(false)
  let [] = useState('')
  const { signerAddress } = useLayoutStore((state) => state)


  let { setInstagram, id } = useProfileStore(state => state)



  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<InstaInput>()

  const updateInsta = async(url: string, address: string, id: string, profile: string) => {
    console.log('modal id check: ',id)
    let socialLink: string = await axios.put(url, {
      instagram: profile,
      id: id,
      walletAddress: address
    }).then((res) => {
      console.log('updated twitter!', res.data.twitter)
      return res.data
    })

    return socialLink;
  }


  async function closeAndSubmit(){
    const url = getValues('url')
    const server = `https://minefm-server.herokuapp.com/miner`

    await updateInsta(server, signerAddress, id, url)
    setInstagram(url)
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
        className="hover:bg-sky-100  w-10 h-10 rounded-lg bg-transparent"
        onClick={openModal}
      >
        <Image
          width={24}
          height={24}
          src={'/stock/instagram-logo.svg'}
          alt="instagram button"
        />
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
                    Add your Insatgram profile url
                  </Dialog.Title>
                  <form>

                  <div className="mt-2">
                  <input
                    placeholder='www.insagram/mine_fm'
                    className="bg-slate-200/75 h-10 w-full border p-2 border-solid rounded-md text-black"
                    {...register('url')}
                     >
                      
                    </input>
                  </div>
                  </form>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeAndSubmit}
                    >
                      Save
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
