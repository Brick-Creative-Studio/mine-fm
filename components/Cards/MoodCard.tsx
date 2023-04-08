import React from "react";
import Image from "next/image";


export const MoodCard = () => {


    return (
        <div className=" flex flex-col w-fit h-fit rounded-lg bg-black p-2 justify-center">
                <div style={{}} className="flex h-48 w-max self-center justify-self-center border-solid border-[#EFE9DB] drop-shadow-lg rounded-lg mb-4 relative aspect-square">
              
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <div>
                        creator
                    </div>
                    <div className="bg-[#EFE9DB] text-[#9B5B46] w-28  rounded-lg flex flex-row justify-center items-center">
                        Minertag
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        Mood
                    </div>
                    <div className="bg-[#EFE9DB] text-[#9B5B46] w-28  rounded-lg flex flex-row justify-center items-center">
                        Mood
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-2">

                <div className="bg-[#EFE9DB] w-28 mx-2  rounded-lg flex flex-col justify-center items-center">
                    <button className="text-black bg-transparent"> View songs </button>



                </div>

                <div className="bg-[#EFE9DB] w-28 mx-2 rounded-lg flex flex-col justify-center items-center" >
                <p className="text-black"> Vote </p>
                </div>
                </div>

                </div>
    )
}