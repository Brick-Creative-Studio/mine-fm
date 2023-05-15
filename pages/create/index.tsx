import React from "react";



export default function CreatePage() {

    return (
        <div className="flex flex-col justify-center items-center mt-24">
            <h1 className="mb-12"> Create </h1>
            
            <div className="flex flex-col justify-center items-center w-2/3 md:w-1/4  h-48 p-4 border-solid border-blue-500/50 rounded-lg bg-black/25 mb-12">
                <h1 className="mt-4"> Onchain </h1>
                <h3 className="-mt-4 text-center"> Mint Music to the Optimism Blockchain, a Blockchain that works with Ethereum. </h3>
                <button className="rounded-lg bg-black/50 mb-2">Feature Coming Soon</button>
            </div >

           
            <div className="flex flex-col justify-center items-center border-solid border-green-500/50 h-56 py-2 px-8 w-2/3 md:w-1/4  rounded-lg bg-black/25 italic  focus:ring">
                <h1 className=""> MOODSCAPE </h1>
                <h3 className="text-center -mt-4"> Create a hybrid event for IRL and online. Contact team for private access </h3>
                <a target="_blank" href="https://mine.fm/Stay-Connected" rel="noopener noreferrer">

                <button className="rounded-lg bg-black/50 cursor-pointer">Contact</button>
                </a>
               
            </div>
        </div>
    )
}