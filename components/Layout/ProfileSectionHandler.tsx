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
  signerAddress?: string
  activeTab?: string
}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

export const ProfileSectionHandler: React.FC<SectionHandlerProps> = ({
  sections,
  signerAddress,
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
    const moodscapes = tab('Moodscapes')
    const moods = tab('Moods')

    if (!activeTab) {
      return moodscapes
    }

    return tab(unslugify(activeTab)) ?? moodscapes
  }, [activeTab, tab])

  return (
    <div className={'mx-8'}>
      {sections && sections.length > 1 && (
        <div className="flex flex-row space-x-6">
          {sections?.map((section, index) => {
            return (
              <Link
                href={{
                  pathname: `/profile/${signerAddress}`,
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
