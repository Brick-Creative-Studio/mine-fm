import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import { useProfileStore } from 'stores'
import { useForm } from 'react-hook-form'
import { Switch } from '@headlessui/react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

interface SongInput {
  songAndArtist: string
  isMoodOne: boolean
}

type Moody = {
  song: SongInput[]
  miner: string
  mood: string
}

export const SongCell: React.FC<SongInput> = ({ songAndArtist, isMoodOne}) => {
  return (
    <div className="flex w-full h-16 bg-black/50 rounded-xl border-solid border-r-0 border-gray-400">
      <div className="flex flex-row w-full items-center  px-2 space-x-2 > * + *	">
        {isMoodOne ? <div className="bg-gradient-to-r from-yellow-500 to-yellow-100 w-12 h-12 mr-4 rounded-xl" /> : <div className="bg-gradient-to-r from-blue-500 w-12 h-12 mr-4 rounded-xl" />}
        {songAndArtist}


      </div>
    </div>
  )
}

export default function MoodyModal() {
  let [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  const [moody, setMoody] = useState<Moody>()
  const [songs, setSong] = useState<string[]>([])
  const [isMoodOne, setMood] = useState(false)

  const deleteSong = (songIndex: number) => {
    const newSongArr = songs.filter((value, index) => {
      if (songIndex !== index) return
    })
    setSong((songs) => songs.filter((value, index) => index !== songIndex))
  }

  const handleSubmitNewSong = () => {
    const song: SongInput = {
      songAndArtist: getValues('songAndArtist'),
      key: songs
    }
    if (songs.length < 3) {
      setSong((songs) => [...songs, song.songAndArtist])
      resetField('songAndArtist')
    }
    console.log('max songs added')
  }

  useEffect(() => {
    console.log('songs array:', songs)
  })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="self-center bg-transparent hover:bg-sky-100/50 cursor-pointer rounded-lg w-fit"
        onClick={openModal}
      >
        <Image
          src={'/disc.svg'}
          width={32}
          height={32}
          color="white"
          alt={'make button'}
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-0" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                    Type in an artist and song and add it to your Moody. A moody is like a
                    mini playlist for a certain mood. (Max: 3 songs)
                  </Dialog.Title>
                  <form>
                    <div className="mt-2">
                      <div className="mb-3 xl:w-96">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                          <input
                            type="search"
                            className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal outline-none transition duration-300 ease-in-out focus:border-primary focus:shadow-te-primary focus:outline-none  dark:placeholder:text-neutral-200"
                            placeholder="ex: Frank Ocean - Blonde"
                            aria-label="song-input"
                            aria-describedby="song input"
                            {...register('songAndArtist', { required: true })}
                          />

                          <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="addSong-button"
                            onClick={handleSubmitNewSong}
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 12 14"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Switch
                        checked={isMoodOne}
                        onChange={setMood}
                        className={`${isMoodOne ? 'bg-gradient-to-r from-yellow-500 to-yellow-100' : 'bg-gradient-to-r from-blue-500 to-blue-300'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >

                        <span
                          aria-hidden="true"
                          className={`${isMoodOne ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                      <p>{isMoodOne ? 'Mood: Urgent': 'Mood: Uplifting'}</p>
                    </div>
                    <div className="mt-4 items-center justify-center flex flex-col">
                      <div className="flex flex-col items-center justify-center  border-black border-solid h-56 w-full rounded-xl mt-4 overflow-y-scroll">
                        {songs.length ? (
                          songs.map((value, index) => {
                            return (
                                <div className={'flex w-full'}>
                                <SongCell isMoodOne={isMoodOne} songAndArtist={value} />
                            <button type={'button'} className={'bg-black/50 rounded-lg border-solid border-gray-400 justify-self-end border-l-0'} onClick={() => deleteSong(index)}  >
                              <Image alt={'delete-song'} src={'/trash.svg'} className={''} width={16} height={16}/>
                            </button>
                                </div>
                            )
                          })
                        ) : (
                          <p className="text-white">No Songs added yet</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center mt-4 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Save Selections to Moody
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
