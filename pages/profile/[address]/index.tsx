import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { bgGradient } from '../../../styles/background.css'
import { ProfileSectionHandler as SectionHandler } from 'components/Layout/ProfileSectionHandler'
import { useLayoutStore } from 'stores'
import MoodsSection from 'components/Sections/MoodsSection'
import MscapeSection from 'components/Sections/MsSection'
import InstaModal from 'components/Modals/InstaModal'
import { useProfileStore } from 'stores'
import TwitterModal from 'components/Modals/TwitterModal'
import { User } from '../../../types/User'
import fetchUser from '../../../data/rest/fetchUser'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import CopyButton from '../../../components/CopyButton/CopyButton'
import axios from 'axios'
import FollowerModal from "../../../components/Modals/FollowerModal";
import FollowingModal from "../../../components/Modals/FollowingModal";
interface UserProps {
  user: User | undefined
}

export default function Profile({ user }: UserProps) {
  const { signerAddress } = useLayoutStore((state) => state)
  const { aura } = useProfileStore((state) => state)
  const [gradient, setGradient] = useState(``)
  const { query } = useRouter()
  const pathAddress = query?.address?.toString()
  const isUserPage = () => {
    return signerAddress === pathAddress;
  }

  const sections = [
    {
      title: 'Moodscapes',
      component: [<MscapeSection key={'moodscape'} />],
    },
    {
      title: 'Moodys',
      component: [<MoodsSection key={'moodys'} />],
    },
  ]
  useEffect(() => {
    setGradient(
      `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    )
  }, [aura])

  console.log('isUserpage:', isUserPage())
  return (
    <div className="flex flex-col mt-24 mb-auto p-12">
      <div className="flex">
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
                isUserPage() ? null : (
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

              <Link href={`${signerAddress}/identity`}>
                <button className="hover:bg-sky-100  w-10 h-10 rounded-lg bg-transparent">
                  <Image
                    width={24}
                    height={24}
                    src={'/gear.svg'}
                    alt="settings button"
                    className="justify-self-center self-center"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-6 flex-row items-baseline lg:space-x-12 > * + *	md:justify-start">
        <div className="flex flex-col items-center mx-4">
          <p> Moodscapes </p>
          <p className="-mt-2"> 1 </p>
        </div>

        <FollowerModal/>
        <FollowingModal/>
      </div>
      <div className="flex-col">
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
        signerAddress={signerAddress ? signerAddress : undefined}
        activeTab={query?.tab ? (query.tab as string) : undefined}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ user: User }> = async (
  context: GetServerSidePropsContext
) => {
  const url = `https://minefm-server.herokuapp.com/user/user`
  const signerAddress = context.params?.address as string

  let user: User = await axios
    .post(url, {
      walletAddress: signerAddress,
    })
    .then((res) => {
      return res.data
    })
  return {
    props: { user }, // will be passed to the page component as props
  }
}
