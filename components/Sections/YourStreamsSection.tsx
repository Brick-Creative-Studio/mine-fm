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
  const [memoryCards, setMemoryCards] = useState<string[]>([])
  useEffect(() => {
    console.log('USER ID', userId)
    const fetchUserRsvps = async () => {
      const userRSVPs: Rsvp[] = await getRSVPsWhere(userId)
      console.log('check rsvps', userRSVPs)
      if (userRSVPs) {
        const array: string[] = []

        for(let i = 0; i < userRSVPs.length; i++){
          const userEventsReq = await getEventsWhere({ id: userRSVPs[i].eventID })
          if (userEventsReq) {
            const memoryCard = userEventsReq[0].memoryCard
            array.push(memoryCard!)
          }
        }
        // userRSVPs.forEach(async (rsvp: Rsvp) => {
        //
        // })
        setMemoryCards(array)
      }
    }
    fetchUserRsvps()
  }, [userId])
  {console.log('MEMORY CARDS', memoryCards)}

  return memoryCards ? (
    <div className="flex items-center justify-start h-96 w-[100vw]">
      {memoryCards.map((card) => {
        return (
          <div className="w-[300px] aspect-square relative" key={card}>
            <Image layout="fill" src={card} alt="memory-card" />
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
