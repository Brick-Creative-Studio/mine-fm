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
    const memoryCards = tab('Memory Cards')

    if (!activeTab) {
      return memoryCards
    }

    return tab(unslugify(activeTab)) ?? memoryCards
  }, [activeTab, tab])

  return (
    <div className="mx-4">
      {sections && sections.length > 1 && (
        <div className="flex flex-row justify-around">
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
                <div className="flex flex-col items-center cursor-pointer ">
                  <div
                    className={`text-lg p-2 ${
                      activeSection?.title === section.title
                        ? 'border-4 border-solid border-orange-500 rounded-lg'
                        : 'border-4 border-solid border-transparent rounded-lg'
                    }`}
                  >
                    {section.title}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

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
