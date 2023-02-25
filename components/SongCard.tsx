import React from "react";
import coverArt from "../public/sample-cl-alchemist.png"
import Image from "next/image";


export const SongCard = () => {

    return (
        <div className="w-[267px] h-[367px] rounded-lg bg-[#535353] p-2">
                <div className="flex w-fit h-fit ml-1 border-solid border-[#EFE9DB] drop-shadow-lg rounded-lg mb-4">
                <Image 
                width={240}
                height={240}
                src={coverArt}
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
                    <div className="bg-[#EFE9DB] text-[11px] text-[#9B5B46] w-28  rounded-lg flex flex-row justify-center items-center">
                        122k listens
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-2">

                <div className="bg-[#EFE9DB] w-[119px] h-[44px] rounded-lg flex flex-col justify-center items-center">
                    <p className="text-black text-[11px]"> Price </p>
                    <p className="text-black text-[11px] -mt-2"> 1 Eth </p>


                </div>

                <div className="bg-[#EFE9DB] w-[119px] h-[44px] rounded-lg flex flex-col justify-center items-center" >
                <p className="text-black text-[11px]"> Highest Bid </p>
                <p className="text-black text-[11px] -mt-2"> 1 Eth </p>
                </div>
                </div>

                </div>
    )
}