import React from "react";
import Image from "next/image";


export const SongCard = () => {

    return (
        <div className="w-fit h-fit rounded-lg bg-black p-2">
                <div className="flex h-auto ml-1 border-solid border-[#EFE9DB] drop-shadow-lg rounded-lg mb-4 relative aspect-square">
                <Image 
                 layout="fill"
                 sizes="100vw"
                src={'/stock/pa-token.jpg'}
                alt="cover art"
                className='rounded-lg'
                />
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <div>
                        song
                    </div>
                    <div className="w-4 h-4 rounded-full bg-orange-700 border-solid border-[#EFE9DB]"/>
                
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        artist
                    </div>
                    <div className="bg-[#EFE9DB] text-[#9B5B46] w-28  rounded-lg flex flex-row justify-center items-center">
                        122k listens
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-2">

                <div className="bg-[#EFE9DB] w-28 mx-2  rounded-lg flex flex-col justify-center items-center">
                    <p className="text-black"> Price </p>
                    <p className="text-black -mt-2"> 1 Eth </p>


                </div>

                <div className="bg-[#EFE9DB] w-28 mx-2 rounded-lg flex flex-col justify-center items-center" >
                <p className="text-black"> Highest Bid </p>
                <p className="text-black -mt-2"> 1 Eth </p>
                </div>
                </div>

                </div>
    )
}