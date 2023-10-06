import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { slugify } from 'utils/slugify'
import { unslugify } from 'utils/unslugify'
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

interface SectionHandlerProps {
  sections: {
    title: string
    component: ReactElement[]
  }[]
  signerAddress?: string
  activeTab?: string
  eventId: string
}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

export const StreamSectionHandler: React.FC<SectionHandlerProps> = ({
  sections,
  signerAddress,
  activeTab,
  eventId,
}) => {

  const router = useRouter()
  /*
    handle active session if:
    - query tab is defined
    - unknown query tab is set
   */
  const tab = React.useCallback(
    (title: string) => {
      return sections?.find((section) => section.title === title)
    },
    [sections]
  )

  const activeSection: activeSectionProps | undefined = React.useMemo(() => {
    const chat = tab('Chat')
    const audience = tab('Audience')
    const section = tab('Section')
    const info = tab('Info')
    const admin = tab('admin')

    if (!activeTab) {
      return chat
    }

    return tab(unslugify(activeTab)) ?? chat
  }, [activeTab, tab])

  function changeSection(section: string) {
    router.push(`/livestream/${eventId}?tab=${section}`, undefined, { shallow: true})
  }

  return (
    <div className="w-full md:w-1/3 md:h-full bg-[#12002C]">
      {sections && sections.length > 1 && (
        <div className="flex flex-row space-x-6 justify-around py-4 mb-1   items-center">
          {sections?.map((section, index) => {
            return (
              <button
                onClick={() => changeSection(slugify(section.title))}
                key={section.title}
                className={'bg-transparent '}
              >
                <div className="flex flex-col cursor-pointer ">
                  {activeSection?.title === section.title ? (
                    <div
                      className={
                        'border border-solid rounded-full border-[#7DD934] px-4 py-0 my-0 h-fit'
                      }
                    >
                      <h3 className={'text-[#7DD934] text-[14px] my-2'}>
                        {section.title.toUpperCase()}
                      </h3>
                    </div>
                  ) : (
                    <>
                      <h3 className={' text-[14px] my-2'}>
                        {section.title.toUpperCase()}
                      </h3>
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
      <div className="w-full border border-white opacity-10 border-solid -mt-3" />

      <div>
        <AnimatePresence mode={'wait'}>
          <motion.div
            key={activeSection?.title}
            variants={{
              closed: {
                y: 10,
                opacity: 0,
              },
              open: {
                y: 0,
                opacity: 1,
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {!!activeSection && <>{React.cloneElement(activeSection.component[0])}</>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
