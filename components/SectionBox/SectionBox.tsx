import React from "react";
import { Popover, Transition } from "@headlessui/react";


export default function SectionBox() {
  const sectionInitial = 'MT'

  return (

    <Popover>
      <Popover.Button className={'bg-transparent'}>
        <div className={'flex flex-col items-center'}>
          <div className={'rounded-lg bg-[#FF8500]/75 w-[60px] h-[60px] flex items-center justify-center'}>
            <h3> {`${sectionInitial}`}</h3>
          </div>
          <p className={'text-center'}>Mine Team</p>
        </div>
      </Popover.Button>
      <Transition>
        {/*TODO: Add Popover Panel styling that overlays section grid */}
        <Popover.Panel>
          Some Stuff
        </Popover.Panel>
      </Transition>
    </Popover>

  )
}