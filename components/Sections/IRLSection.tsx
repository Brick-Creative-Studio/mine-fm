import React from "react";
import { EventCard } from "components/Cards/EventCard";
import { SongCard } from "../Cards/SongCard";


export default function IRLSection({}) {

  return (
    <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 md:gap-x-12 flex flex-col items-center justify-center p-4 overflow-scroll">
      <EventCard id="1"/>
    </div>
  )
}