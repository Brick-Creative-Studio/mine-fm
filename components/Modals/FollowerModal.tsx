import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'



export const UserListItem: React.FC<> = ({}) =>{
  return(
    <div className={'w-full flex items-center justify-between my-2'}>
      <div className={'flex'}>
        <div className={'h-12 w-12 bg-orange-500 rounded-full mr-4'} />
        <div className={'flex-col flex items-start justify-center'}>
          <p className={'my-0 text-ove text-ellipsis'}>@minerTag</p>
          <p className={'my-1 text-gray-500'}>Name</p>
        </div>
      </div>
      <button className={'bg-white text-black rounded-md'}>
        Follow
      </button>
    </div>
  )
}
export default function FollowingModal() {
  let [isOpen, setIsOpen] = useState(false)
  const followerCount = 433

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex w-fit flex-col items-center mx-4">
        <button type="button" onClick={openModal} className={'bg-transparent cursor-pointer'}>
          <p> Followers </p>
          <p className="-mt-2"> {followerCount} </p>
        </button>
      </div>

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
                <Dialog.Panel className="w-full h-1/2 max-w-md transform overflow-scroll rounded-2xl bg-[#240045] p-4 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6"
                  >
                    {`Followers - ${followerCount} Miners`}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col w-full h-96 overflow-scroll">
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>
                    <UserListItem/>

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
