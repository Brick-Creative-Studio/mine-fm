import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image'
import styles from './MSForm.module.css'

type MSInputs = {

    title: string,
    producer: string,
    writers: [string],
    artist: string,
    featured: [string],
    mixMaster: string,
    mDescription: string,
    nameRequired: string
};



export default function MoodScapeForm({ }){


    const { register, handleSubmit, formState: { errors } } = useForm<MSInputs>();
    const onSubmit: SubmitHandler<MSInputs> = data => console.log(data);
    const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
    const [isUploading, setIsUploading] = React.useState<boolean>(false)

    const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']


    const handleFileUpload = React.useCallback(
        async (_input: FileList | null) => {

            if (!_input) return
            const input = _input[0]

            setUploadArtworkError(false)

            if (input?.type?.length && !acceptableMIME.includes(input.type)) {
                setUploadArtworkError({
                    message: `Sorry, ${input.type} is an unsupported file type`,
                })
                return
            }

            try {
                setIsUploading(true)

                //     const { cid } = await upload(_input[0], { cache: true })

                // formik.setFieldValue(id, normalizeIPFSUrl(cid))
                setIsUploading(false)
                setUploadArtworkError(null)
            } catch (err: any) {
                setIsUploading(false)
                setUploadArtworkError({
                    ...err,
                    message: `Sorry, there was an error with our file uploading service. ${err?.message}`,
                })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
 
    
    return (            
            <div className='flex-col w-full mt-24 mb-8 p-4'>
                <h2> Connect via Moods IRL  </h2>

                <div className='w-inherite border border-white opacity-10 border-solid -mt-3'></div>

                <div className='flex flex-col justify-evenly'>
                    <div>
                    <h2> MOODSCAPE Information </h2>
                    <p className='opacity-40 -mt-4'> Required* </p>
                    </div>

                    {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col space-y-8 basis-1/2' >
                                <div className='flex flex-col'>
                                    <label htmlFor="song title"> Event Title </label>
                                    {/* include validation with required or other standard HTML validation rules */}
                                    <input type="text" className=' bg-transparent  h-10 border p-2 border-solid rounded-md text-white ' {...register("title", { required: true })} />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="producer" className=''> Host </label>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("producer")} />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="writers"> Curators </label>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <input defaultValue="" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("writers")} />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="featuredArtist"> Theme </label>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <input defaultValue="" placeholder="ex: chill, family-friendly, hi-key" className='bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("featured")} />
                                </div>
                                <div>
                                    <label htmlFor="MS Date" className="mr-2"> Date </label>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <input defaultValue="" type="date" className='mr-16 w-1/3 bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("mixMaster")} />

                                    <label htmlFor="MS Time" className="mr-2"> Time </label>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <input defaultValue="" type="time" className='w-1/3 bg-transparent h-10 border p-2 border-solid rounded-md text-white ' {...register("mixMaster")} />
                                </div>

                                <div>
                                   
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="description"> How Would You Describe the MOODSCAPE Event? </label>
                                    <p className='opacity-40 '> Description </p>


                                    {/* register your input into the hook by invoking the "register" function */}
                                    <textarea defaultValue="feels like summer" className=' bg-transparent  h-44 border p-2 border-solid  rounded-md text-white ' {...register("mDescription")} />
                                </div>
                                {/*//TODO: Add Rigth side form preview and add color picker */}
                                {/*//TODO: update footer icon with white outline */}


                                {/* errors will return when field validation fails  */}
                                {errors.nameRequired && <span>This field is required</span>}

                            </div>

                            <div className='flex flex-col basis-2/5 space-y-12 '>
                                <div>
                                    <label> Poster </label>

                                    <div className='flex justify-center items-center border border-solid w-80 h-80 rounded-md border-zinc-500'>
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
                                        id="file-input"
                                        className='hidden' 
                                        name="file" 
                                        multiple={true} 
                                        onChange={(event) => {
                                            handleFileUpload(event.currentTarget.files)
                                        }} />
                                    </div>
                                </div>
                                <div>
                                   

                                   <input type="submit" value={'Select Moods >'}  className='bg-gradient-to-r from-sky-500 to-indigo-500 h-12 rounded-lg font-mono font-bold text-lg italic w-80 h-[64px] mt-8' />

                                </div>
                            </div>
                        </div>
                    </form>
                </div>


            </div>
    )
}