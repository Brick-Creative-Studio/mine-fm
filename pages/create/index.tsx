import React from "react";



export default function CreatePage() {

    return (
        <div className="flex flex-col justify-center items-center mt-24">
          <div className={'flex flex-col  items-center '}>
            <h1 className={'my-1'}> Create a Moodscape </h1>
            <p className="mb-16 text-lg"> A token gated event to enjoy music with a community and share your mood </p>
          </div>
            
            <div className="flex flex-col justify-center items-center w-2/3 md:w-1/4  h-48 p-4 border-solid border-blue-500/50 rounded-lg bg-black/25 mb-12">
                <h1 className="mt-4"> Livestream </h1>
                <h3 className="-mt-4 text-center"> Audio livestreams events with reward distributions. Token gated and intimate. </h3>
                <button className="rounded-lg bg-transparent mb-2">Feature Coming Soon</button>
            </div >

           
            <div className="flex flex-col justify-center items-center border-solid border-green-500/50 h-56 py-2 px-8 w-2/3 md:w-1/4 mb-12 rounded-lg bg-black/25  focus:ring">
                <h1 className=""> IRL </h1>
                <h3 className="text-center -mt-4"> Create a hybrid event for IRL and online. Contact team for private access </h3>
                <a target="_blank" href="https://mine.fm/Stay-Connected" rel="noopener noreferrer">

                <button className="rounded-lg bg-transparent cursor-pointer">Contact</button>
                </a>
               
            </div>
        </div>
    )
}