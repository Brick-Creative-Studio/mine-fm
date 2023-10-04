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


export default function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [gradient, setGradient] = useState(``)
  const [isUserPage, setPageType] = useState(true)
  const [ following, setFollowing] = useState<Relation[] | null>(null)
  const [ follower, setFollower] = useState<Relation[] | null>(null)

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
      title: 'Ores',
      component: [<OreSection key={'Ores'} />],
    },
  ]
  useEffect(() => {
    setGradient(
      `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    )
  }, [aura])

  useEffect(() => {
     if(address as string !== pathAddress){
      setPageType(false)
    }else {
      setPageType(true)
    }
  }, )

  useEffect(() => {

    async function fetchRelations(){
      const endpoint = 'follower/where'
      const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
      console.log(user?.id)
      //fetch followers
      await axios.post(url, {
        userID: user?.id!
      }).then((res) => {
        console.log('followers',res.data)

        setFollower(res.data)
      }).catch((error) => {
        console.log(error, 'error fetching followers')
      })

      //fetch following
      await axios.post(url, {
        followerID: user?.id!
      }).then((res) => {
        console.log('following',res.data)

        setFollowing(res.data)
      }).catch((error) => {
        console.log(error, 'error fetching following')
      })

    }

    fetchRelations()
  }, [user, isLoading])

  console.log('end', following)
  return (
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
          <h1> {user?.name}</h1>
          <p className="-mt-4"> {user?.miner_tag} </p>
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col">
              <div className="flex justify-center w-40 h-fit items-center mr-8 bg-white drop-shadow-lg text-black border-1 rounded-full px-2 ">
                <p className="text-ellipsis overflow-hidden"> {user?.walletAddress}</p>
                <CopyButton text={user?.walletAddress as string} />
              </div>
              {
                isUserPage  ? null : (
                  <div
                    className={
                      'w-40 h-12 flex items-center justify-center bg-fuchsia-700 rounded-full mt-4'
                    }
                  >
                    {' '}
                    <h3>Follow</h3>{' '}
                  </div>
                )
              }
            </div>

            <div className="flex w-fit justify-around	mt-4 bg-black/50 rounded-xl">
              <TwitterModal twitterUrl={user?.twitter} />
              <InstaModal instaUrl={user?.instagram} />
              {
                isUserPage ?  <Link href={`${address}/aura`}>
                <button className="hover:bg-sky-100  w-10 h-10 rounded-lg bg-transparent">
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
      <div className="flex justify-center m-6 flex-row items-baseline lg:space-x-12 > * + *	md:justify-start">
        <div className="flex flex-col items-center mx-4">
          <p> Memory Cards </p>
          <p className="-mt-2"> 0 </p>
        </div>

        <FollowerModal />
        <FollowingModal followingList={following}/>
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
  )
}

