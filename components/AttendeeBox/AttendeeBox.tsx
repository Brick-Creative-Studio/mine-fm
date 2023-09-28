import React from "react";
import { User } from "../../types/User";
import AttendeeModal from "../Modals/AttendeeModal";

interface Props {
  user: User
}
export default function AttendeeBox({ user } : Props) {

  const userGradient = `linear-gradient(to ${user?.direction}, ${user?.colorOne}, ${user?.colorTwo}, ${user?.colorThree})`

  return (
      <AttendeeModal user={user}/>
    )
}