import React from "react";
import Image from "next/image";
import { bodyGradient } from 'styles/gradient.css'
import testAvi from "../../../public/test-avi.png"
import coverArt from "../../../public/sample-cl-alchemist.png"
import noteIcon from "../../../public/note-icon.png"
import { SongCard } from "components/SongCard";

export default function Profile ({}) {

    return(
        <div className="flex flex-col mt-32 mb-auto mx-12">

            <div className="flex">
                <div className="w-11/12 bg-gradient-to-r from-purple-500 to-pink-500 h-32 absolute rounded-lg z-0"/>
                <Image 
                className="bg-white rounded-full ml-4 z-10"
                src={testAvi}
                width={140}
                height={140}
                alt='avatar'
                />
                <h1 className="z-20 mx-8"> Blobitty Blah</h1>
            </div>
            <div>
                <h2> Bio </h2>
            </div>
            <div className='flex flex-row space-x-6'>
                    <p>Song</p>

                    <p>Mood</p>

                    <p>Collection</p>
                </div>

                <div className='w-inherite border border-white opacity-10 border-solid -mt-3'></div>

            

            <div className="flex flex-row w-full">
                <div className="mr-32 ml-4">
                </div>
                                
            </div>
        </div>
    )

}