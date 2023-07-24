import React from 'react'
import Image from 'next/image'
import { defaultUploadStyle } from "../SingleImageUpload/SingleImageUpload.css";

export default function AdminSection({}) {
  const hostTitle = 'Brick Studio'
  const attendanceCount = 210
  const entryFee = 0.013
  const treasury = 3.287
  const channelName = 'Titi Me Pregunto'
  const eventDate = '8.10.23'
  const eventTime = '5-7pm EST'

  return (
    <div className={'flex flex-col h-96 px-4 overflow-scroll md:h-[600px]'}>
      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-5/12'}> ROOM DETAILS </h3>
        <div className={'h-0.5 w-2/3 bg-sky-500/75'} />
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Attendance: </p>
        <p className={'text-[#F25C54]'}> {`${attendanceCount}`} </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Current Entry Fee: </p>
        <p className={'text-[#F25C54]'}> {`${entryFee} eth`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Treasury: </p>
        <p className={'text-[#F25C54]'}> {`${treasury} eth`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2'}> CHANNEL DETAILS </h3>
        <div className={'h-0.5 w-1/2 bg-sky-500/75'} />
      </div>

      <div className={'flex-col flex'}>
        <label className={'mr-2 '}> Channel Name: </label>
        <input
          placeholder={channelName}
          className=" bg-transparent h-8 md:w-2/3 border p-2 border-solid rounded-md text-white "
        />
      </div>
      <div className={'flex'}>
        <div className={'flex-col flex w-1/2 mr-8'}>
          <p className={'mr-2'}> Event Date: </p>
          <input
            defaultValue=""
            type="date"
            className=" bg-transparent h-10 border p-2 border-solid rounded-md text-white "
          />
        </div>
        <div className={''}>
          <p className={'mr-2'}> Event Time: </p>
          <input
            defaultValue=""
            type="time"
            className=" bg-transparent h-10 border p-1 w-fit border-solid rounded-md w-full text-white "
          />
        </div>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2'}> AUDIO SETTINGS </h3>
        <div className={'h-0.5 w-2/3 bg-sky-500/75'} />
      </div>

      <div className={'flex-col flex mb-4'}>
        <label className={''}> Audio Input </label>
        <select id="cars" name="cars">
          <option value="volvo">Volvo</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className={'flex-col flex my-2'}>
        <label className={''}> Microphone Input </label>
        <select id="cars" name="cars">
          <option value="volvo">Volvo</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-fit mr-6'}> DOWNLOADABLE CONTENT </h3>
        <div className={'h-0.5 w-1/3 bg-sky-500/75'} />
      </div>
      <div className={'flex-col flex my-2'}>
        <label className={'mb-4'}> Please upload content for the livestream below  </label>
        <input
          className={''}
          id="file-upload"
          data-testid="file-upload"
          type="file"
          multiple={true}
        />
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2'}> SHARE DETAILS </h3>
        <div className={'h-0.5 w-2/3 bg-sky-500/75'} />
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <button className={'bg-transparent'}>
          <Image width={24} height={24} src={'/share.svg'} alt="share button" />
        </button>
        <p className={'text-[#F25C54] ml-2'}> Share </p>
      </div>
      <input
        placeholder={channelName}
        className=" bg-transparent h-8 md:w-2/3 border p-2 border-solid rounded-md text-white "
      />
      <div className={'flex-row flex items-center w-full'}>
        <button className={'bg-transparent'}>
          <Image width={24} height={24} src={'/globe.svg'} alt="share button" />
        </button>
        <p className={'text-[#F25C54] ml-2'}> Socials / Website </p>
      </div>
      <input
        placeholder={channelName}
        className=" bg-transparent h-8 mb-4 md:w-2/3 border p-2 border-solid rounded-md text-white "
      />
    </div>
  )
}
