import React from "react";
import SectionBox from "../SectionBox/SectionBox";

export default function SectionsGrid({}){

  return(
    <div className="w-full h-80 max-h-screen p-4 overflow-scroll overflow-y-scroll grid grid-cols-4 gap-4 bg-[#463850]/75">
      <SectionBox/>
    </div>

    )
}