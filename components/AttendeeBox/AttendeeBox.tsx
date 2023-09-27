import React from "react";
import { User } from "../../types/User";

interface Props {
  user: User
}
export default function AttendeeBox({ user } : Props) {

  const userGradient = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`

  return (
      <div className={'flex flex-col items-center cursor-pointer'}>
        <div style={{ background: userGradient }} className={'rounded-full w-[40px] h-[40px] '}/>
        <p className={'text-center'}> {user.name }</p>
      </div>
    )
}