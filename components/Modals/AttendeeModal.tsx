import React, { useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { User } from '../../types/User'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import { useProfileStore } from '../../stores'
import Link from 'next/link'

interface Props {
  user: User
}
//
// <div className={'flex flex-col items-center cursor-pointer'}>
//   <div style={{ background: userGradient }} className={'rounded-full w-[40px] h-[40px] '}/>
//   <p className={'text-center'}> {user.name }</p>
// </div>

export default function AttendeeModal({ user }: Props) {
  const userGradient = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`
  const { id } = useProfileStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)
  const [isSelf, setIsSelf] = useState(false)
  const [isFollowing, setFollowing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchRelationship() {
    const endpoint = 'follower/follow'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
    return await axios
      .post(url, {
        followerID: id,
        userID: user.id,
      })
      .then((res) => {
        //if relation found user is following viewed account
        setFollowing(true)
        return res.data
      })
      .catch((error) => {
        console.log('error fetching relationship', error)
        setFollowing(false)
      })
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function mutateRelation() {
    const deleteEndpoint = 'follower/delete'
    const createEndpoint = 'follower/create'

    const deleteURL = process.env.NEXT_PUBLIC_BASE_URL + deleteEndpoint
    const createURL = process.env.NEXT_PUBLIC_BASE_URL + createEndpoint

    setIsLoading(true)

    if (isFollowing) {
      return await axios
        .post(deleteURL, {
          followerID: id,
          userID: user.id,
        })
        .then((res) => {
          //if relation found user is following viewed account
          setFollowing(false)
          setIsLoading(false)
          return res.data
        })
        .catch((error) => {
          console.log('error removing relationship', error)
        })
    } else {
      return await axios
        .post(createURL, {
          followerID: id,
          userID: user.id,
        })
        .then((res) => {
          //if relation found user is following viewed account
          setFollowing(true)
          return res.data
        })
        .catch((error) => {
          console.log('error removing relationship', error)
        })
    }
  }

  useEffect(() => {
    if (id === user.id) {
      setIsSelf(true)
      return
    }

    const relation = fetchRelationship()
  }, [])

  return (
    <>
      <button type="button" onClick={openModal} className="bg-transparent">
        <div className={'flex flex-col items-center cursor-pointer '}>
          <div
            style={{ background: userGradient }}
            className={'rounded-full w-[40px] h-[40px] '}
          />
          <p className={'text-center'}> {user.name}</p>
        </div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 transition-all" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="all duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-[#1D0045] text-left align-middle shadow-xl transition-all absolute bottom-0 md:rounded-2xl md:relative">
                  <div
                    className={
                      'bg-blue-500 h-full px-4 py-3 flex flex-col justify-center'
                    }
                  >
                    <div className={'flex justify-between'}>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold text-white my-0 py-0"
                      >
                        {user.name}
                      </Dialog.Title>
                      <button onClick={closeModal} className={'bg-transparent'}>
                        <img
                          className={'w-6 h-6 cursor-pointer'}
                          src={'/cross-white.svg'}
                          alt={'close button'}
                        />
                      </button>
                    </div>
                    <p className={'text-[#C0C0C0] mt-1'}>{user.miner_tag}</p>
                  </div>
                  <div className="mb-8 mt-2 mx-4">
                    <p className="text-sm text-white">{user.bio}</p>
                  </div>

                  {}
                  <div className={`mt-4 flex my-8 `}>
                    {isSelf ? null : (
                      <Link href={`/profile/${user.walletAddress}`}>
                        <button
                          className={
                            'flex items-center justify-between w-32 h-8 ml-8 bg-transparent border border-solid border-[#B999FA] rounded-full cursor-pointer'
                          }
                        >
                          <h3 className={'text-sm font-light mx-auto text-[#B999FA]'}>
                            {' '}
                            {'PROFILE'}{' '}
                          </h3>
                          <div
                            className={
                              'rounded-full bg-[#B999FA] w-6 h-6 items-center justify-center flex'
                            }
                          >
                            <img
                              className={'h-4 w-4 '}
                              alt={'create button'}
                              src={'/arrow-right.svg'}
                            />
                          </div>
                        </button>
                      </Link>
                    )}

                    {isSelf ? (
                      <Link href={`/profile/${user.walletAddress}`}>
                        <button
                          className={
                            'flex items-center justify-between w-32 h-8 ml-8 bg-transparent border border-solid border-[#B999FA] rounded-full cursor-pointer'
                          }
                        >
                          <h3 className={'text-sm font-light mx-auto text-[#B999FA]'}>
                            {' '}
                            {'PROFILE'}{' '}
                          </h3>
                          <div
                            className={
                              'rounded-full bg-[#B999FA] w-6 h-6 items-center justify-center flex'
                            }
                          >
                            <img
                              className={'h-4 w-4 '}
                              alt={'right icon'}
                              src={'/arrow-right.svg'}
                            />
                          </div>
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => mutateRelation()}
                        className={
                          'flex items-center justify-between w-32 h-8 ml-8 bg-transparent border border-solid border-[#B999FA] rounded-full cursor-pointer'
                        }
                      >
                        <h3 className={'text-sm font-light mx-auto text-[#B999FA]'}>
                          {' '}
                          {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}{' '}
                        </h3>
                        <div
                          className={
                            'rounded-full bg-[#B999FA] w-6 h-6 items-center justify-center flex'
                          }
                        >
                          <img
                            className={'h-4 w-4 '}
                            alt={'create button'}
                            src={'/plus.svg'}
                          />
                        </div>
                      </button>
                    )}
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
