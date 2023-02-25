import React from "react";
import Image from "next/image";
import { bodyGradient } from 'styles/gradient.css'
import testAvi from "../../../public/test-avi.png"
import coverArt from "../../../public/sample-cl-alchemist.png"
import noteIcon from "../../../public/note-icon.png"
import { SongCard } from "components/SongCard";

export default function Profile ({}) {

    return(
        <div className="flex flex-col mt-32 mb-auto mx-12 border-solid border-white p-4">
            <div className={bodyGradient} />

            <div>
                <Image 
                className="bg-white rounded-full"
                src={testAvi}
                width={86}
                height={86}
                alt='avatar'
                />
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

            <div className="self-center">
                <h2> Search Bar </h2>
            </div>

            <div className="flex flex-row border-solid border-orange-700 w-full">
                <div className="mr-32 ml-4">
                    <h2> Sort Filters </h2>
                </div>
                
                <SongCard/>
                
            </div>
        </div>
    )

}