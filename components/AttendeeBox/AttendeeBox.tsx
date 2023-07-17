import React from "react";


export default function AttendeeBox() {
    return (
      <div className={'flex flex-col items-center'}>
        <div className={'rounded-full bg-red-600 w-[40px] h-[40px]'}/>
        <p className={'text-center'}>John Smith</p>
      </div>
    )
}