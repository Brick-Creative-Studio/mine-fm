import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from "axios";
import { useProfileStore } from '../../stores'
import Link from "next/link";
import { useAccount} from "wagmi";
import { Event } from "../../types/Event";
import { Attendee } from "../../types/Attendee";
import { User } from "../../types/User";
import process from "process";
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';


export default function StreamInfoPage({}) {
  const router = useRouter()
  const {id} = router.query

  const [ isLoading, setLoading] = useState<boolean>(false)
  const [ isOwner, setIsOwner] = useState<boolean>(false)
  const [event, setEvent] = useState<Event | null >(null)
  const [ attendees, setAttendees] = useState<User[] | null >(null)

  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { id: accountId } = useProfileStore()

  const formatDate = event ? new Date(event.startDate).toLocaleDateString("en-US", { weekday: "long",year: "numeric", month: "long", day: "numeric",}) : 'N/A'
  const formatTime = event ? new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : 'N/A'


  useEffect(() => {
    const endpoint = 'event/event'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
    const attendeeEndpoint = `attendee/${id}`
    const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
    const userEndpoint = 'user/user'
    const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint


    async function fetchEvent(){
      console.log('id query', id)
      if(id){
         const data = await axios.post(url, {
          id
        }).then((res) => {
          setEvent(res.data)
          setLoading(false)
          console.log('event data', res.data)
          return res.data;
        }).catch((error) => {
          setEvent(null)
          router.push('/404')
          console.log('error fetching event data:', error)
        })

        const attendeesList : Attendee[] | null = await axios.get(rsvpURL).then((res) => {
          return res.data
        }).catch((error) => {
          console.log('error fetching stream data:', error)
        })

        const rsvpList : User[] | null = attendeesList ?  await Promise.all(
          attendeesList.map(async (attendee) => {
            return await axios.post(userURL, {
              id: attendee.userID
            }).then((res) => {
              setAttendees(res.data)
              return res.data
            }).catch((error) => {
              console.log('error fetching stream data:', error)
            })
          })
        ) : null

        console.log(rsvpList)



        if (!data) await router.push('/404')
      } else {
        setEvent(null)
        // await router.push('/404')
      }
      }

    if(!event){
      setLoading(true)

      fetchEvent()
    }
  }, [id])


  async function rsvp() {
    const attendeeEndpoint = `attendee/create`
    const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint

    if (!isConnected  && openConnectModal){
      openConnectModal()
      return
    }

    if(event?.ownerAddress === address as string){
      console.log('rsvpiing:')

      await router.push(`/livestream/${id}`)
      return
    }

     if(attendees && attendees.length > 1) {

       attendees.map((user) => {
         if(user.walletAddress === address as string) {
            router.push(`/livestream/${id}`)
           return
         }
       })
     }

      await axios.post(rsvpURL, {
         userID: accountId,
         eventID: id
       }).then((res) => {
         router.push(`/livestream/${id}`)
       }).catch((error) => {
         console.log('error rsvping to event:', error)
       })
  }
  //
  return (
    <div className="flex flex-col mt-24 items-center justify-center w-full">
      { event ? (
        <div className="flex flex-col p-4 sm:w-full md:w-3/4">
          <div className="flex flex-col mx-auto md:mx-0 md:flex-row md:mr-12">

              <div className=" md:mr-8">
                <Image
                  src={`${event.posterURL}`}
                  width={340}
                  height={340}
                  alt={'moodscape poster'}
                />

           </div>
              <div className="flex flex-col md:mx-auto ">
                <div>
                  <p className={'text-[32px] md:mt-0'}> { event.title } </p>
                  <button onClick={() => rsvp()} className={'bg-[#FF8500] hover:bg-orange-300 m-2 rounded-sm cursor-pointer'}>
                    <h3 className={'text-sm text-[#1D0045]'}> ENTER STREAM </h3>
                  </button>
                </div>
                <div className="mt-2 flex flex-col ">
                  <div className={'flex'}>
                    <Image src={'/user-icon-orange.svg'}  width={18} height={18}/>
                    <p className={'ml-2'}> {`${event.organizer}`}</p>
                  </div>
                  <div className={'flex'}>
                    <Image src={'/calendar.svg'}  width={18} height={18}/>
                    <p className={'ml-2'}> {formatDate}</p>
                  </div>
                  <div className={'flex'}>
                    <Image src={'/clock.svg'}  width={18} height={18}/>
                    <p className={'ml-2'}> {formatTime}</p>
                  </div>
                </div>
                <div className={'flex flex-col mt-auto text-[#FF8500]'}>
                  <p> 30 Attendees </p>
                  <div>
                    <div className={'w-10 h-10 bg-blue-500 rounded-full'} />
                  </div>
                </div>

            </div>

          </div>
          <div className="flex flex-col px-2 md:py-4 items-center">
            <p className={'text-[32px] self-start'}> Description </p>
            <p className={'text-xl text-start self-start'}>
              { event.description }
            </p>
          </div>
          <div className="flex flex-row p-2 w-full justify-center rounded-lg">
            {/* attendance list box component */}
            {/* TODO: Break out to separate component  */}
            <div className="w-full h-80 bg-black/50 border-solid border-gray-500 rounded-lg flex items-center justify-center">
              <p className={'text-center'}>
                {' '}
                The organizer has not made any announcements yet{' '}
              </p>
            </div>
          </div>
        </div>) : (
          <div>
            Loading...
          </div>
      )
      }
    </div>
  )
}
