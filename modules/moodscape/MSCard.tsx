import React from "react";
import Image from "next/image";


export const MSCard = () => {

    return (
        <div className="h-full rounded-lg bg-[#535353]/50 p-2">
                <div className="flex h-auto ml-1 border-solid border-[#EFE9DB] drop-shadow-lg rounded-lg mb-4 relative aspect-square">
                <Image 
                layout="fill"
                sizes="100vw"
                src={'/stock/lil-noun.svg'}
                alt="cover art"
                className='rounded-lg'
                />
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <div>
                        Mood Title
                    </div>
                
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        Creator 1
                       
                    </div>
                    <div className="text-[#9B5B46]">
                        4/2/23
                    </div>
                </div>
                <div className="my-2 w-full h-0.5 bg-gray-500/75"/>

                <div className="flex flex-row justify-evenly mt-2">

                <div className=" bg-gradient-to-r from-red-400 to-amber-300 px-2 rounded-lg flex flex-col justify-center items-center">
                    <p className="text-black" > Mood </p>
                </div>

                <div className=" bg-gradient-to-r from-green-600 to-red-200 px-2 rounded-lg flex flex-col justify-center items-center">
                    <p className="text-black" > Mood </p>
                </div>

                
                </div>

                </div>
    )
}