import React from "react";
import Image from "next/image";


export const MoodCard = () => {


    return (
        <div className=" flex flex-col w-fit h-fit rounded-lg bg-black p-2 justify-center">
                <div style={{}} className="flex h-48 w-max self-center justify-self-center border-solid border-[#EFE9DB] bg-gradient-to-r from-blue-500 to-blue-300 drop-shadow-lg rounded-lg mb-4 relative aspect-square">
              
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

                <div className=" w-28 mx-2 border-solid border-gray-500 rounded-lg flex flex-col justify-center items-center">
                    <button className=" bg-transparent"> View songs </button>



                </div>

                <div className="border-gray-500 border-solid w-28 mx-2 rounded-lg flex flex-col justify-center items-center" >
                <p className=""> Vote </p>
                </div>
                </div>

                </div>
    )
}