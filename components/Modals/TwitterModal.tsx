import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import {useLayoutStore, useProfileStore} from 'stores'
import axios from "axios";
import process from "process";

type TwitterInput = {
    url: string
}

interface SocialProps {
  twitterUrl: string | undefined | null
  isUserPage : boolean
}

export default function TwitterModal({ twitterUrl, isUserPage }: SocialProps) {

  const { signerAddress } = useLayoutStore((state) => state)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TwitterInput>()
  let [isOpen, setIsOpen] = useState(false)
  let { setTwitter, id } = useProfileStore(state => state)

  const updateTwitter = async(url: string, address: string, id: string, profile: string) => {
    let socialLink: string = await axios.put(url, {
      twitter: profile,
      id: id,
      walletAddress: address
    }).then((res) => {
      setTwitter(url)
      return res.data
    })

    return socialLink;
  }

  const onSubmit: SubmitHandler<TwitterInput> = (data) => console.log('twitter url', data)

  async function closeAndSubmit(){
    const url = getValues('url')
    const endpoint = 'user'
    const server = process.env.NEXT_PUBLIC_BASE_URL + endpoint

    if(url !== twitterUrl){
      signerAddress && id && await updateTwitter(server, signerAddress, id, url)
    }

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
      { isUserPage ? (
        <button
          onClick={openModal}
          className="hover:bg-sky-100 w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
        >
          <Image
            width={24}
            height={24}
            src={'/stock/twitter-logo.svg'}
            alt="twitter button"
          />
        </button>
      ) : (
        <a rel="noopener noreferrer" target={"_blank"} aria-label={'https://'+twitterUrl!} href={'https://'+twitterUrl!}>
        <button
          className={`hover:bg-sky-100 w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer ${twitterUrl ? null : 'hidden'}`}
        >
          <Image
            width={24}
            height={24}
            src={'/stock/twitter-logo.svg'}
            alt="twitter button"
          />
        </button>
        </a>
      )}


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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#12002C] border-solid border-2 border-[#B999FA] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-[#B999FA]"
                  >
                    Add your Twitter profile url
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <input
                    placeholder='www.twitter/mine_fm'
                    defaultValue={ twitterUrl ? twitterUrl : undefined}
                    className="bg-black/50 h-10 w-full p-2 border-none rounded-md text-white"
                    {...register('url')}
                     >
                      
                    </input>
                  </div>
                  </form>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent cursor-pointer bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
