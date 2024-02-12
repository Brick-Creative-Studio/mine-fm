import React, { useEffect, useState} from "react";
import { EventCard } from "components/Cards/EventCard";
import { LivestreamCard } from "../Cards/LivestreamCard";
import getAllEvents from "../../data/rest/getAllEvents";
import getEventsWhere from "../../data/rest/getEventsWhere";
import { Event } from "../../types/Event";
const StreamLoader = (livestreams: Event[])=> {

}
export default function StreamSection({}) {
  const [events, setEvents] = useState<Event[] | undefined>(undefined)



  useEffect( () => {
    const fetchEvents = async () => {
      const fetchParam = {
        isApproved: true
      }

      const newEvents = await getEventsWhere(fetchParam).then((res) => {
        console.log(res)
        return res

      });
      setEvents(newEvents)
    }

    fetchEvents();

  }, [])

  return (
<>
    <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 md:gap-x-12 flex flex-col items-center justify-center p-4 overflow-scroll">
      { events && events?.length > 0 ? events?.map((event, index) => {
        return (
          <div className={'m-4'}>
            <LivestreamCard streamEvent={event}/>
          </div>

        )
      }) : <p className={'text-center'}> No Live Events are available </p>}

    </div>
</>
  )
}