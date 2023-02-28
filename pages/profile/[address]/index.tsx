import React from 'react'
import Image from 'next/image'
import testAvi from '../../../public/test-avi.png'
import { SongCard } from 'components/SongCard'
import { MSCard } from 'components/moodscape/MSCard'

export default function Profile({}) {
  return (
    <div className="flex flex-col mt-32 mb-auto mx-12">
      <div className="flex">
        <div className="w-11/12 bg-gradient-to-r from-purple-500 to-pink-500 h-32 absolute rounded-lg z-0" />
        <Image
          className="bg-white rounded-full ml-4 z-10"
          src={testAvi}
          width={140}
          height={140}
          alt="avatar"
        />
        <div className="z-20 mx-8">
          <h1> Blobitty Blah</h1>
          <p className="-mt-4"> @ChillPenguin </p>
          <div className="flex flex-row">
            <div className="flex justify-center w-fit h-fit items-center mr-8 bg-white text-black rounded-lg px-2">
              <p> 0x4bF7F1...</p>
              <button className="bg-transparent hover:bg-sky-100 w-fit h-fit">
                <Image
                  width={14}
                  height={14}
                  src={'/copy.svg'}
                  alt="coply address button"
                />
              </button>
            </div>
            <div className="flex justify-center bg-sky-500/90 hover:bg-sky-300 w-14 h-14 items-center -mt-2 bg-white text-black rounded-full px-2">
              <button className="bg-transparent w-fit h-fit">
                <Image width={24} height={24} src={'/plus.svg'} alt="follow button" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-6 flex-row space-x-12 > * + *	">
        <h2> Bio </h2>
        <p className='text-ellipsis	'>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over 2000 years
          old. Richard McClintock, a Latin professor at Hampden
        </p>
        <div className="flex flex-col items-center">
          <p > Sounds </p>
          <p className='-mt-2'> 10 </p>
        </div>
        <div className="flex flex-col">
          <p> MOODs </p>
        </div>
        <div className="flex flex-col">
          <p> Collection </p>
        </div>
        <div className="flex flex-col">
          <p> Subs </p>
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
        <MSCard/>
        
      </div>
    </div>
  )
}