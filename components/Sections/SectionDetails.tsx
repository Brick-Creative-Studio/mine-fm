import React from 'react'
import { Popover, Transition } from '@headlessui/react'

export default function SectionDetails({}) {
  return (
    <Popover>
      <Transition>
        <Popover.Panel>
          Some Stuff
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
