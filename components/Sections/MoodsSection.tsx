import React from "react";
import { MoodCard } from "components/Cards/MoodCard";
import { mood001, mood002 } from "../../constants/moods";



export default function MoodsSection({}){

    return(

    <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 md:gap-x-12 flex flex-col items-center justify-center p-4 h-full overflow-scroll">
        <MoodCard mood={mood001}/>


        <MoodCard mood={mood002}/>
    </div>
    )
}