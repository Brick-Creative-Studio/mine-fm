import React from "react";
import Head from "next/head";
import MoodScapeForm from "components/moodscape/form/MSForm";

export default function Moodscape() {


    return (
        <div className='flex w-full px-8 '>
        <Head>
            <title> Make a Mood IRL </title>
            <meta name="description" content="Create Your Sound" />
            <meta property="og:url" content={`https://mine.fm/create}`} />

            <link rel="icon" href="/favicon.ico" />
        </Head>

    <MoodScapeForm/>

      
    </div>
    )
}