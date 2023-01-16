import React from 'react'
import Head from 'next/head'
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { bodyGradient } from 'styles/gradient.css'
import { useForm, SubmitHandler } from "react-hook-form";



type SongInputs = {

    title: string,
    producer: string,
    writers: [string],
    artist: string,
    featured: [string],
    mixMaster: string,
    mDescription: string,
    nameRequired: string
};

const Create: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SongInputs>();
    const onSubmit: SubmitHandler<SongInputs> = data => console.log(data);

    return (
        <div className='flex place-content-center'>
            <Head>
                <title>Create Your Sound</title>
                <meta name="description" content="Create Your Sound" />
                <meta property="og:url" content={`https://mine.fm/create}`} />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={bodyGradient} />

            <div className='flex-col mt-32 w-3/4 p-4 border border-solid border-red-700 '>
                <h2> Create a Sound onChain </h2>

                <div className='flex flex-row space-x-6'>
                    <p>Song</p>

                    <p>Mood</p>

                    <p>Collection</p>
                </div>

                <div className='w-inherite border border-white opacity-10 border-solid -mt-3'></div>

                <div className='mt-12'>
                    <h2> Song Information </h2>
                    <p className='opacity-40 -mt-4'> Required* </p>

                   {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }
                    <form className='flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="song title"> Title </label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input {...register("title", { required: true })} />

                        <label htmlFor="producer"> Producer </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="test" {...register("producer")} />

                        <label htmlFor="writers"> Writers </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="test" {...register("writers")} />

                        <label htmlFor="featuredArtist"> Featured Artist </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="test" {...register("featured")} />

                        <label htmlFor="mixMaster"> Mix and Master </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="test" {...register("mixMaster")} />

                        <label htmlFor="description"> How Would You Describe the Song? </label>
                        <p className='opacity-40 -mt-4'> Description </p>

                        {/* register your input into the hook by invoking the "register" function */}
                        <textarea defaultValue="test" {...register("mDescription")} />

                        {/*//TODO: Add Rigth side form preview and add color picker */}
                        {/*//TODO: update footer icon with white outline */}


                        {/* errors will return when field validation fails  */}
                        {errors.nameRequired && <span>This field is required</span>}

                        <input type="submit" />
                    </form>
                </div>


            </div>

        </div>
    )
}

export default Create