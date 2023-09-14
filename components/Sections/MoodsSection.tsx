import React from "react";
import { MoodCard } from "components/Cards/MoodCard";
import { EventCard } from "../Cards/EventCard";



export default function MoodsSection({}){

    return(

    <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 md:gap-x-12 flex flex-col items-center justify-center p-4 overflow-scroll">
        <MoodCard/>
    </div>
    )
}