import React from 'react'
import AttendeeBox from '../AttendeeBox/AttendeeBox'
import { User } from "../../types/User";

interface Props {
  audienceList: User[]
}

export default function AudienceGrid({ audienceList } : Props) {
  return (
    <div className="md:h-[604px] w-full h-96 max-h-screen p-4 overflow-scroll overflow-y-scroll	grid grid-cols-4 gap-4 bg-[#463850]/75">

      {
        audienceList.map((user) => {
          return <AttendeeBox user={user}/>
        })
      }

      {/*  TODO: Add second box grid for non section friends */}
    </div>
  )
}
