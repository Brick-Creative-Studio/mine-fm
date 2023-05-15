import React, { useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { bgGradient } from '../../../styles/background.css'
import { ProfileSectionHandler as SectionHandler } from 'components/Layout/ProfileSectionHandler'
import { useLayoutStore } from 'stores'
import MoodsSection from 'components/Sections/MoodsSection'
import MscapeSection from 'components/Sections/MsSection'
import InstaModal from 'components/Modals/InstaModal'
import {useProfileStore} from "stores";
import TwitterModal from 'components/Modals/TwitterModal'
import {Miner} from "../../../types/Miner";
import axios from "axios";
import { GetServerSideProps } from 'next';

import useSWR from "swr";
interface MinerProps {
  miner: Miner
}


export default function Profile({ miner }: MinerProps) {
  const { signerAddress } = useLayoutStore((state) => state)

  console.log('in profile component check', miner)
  const { query } = useRouter()
  const { aura } = useProfileStore((state) => state)
  let userGradient = ``
  // navAvatar gradient linear-gradient(to bottom, #240045, #00ff59, #ff8500)


  const url = `https://minefm-server.herokuapp.com/miner/miner`

  // const getMiner = async (url: string, address: string) => {
  //   let miner: Miner = await axios.post(url, {
  //     walletAddress: address
  //   }).then((res) => {
  //     console.log('wallet check', res.data)
  //     return res.data
  //   })
  //   return miner;
  // }

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

  // const miner = useSWR([url, signerAddress], getMiner).data


  useEffect(() => {
    if(miner) {
      userGradient = `linear-gradient(to ${miner.direction}, ${miner.colorOne}, ${miner.colorTwo}, ${miner.colorThree})`
      console.log('profile check', userGradient)
    }
  },[miner])


  return (
    <div className="flex flex-col mt-24 mb-auto p-12">
      <div className="flex">
        <div style={{ background: `${userGradient}`, position: "absolute",
          zIndex: "0",
          width: "91.666667%",
          height: "9rem",
          borderRadius: "0.5rem",}} />
        <div className="px-2 pt-1">
          <div
            style={{ width: '140px', height: '140px', borderRadius:'50%' ,background: `linear-gradient(to ${aura?.direction}, ${aura?.colorOne}, ${aura?.colorTwo}, ${aura?.colorThree})` }}
          />
        </div>
        <div className=" mx-8 w-full">
          <h1> {miner?.name}</h1>
          <p className="-mt-4"> @{miner?.miner_tag} </p>
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col">
              <div className="flex justify-center w-40 h-fit items-center mr-8 bg-white drop-shadow-lg text-black border-1 rounded-full px-2 ">
                <p className="text-ellipsis overflow-hidden">
                  {' '}
                  {miner?.walletAddress}
                </p>
                <button className="bg-transparent hover:bg-sky-100 w-fit h-fit">
                  <Image
                    width={48}
                    height={48}
                    src={'/copy.svg'}
                    alt="copy address button"
                  />
                </button>
              </div>
            </div>
            <div className="flex w-fit justify-around	mt-4 bg-black/50 rounded-xl">
              <TwitterModal/>
              <InstaModal/>

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
      <div className="flex justify-center my-6 flex-row space-x-12 > * + *	md:justify-start">

        <div className="flex flex-col items-center">
          <p> Moodscapes </p>
          <p className="-mt-2"> 1 </p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <p> MemCards </p>
          <p className="-mt-2"> 1 </p>
        </div>
        <div className="flex flex-col items-center">
          <p> Moodys </p>
          <p className="-mt-2"> 0 </p>
        </div>

      </div>
      <div className='flex-col'>
        <h2> Bio </h2>
        <p className="text-ellipsis	">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over 2000 years
          old. Richard McClintock, a Latin professor at Hampden
        </p>
      </div>
        <SectionHandler
          sections={sections}
          signerAddress={signerAddress ? signerAddress : undefined}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{miner: Miner}> = async (context)=>  {

  const url = `https://minefm-server.herokuapp.com/miner/miner`
 const signerAddress = context.params.address
  let miner: Miner = await axios.post(url, {
    walletAddress: signerAddress
  }).then((res) => {
    console.log('profile check', res.data)
    return res.data
  })

  return {
    props: { miner }, // will be passed to the page component as props
  };
}
