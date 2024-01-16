import React, { useEffect, useState } from 'react'
import getRSVPsWhere from '../../data/rest/getRSVPsWhere'
import getEventsWhere from '../../data/rest/getEventsWhere'
import { Rsvp } from '../../types/Rsvp'
import { Event } from '../../types/Event'
import Image from 'next/image'

interface Props {
  aura: string
  userId: string
}
export default function YourStreamsSection({ aura, userId }: Props) {
  const [memoryCards, setMemoryCards] = useState<(string | null)[]>([])
  useEffect(() => {
    const fetchUserRsvps = async () => {
      const userRSVPs = await getRSVPsWhere(userId)
      if (userRSVPs) {
        const userEvents = userRSVPs.map(async (rsvp: Rsvp) => {
          const userEventsReq = await getEventsWhere({ id: rsvp.eventID }).then((res) => {
            return res
          })
          if (userEventsReq) {
            const memoryCards = userEventsReq.map((event: Event) => event.memoryCard)
            setMemoryCards(memoryCards)
          }
          return userEvents
        })
      }
    }

    fetchUserRsvps()
  }, [userId])
  return memoryCards ? (
    <div className="mt-8 h-96 w-full">
      {memoryCards.map((card) => {
        return <Image width="100" height="100" src={card} />
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
