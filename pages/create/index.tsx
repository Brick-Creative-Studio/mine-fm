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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-row justify-between'>
                    <div className='flex flex-col space-y-8 basis-1/2' >
                        <div className='flex flex-col'>
                        <label htmlFor="song title"> Title </label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="text" className=' bg-transparent  h-10 border p-2 border-solid rounded-md text-white ' {...register("title", { required: true })} />
                        </div>

                        <div className='flex flex-col'>
                        <label htmlFor="producer" className=''> Producer </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("producer")} />
                        </div>

                        <div className='flex flex-col'>
                        <label htmlFor="writers"> Writers </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("writers")} />
                        </div>

                        <div className='flex flex-col'>
                        <label htmlFor="featuredArtist"> Featured Artist </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("featured")} />
                        </div>
                        <div className='flex flex-col'>
                        <label htmlFor="mixMaster"> Mix and Master </label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("mixMaster")} />
                        </div>

                        <div className='flex flex-col'>
                        <label htmlFor="description"> How Would You Describe the Song? </label>
                        <p className='opacity-40 '> Description </p>
                        

                        {/* register your input into the hook by invoking the "register" function */}
                        <textarea defaultValue="" className=' bg-transparent  h-44 border p-2 border-solid  rounded-md text-white ' {...register("mDescription")} />
                        </div>
                        {/*//TODO: Add Rigth side form preview and add color picker */}
                        {/*//TODO: update footer icon with white outline */}


                        {/* errors will return when field validation fails  */}
                        {errors.nameRequired && <span>This field is required</span>}

                        <input type="submit" className='' />
                        </div>

                        <div className='flex flex-col basis-2/5 space-y-12 '>
                        <div>
                        <label htmlFor="description"> Artwork </label>

                        <div className='border border-solid w-80 h-80 rounded-md border-zinc-500'>
                        <input type="file"  />
                        </div>
                        </div>
                        <div>
                        <label htmlFor="description"> Upload A File </label>
                        <div className='border border-solid w-80 h-24 rounded-md border-zinc-500'>

                        <input type="file" className='' />
                        </div>
                        </div>
                        <div>
                        <label htmlFor="description"> Add a Color to Match the Mood </label>
                        <div className='border border-solid w-80 h-24 rounded-md border-zinc-500'>
                        <input type="color" className='' />
                        
                        </div>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>


            </div>

        </div>
    )
}

export default Create