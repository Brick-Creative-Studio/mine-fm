import React from 'react'
import AttendeeBox from '../AttendeeBox/AttendeeBox'
import { User } from "../../types/User";

interface Props {
  audienceList: User[] | null
}

export default function AudienceGridSection({ audienceList } : Props) {
  return (
    <div className="md:h-[604px] w-full h-[32rem] p-2 overflow-scroll overflow-y-scroll	 ">
      {
        audienceList?.length ? (
          <div className={' grid grid-cols-4 gap-4 md:gap-2  md:p-2 md:gap-y-4 md:grid-cols-4 w-full'}>
            {
              audienceList.map((user, index) => {
                return <AttendeeBox key={index} user={user} />
              })
            }

          </div>
        ) : <p className={'mt-24 p-2'}> There are currently no listeners in attendance </p>
      }


    </div>
  )
}
