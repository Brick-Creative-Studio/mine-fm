import React, { useEffect, useState } from 'react'
import getRSVPsWhere from '../../data/rest/getRSVPsWhere'
import getEventsWhere from '../../data/rest/getEventsWhere'
import { Rsvp } from '../../types/Rsvp'
import { Event } from '../../types/Event'
import Image from 'next/image'
import Link from "next/link";

interface Props {
  aura: string
  userId: string
}
export default function YourStreamsSection({ aura, userId }: Props) {
  const [userEvents, setUserEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchUserRsvps = async () => {
      const userRSVPs: Rsvp[] = await getRSVPsWhere(userId)
      if (userRSVPs) {
        const array: Event[] = []
        for (let i = 0; i < userRSVPs.length; i++) {
          const userEventsReq = await getEventsWhere({ id: userRSVPs[i].eventID })

          if (userEventsReq) {
            const memoryCard = userEventsReq[0]
            array.push(memoryCard!)
          }
        }
        setUserEvents(array)
      }
    }
    fetchUserRsvps()
  }, [userId])
  return userEvents ? (
    <div className="flex items-center justify-start h-96 w-[100vw]">
      {userEvents.map((card, index) => {
        return (
          <div className="w-[300px] cursor-pointer aspect-square relative" key={card.memoryCard}>
            <Link href={`/livestream/${card.id}?tab=chat`}>
            <Image layout="fill" src={card.memoryCard!} alt="memory-card" />
            </Link>
          </div>
        )
      })}
    </div>
  ) : (
    <div className="mt-8 h-96 w-full">
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md'}>
        <p className={'text-[#B999FA]'}>
          You haven't attended any livestreams yet. RSVP to a paid livestream event to
          retrieve a memory card.
        </p>
      </div>
    </div>
  )
}
