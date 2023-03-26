import React from 'react'

export default function EventMoods({}) {
  return (
    <div className="flex flex-col m-8 ">
      <div className="flex w-2/3 rounded-lg h-32 border-solid border-white mb-8 bg-[#535353]/50">
        <div className="h-full w-32 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg" />
        <div className='m-2 ml-4'> 
            <p> Curator: Stonie Blue </p>
            <h2> Mood: Uplift </h2>
        </div>
      </div>

      <div className="flex w-2/3 rounded-lg h-32 border-solid border-white bg-[#535353]/50">
        <div className="h-full w-32 bg-gradient-to-r from-green-500 to-green-300 rounded-lg" />
        <div className='m-2 ml-4'> 
            <p> Curator: Keith Charles </p>
            <h2> Mood: Swing </h2>
        </div>
      </div>
    </div>
  )
}
