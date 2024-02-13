import React from "react";
import { MoodCard } from "components/Cards/MoodCard";
import { mood001, mood002, mood003, mood004 } from "../../constants/moods";



export default function MoodsSection({}){

    return(

    <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 md:gap-x-12 flex flex-col items-center justify-center mx-auto w-full p-4 h-full overflow-scroll">
        <MoodCard mood={mood004}/>
        <MoodCard mood={mood003}/>
        <MoodCard mood={mood002}/>
        <MoodCard mood={mood001}/>

    </div>
    )
}