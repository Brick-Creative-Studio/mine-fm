import React from "react";
import { SongCard } from "components/SongCard";
import { MSCard } from "modules/moodscape/MSCard";

export default function Explore({}){

    return(
        <div className="flex flex-col mt-28 mx-32">

            <div>
                <h2> Moodscapes </h2>
            </div>

            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col">
                <h3 className="mx-8"> Explore </h3>
                <div className="w-auto h-0.5 bg-sky-500/75"/>
                </div>

                <div>
                <h3 className="mx-8"> My MoodScapes </h3>
                {/* Add conditonal state logic when path changes */}
                <div className="w-auto h-0.5 bg-sky-500/75 hidden"/>
                </div>

            </div>
            <div className="w-full h-0.5 bg-gray-500/75"/>

            <div className="grid grid-cols-4 gap-4 p-4">

        <MSCard/>

        <MSCard/>
        <MSCard/>
        <MSCard/>
        <MSCard/>
        <MSCard/>
        <MSCard/>


            </div>


        </div>
    )

}