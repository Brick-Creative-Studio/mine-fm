import React from 'react'
import AttendeeBox from '../AttendeeBox/AttendeeBox'

export default function AudienceGrid({}) {
  return (
    <div className="md:h-[600px] w-full h-96 max-h-screen p-4 overflow-scroll overflow-y-scroll	grid grid-cols-4 gap-4 bg-[#463850]/75">
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox /> <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox /> <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox /> <AttendeeBox />
      <AttendeeBox />
      <AttendeeBox />
      {/*  TODO: Add second box grid for non section friends */}
    </div>
  )
}
