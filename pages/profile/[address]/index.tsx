import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ProfileSectionHandler as SectionHandler } from 'components/Layout/ProfileSectionHandler'
import InstaModal from 'components/Modals/InstaModal'
import TwitterModal from 'components/Modals/TwitterModal'
import MemoryCardSection from "../../../components/Sections/MemoryCardSection";
import OreSection from "../../../components/Sections/OresSection";
import CopyButton from '../../../components/CopyButton/CopyButton'
import FollowerModal from "../../../components/Modals/FollowerModal";
import FollowingModal from "../../../components/Modals/FollowingModal";
import useGetUser from "../../../hooks/useGetUser";
import { useAccount} from "wagmi";
import { Attendee } from "../../../types/Attendee";
import axios from "axios";
import { Relation } from "../../../types/Relation";
import { useProfileStore } from "../../../stores";


export default function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [gradient, setGradient] = useState(``)
  const [isUserPage, setIsUserPage] = useState(true)
  const [ followingList, setFollowingList] = useState<Relation[]>([])
  const [ followerList, setFollowerList] = useState<Relation[]>([])
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const { id : myID } = useProfileStore((state) => state)
  const { query } = useRouter()
  const pathAddress = query?.address?.toString()
  const { error, user, isLoading } = useGetUser(pathAddress as string)

  const aura = {
    direction: user?.direction,
    colorOne: user?.colorOne,
    colorTwo: user?.colorTwo,
    colorThree: user?.colorThree
  }

  const sections = [
    {
      title: 'Memory Cards',
      component: [<MemoryCardSection key={'MemoryCards'} />],
    },
    {
      title: 'Saved Audio',
      component: [<OreSection key={'Ores'} />],
    },
  ]

  //aura set up
  useEffect(() => {
    setGradient(
      `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    )
  }, [aura])

  //check if event owner
  useEffect(() => {
     if(address as string !== pathAddress){
      setIsUserPage(false)
    }else {
      setIsUserPage(true)
    }
  }, )

  async function fetchRelations(){
    const endpoint = 'follower/where'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

    if(pathAddress && user){
      //fetch followers of user
      await axios.post(url, {
        userID: user.id!
      }).then((res) => {
        setFollowerList([...res.data])
      }).catch((error) => {
        console.log(error, 'error fetching followers')
        setIsFollowing(false)

      })

      //fetch ppl user is following
      await axios.post(url, {
        followerID: user.id!
      }).then((res) => {
        setFollowingList([...res.data])
      }).catch((error) => {
        console.log(error, 'error fetching following')
      }).then(() => {

      })
    }
  }

  //get users followers and following
  useEffect(() => {

    if(user && !isLoading && pathAddress){
      fetchRelations()
    }

  }, [pathAddress, user])

  //on first load check if user viewing the page is a follower or not
  useEffect(() => {
    if (followerList && !isUserPage){
      followerList.map((relation) => {
        if(relation.followerID === myID){
          setIsFollowing(true)
        }
      })
    }

  }, [followerList])


  async function follow(){
    const createEndpoint = 'follower/create'
    const createURL = process.env.NEXT_PUBLIC_BASE_URL + createEndpoint

    return await axios
      .post(createURL, {
        followerID: myID,
        userID: user?.id,
      })
      .then((res) => {
        //if relation found user is following viewed account
        setIsFollowing(true)
        return res.data
      })
      .catch((error) => {
        console.log('error removing relationship', error)
      }).then(() => {
        fetchRelations()
      })
  }

  async function unFollow(){
    const deleteEndpoint = 'follower/delete'
    const deleteURL = process.env.NEXT_PUBLIC_BASE_URL + deleteEndpoint


    return await axios
      .post(deleteURL, {
        followerID: myID,
        userID: user?.id,
      })
      .then((res) => {
        //if relation found user is following viewed account
        setIsFollowing(false)
        return res.data
      })
      .catch((error) => {
        console.log('error removing relationship', error)
      }).then(() => {
        fetchRelations()
      })
  }

  function followUIState(){
    return isFollowing ? (
      <button
        className={
          'w-40 h-12 cursor-pointer flex items-center justify-center bg-fuchsia-700 rounded-full mt-4'
        }
        onClick={() => unFollow()}
      >
        {' '}
        <h3>Unfollow</h3>{' '}
      </button>
    ) : (
      <button
        className={
          'w-40 h-12 cursor-pointer flex items-center justify-center bg-fuchsia-700 rounded-full mt-4'
        }
        onClick={() => follow()}
      >
        {' '}
        <h3>Follow</h3>{' '}
      </button>
    )
  }






  return (
    <>
      { pathAddress ? (
        <div className="flex flex-col mt-24 mb-auto w-full">

          <div className="flex mx-8">
            <div className="px-2 pt-1">
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: gradient && gradient,
                }}
              />
            </div>
            <div className=" mx-8 w-full">
              <h2 className={ 'w-1/2'}> {user?.name}</h2>
              <p className="-mt-4"> {user?.miner_tag} </p>
              <div className="flex flex-col w-full justify-between">
                <div className="flex flex-col">
                  <div className="flex justify-center w-40 h-fit items-center mr-8 bg-white drop-shadow-lg text-black border-1 rounded-full px-2 ">
                    <p className="text-ellipsis overflow-hidden"> {user?.walletAddress}</p>
                    <CopyButton text={user?.walletAddress as string} />
                  </div>
                  {
                    isUserPage  ? null : (
                      followUIState()
                    )
                  }
                </div>

                <div className="flex w-fit justify-around	mt-4 bg-black/50 rounded-xl">
                  <TwitterModal twitterUrl={user?.twitter} />
                  <InstaModal instaUrl={user?.instagram} />
                  {
                    isUserPage ?  <Link href={`${address}/aura`}>
                      <button className="hover:bg-sky-100  w-10 h-10 rounded-lg bg-transparent border-none">
                        <Image
                          width={24}
                          height={24}
                          src={'/gear.svg'}
                          alt="settings button"
                          className="justify-self-center self-center"
                        />
                      </button>
                    </Link> : null
                  }

                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:m-6 flex-row items-baseline lg:space-x-12 > * + *	md:justify-start">
            <div className="flex flex-col items-center mx-4">
              <p className={'text-[13px] md:text-[16px] text-center'}> Memory Cards </p>
              <p className="-mt-2 text-[13px] md:text-[16px]"> 0 </p>
            </div>

            <FollowerModal followerList={followerList} />
            <FollowingModal followingList={followingList}/>
          </div>
          <div className="flex-col mx-8">
            <h2> Bio </h2>
            {user?.bio ? (
              <p className="text-ellipsis	"> {user.bio} </p>
            ) : (
              <p className="text-ellipsis	">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                roots in a piece of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at Hampden
              </p>
            )}
          </div>
          <SectionHandler
            sections={sections}
            signerAddress={user?.walletAddress ? user.walletAddress : undefined}
            activeTab={query?.tab ? (query.tab as string) : undefined}
          />
        </div>
      ) : (
        <h3 className={'animate-pulse'}>Loading...</h3>
      )}

    </>
  )
}

