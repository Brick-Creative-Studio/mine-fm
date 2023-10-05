import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from "react";
import { Relation } from "../../types/Relation";
import { User } from "../../types/User";
import { useProfileStore } from "../../stores";
import axios from "axios";

interface FollowerList {
  followerList: Relation[] | null

}

interface Props {
  user: User
}

export const UserListItem: React.FC<Props> = ({ user }) =>{

  const auraCode = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`
  const [isFollower, setFollower] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {id } = useProfileStore(state => state)

  async function mutateRelation(){
    const deleteEndpoint = 'follower/delete'
    const createEndpoint = 'follower/create'

    const deleteURL = process.env.NEXT_PUBLIC_BASE_URL + deleteEndpoint
    const createURL = process.env.NEXT_PUBLIC_BASE_URL + createEndpoint

    if(isFollower){
      return await axios.post(deleteURL, {
        followerID: user.id,
        userID: id
      }).then((res) => {
        //if relation found user is following viewed account
        setFollower(false)
        return res.data
      }).catch((error) => {
        console.log('error removing relationship', error)

      })

    }else{
      return await axios.post(createURL, {
        followerID: user.id,
        userID: id
      }).then((res) => {
        //if relation found user is following viewed account
        setFollower(true)
        return res.data
      }).catch((error) => {
        console.log('error removing relationship', error)
      })
    }

  }

  return(
    <div className={'w-full flex items-center justify-between my-2'}>
      <div className={'flex'}>
        <div style={{ background: `${auraCode}`}} className={`h-12 w-12 rounded-full mr-4`} />
        <div className={'flex-col flex items-start justify-center'}>
          <p className={'my-0 text-ove text-ellipsis'}>{ user?.miner_tag }</p>
          <p className={'my-1 text-gray-500'}>{ user?.name }</p>
        </div>
      </div>

    </div>
  )
}
export default function FollowerModal({ followerList } : FollowerList) {
  let [isOpen, setIsOpen] = useState(false)
  const [ userList, setUserList] = useState<User[]>([])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    function fetchList(){
      const list : User[] = [];

      followerList?.map((follower) => {
        const endpoint = 'user/user'
        const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
        axios.post(url, {
          id: follower.userID
        }).then((res) => {
          list.push(res.data)
        }).catch((error) => {
          console.log('error fetching user list', error)
        })
      })
      if(followerList){
        setUserList(list)
      }
    }
    if (followerList?.length ){
      fetchList()
    }else {
      setUserList([])
    }
  }, [followerList])

  return (
    <>
      <div className="flex w-fit flex-col items-center mx-4">
        <button type="button" onClick={openModal} className={'bg-transparent cursor-pointer'}>
          <p className={'text-white text-[13px] md:text-[16px]'}> Followers </p>
          <p className="-mt-2 text-white text-[13px] md:text-[16px]"> {followerList?.length} </p>
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
                    {`Followers - ${followerList?.length} Miner(s)`}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col w-full h-96 overflow-scroll">
                    {
                      userList && userList.length > 0 ? ( userList.map((user) =>{
                        return <UserListItem user={user}/>
                      })) : (
                        'You have no followers yest'
                      )
                    }
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
