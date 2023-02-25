import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function CreatePage() {

    return (
        <div className="flex flex-col justify-center items-center">
            <Link
            href={"create/onchain"}
            key={'onchain'}
            >
            <button className="flex justify-center items-center border-solid border-white h-32 w-1/4 mt-56 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-500 italic cursor-pointer focus:ring">
                <h1 className="mr-4"> Onchain </h1>
                <Image
                    src={"/play.svg"}
                    alt='go-onchain'
                    width={32}
                    height={32}
                />
            </button>
            </Link>

            <Link
            href={"create/moodscape"}
            key={'moodscape'}
            >
            <button className="flex justify-center items-center border-2 border-solid border-white h-32 w-1/4 mt-12 rounded-lg bg-gradient-to-r from-red-400 to-amber-300 italic cursor-pointer focus:ring">
                <h1 className="mr-4"> Moodscape </h1>
                <Image
                    src={"/play.svg"}
                    width={32}
                    height={32}
                    alt='go-irl'
                />
            </button>
            </Link>
        </div>
    )
}