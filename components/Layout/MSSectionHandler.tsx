import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { slugify } from 'utils/slugify'
import { unslugify } from 'utils/unslugify'

interface SectionHandlerProps {
  sections: {
    title: string
    component: ReactElement[]
  }[]
  eventId?: string
  activeTab?: string
}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

export const MSSectionHandler: React.FC<SectionHandlerProps> = ({
  sections,
  eventId,
  activeTab,
}) => {
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
    
    const moods = tab('Moods')
    const comments = tab('Comments')
    const attendance = tab('Attendance')
    const miniMoods = tab('Mini-Moods')
    const personal = tab('Personal')

    if (!activeTab) {
      return moods
    }

    return tab(unslugify(activeTab)) ?? moods
  }, [activeTab, tab])

  return (
    <div className='m-2'>
      {sections && sections.length > 1 && (
        <div className="flex flex-row space-x-6">
          {sections?.map((section, index) => {
            return (
              <Link
                href={{
                  pathname: `/moodscape/${eventId}`,
                  query: {
                    tab: slugify(section.title),
                  },
                }}
                scroll={false}
                shallow={true}
                key={section.title}
              >
                <div className="flex flex-col cursor-pointer ">
                  <p>{section.title}</p>
                  {activeSection?.title === section.title ? (
                    <div key={index} className="w-auto h-0.5 -mt-4 bg-sky-500/75" />
                  ) : (
                    <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 hidden" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
      <div className="w-inherite border border-white opacity-10 border-solid -mt-3" />

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
