import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'

export default function SectionBox() {
  const sectionInitial = 'MT'
  const sectionName = 'Mine Team'
  const hostTag = 'bbah'
  const attendanceCount = 231

  return (
    <Popover className={'relative w-screen'}>
      <Popover.Button className={'bg-transparent focus:outline-none'}>
        <div className={'flex flex-col items-center'}>
          <div
            className={
              'rounded-lg bg-[#FF8500]/75 w-[60px] h-[60px] flex items-center justify-center'
            }
          >
            <h3> {`${sectionInitial}`}</h3>
          </div>
          <p className={'text-center'}>Mine Team</p>
        </div>
      </Popover.Button>
      <Transition>
        {/*TODO: Add Popover Panel styling that overlays section grid */}
        <Popover.Panel
          className={
            'absolute left-0 top-0 right-0 bottom-0 z-10 h-full w-11/12 bg-[#240045] rounded-md'
          }
        >
          {({ close }) => (
            <>
              <Popover.Button
                className={'bg-transparent absolute right-0 m-2'}
                onClick={() => close()}
              >
                <Image src={'/cross-2.svg'} width={32} height={32} />
              </Popover.Button>

              <div className={'flex flex-col p-3'}>
                <h2 className={'m-0'}>{`${sectionName}`}</h2>
                <div className={'flex -mt-2'}>
                  <p className={'mr-1'}>{`@${hostTag}`}</p>
                  <p className={'ml-2 bg-[#984DDF] rounded-lg px-2'}>
                    {attendanceCount + ` Attendees`}
                  </p>
                </div>
                <div className={'flex h-48 w-full'}>
                  <div className={'flex flex-col items-center justify-center border-4 border-solid border-[#F25C54] w-40 h-40 rounded-full self-center ml-4'}>
                    <h2 className={'m-0 text-[#F25C54]'}>
                      23:23
                    </h2>
                    <p className={'text-center text-sm m-0 text-[#F25C54]'}>created at 5:15pm EST</p>
                  </div>
                  <div className={'flex-col ml-2 justify-start'}>
                    <div className={'flex'}>
                      <button className={'bg-transparent'}>
                        <Image src={'/share-1.svg'} width={12} height={12}/>
                      </button>
                        <p> Share Section </p>
                    </div>
                    <div className={'flex'}>
                      <button className={'bg-transparent'}>
                      <Image src={'/chat-bubble.svg'}  width={12} height={12}/>
                      </button>
                      <p> Section Chat </p>

                    </div>
                    <div className={'flex'}>
                      <button className={'bg-transparent'}>
                      <Image src={'/value-none.svg'}  width={12} height={12}/>
                      </button>
                      <p> Report Section </p>

                    </div>

                  </div>

                </div>
                <div className={'flex items-center rounded-md bg-[#984DDF] w-20 h-10 absolute right-0 bottom-0 m-2 p-2'}>
                  <Image src={'/exit.svg'} className={'my-2'} width={24} height={24} />
                  <p className={'ml-2 text-red-600'}> EXIT </p>
                </div>
              </div>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
