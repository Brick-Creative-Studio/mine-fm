import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SongCard } from 'components/SongCard'
import { MSCard } from 'components/moodscape/MSCard'
import { useLayoutStore } from 'stores'

export default function Profile({}) {
  const { signerAddress } = useLayoutStore((state) => state)

  return (
    <div className="flex flex-col mt-24 mb-auto mx-12">
      <div className="flex p-4">
        <div className="w-11/12 bg-gradient-to-r from-purple-500 to-pink-500 h-36 absolute rounded-lg z-0" />
        <div className="px-2 pt-1">
          <Image
            className="rounded-full z-10"
            src={'/stock/flubber-token.png'}
            width={140}
            height={140}
            alt="avatar"
          />
        </div>
        <div className="z-20 mx-8 w-full">
          <h1> Blobitty Blah</h1>
          <p className="-mt-4"> @Blobitty </p>
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row">
              <div className="flex justify-center w-40 h-fit items-center mr-8 bg-white text-black rounded-lg px-2 ">
                <p className="text-ellipsis overflow-hidden">
                  {' '}
                  0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2
                </p>
                <button className="bg-transparent hover:bg-sky-100 w-fit h-fit">
                  <Image
                    width={48}
                    height={48}
                    src={'/copy.svg'}
                    alt="coply address button"
                  />
                </button>
              </div>
              <div className="flex self-center bg-sky-500/90 hover:bg-sky-300 h-12 items-center justify-between -mt-2 bg-white text-black rounded-full">
                <button className="flex flex-row justify-center bg-transparent w-32 h-fit p-4">
                  <h3>Follow</h3>
                </button>
              </div>
            </div>
            <div className="flex justify-self-end items-end	mt-4 space-x-4 > * + *">
              <button className="bg-gray-50 hover:bg-sky-100 w-10 h-10 rounded-lg">
                <Image
                  width={24}
                  height={24}
                  src={'/stock/twitter-logo.svg'}
                  alt="twitter button"
                />
              </button>
              <button className="bg-gray-50 hover:bg-sky-100  w-10 h-10 rounded-lg">
                <Image
                  width={24}
                  height={24}
                  src={'/stock/instagram-logo.svg'}
                  alt="instagram button"
                />
              </button>
              <Link href={`${signerAddress}/identity`}>
                <button className="bg-gray-50	 hover:bg-sky-100  w-10 h-10 rounded-full">
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
      <div className="flex my-6 flex-row space-x-12 > * + *	">
        <h2> Bio </h2>
        <p className="text-ellipsis	">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over 2000 years
          old. Richard McClintock, a Latin professor at Hampden
        </p>
        <div className="flex flex-col items-center">
          <p> Sounds </p>
          <p className="-mt-2"> 25 </p>
        </div>
        <div className="flex flex-col items-center">
          <p> MOODs </p>
          <p className="-mt-2"> 310 </p>
        </div>
        <div className="flex flex-col items-center">
          <p> Collection </p>
          <p className="-mt-2"> 103 </p>
        </div>
        <div className="flex flex-col items-center">
          <p> Subs </p>
          <p className="-mt-2"> 5 </p>
        </div>
      </div>

      <div className="flex flex-row space-x-6">
        <div className="flex flex-col">
          <p>Memory Cards</p>
          <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 hidden" />
        </div>
        <div className="flex flex-col">
          <p>Songs</p>
          <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 " />
        </div>
        <div className="flex flex-col">
          <p>Moods</p>
          <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 hidden" />
        </div>
        <div className="flex flex-col">
          <p>Collections</p>
          <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 hidden" />
        </div>
      </div>

      <div className="w-inherite border border-white opacity-10 border-solid -mt-3"></div>
      <div className="grid grid-cols-4 gap-4 p-4">
        <SongCard />
        <MSCard />
      </div>
    </div>
  )
}
