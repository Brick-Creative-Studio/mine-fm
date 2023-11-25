import React, { useState } from "react";
import AttendeeBox from '../AttendeeBox/AttendeeBox'
import { User } from "../../types/User";
import { Event } from "../../types/Event";
import axios from 'axios'
import useSWR from "swr";
import getAttendees from "../../data/rest/getAttendees";

interface Props {
  event: Event,
}

export default function AudienceGridSection({ event } : Props) {
  const { data: attendees, error } = useSWR([event?.id], getAttendees, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })
  const [ audience, setAudience ] = useState<User[]>()



  return (
    <div className="md:h-[604px] w-full h-[32rem] p-2 overflow-scroll overflow-y-scroll	 ">
      {
        attendees?.length ? (
          <div className={' grid grid-cols-4 gap-4 md:gap-2  md:p-2 md:gap-y-4 md:grid-cols-4 w-full'}>
            {
              attendees.map((user, index) => {
                return <AttendeeBox key={index} user={user} />
              })
            }

          </div>
        ) : <p className={'mt-24 p-2'}> There are currently no listeners in attendance </p>
      }


    </div>
  )
}
