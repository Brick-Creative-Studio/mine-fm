import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image'
import styles from '../../pages/create/create-sound/styles.module.css'
import SingleImageUpload from "../SingleImageUpload/SingleImageUpload";

type SongInputs = {

    title: string,
    artWork: string,
    producer: string,
    writers: [string],
    artist: string,
    featured: [string],
    mixMaster: string,
    mDescription: string,
    nameRequired: string
};



export default function SongForm({ }){


    const { register, handleSubmit, formState: { errors } } = useForm<SongInputs>();
    const onSubmit: SubmitHandler<SongInputs> = data => console.log(data);

    
    return (            
           
                <div className='flex flex-col justify-evenly'>
                    <div>
                    <h2> Song Information </h2>
                    <p className='opacity-40 -mt-4'> Required* </p>
                    </div>

                    {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
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
                                    <textarea defaultValue="feels like summer" className=' bg-transparent  h-44 border p-2 border-solid  rounded-md text-white ' {...register("mDescription")} />
                                </div>

                                {/* errors will return when field validation fails  */}
                                {errors.nameRequired && <span>This field is required</span>}

                                <input type="submit" className='bg-gradient-to-r from-sky-500 to-indigo-500 h-12 rounded-lg font-mono font-bold text-lg italic' />
                            </div>

                            <div className='flex flex-col basis-2/5 space-y-12 '>
                                <div>
                                    <label> Artwork </label>

                              <SingleImageUpload id={'Song Artwork'} alt={'song artwork'} name={'artWork'}/>
                                </div>
                                <div>
                                    <label htmlFor="file-input"> Upload Song </label>
                                    <div className='flex justify-center items-center border border-solid w-80 h-24 rounded-md border-zinc-500'>

                                    <label htmlFor="file-input">
                                        <Image
                                            src={"/plus-icon.png"}
                                            alt='add-art'
                                            width={42}
                                            height={42}
                                            className='cursor-pointer'
                                        />
                                        </label>
                                        <input 
                                        type="file" 
                                        className='hidden'
                                        name="file" 
                                        />
                                    </div>
                                   <p className='text-xs '> AIF, WAV, M4A, MP4, MP3, or FLAC. <br/> Max 100mb.</p>
                                    
                                </div>
                                <div>
                                    <label htmlFor="description"> Add a Color to Match the Mood </label>
                                    <div className='flex justify-center self-center ml-20 mt-4 w-40 h-40'>
                                        <input type="color" className={styles.style2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>


    )
}