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

export const ExploreSectionHandler: React.FC<SectionHandlerProps> = ({
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
    const livestream = tab('livestream')
    const irl = tab('I R L')
    const moods = tab('moods')


    if (!activeTab) {
      return livestream
    }

    return tab(unslugify(activeTab)) ?? livestream
  }, [activeTab, tab])

  return (
    <div className='w-full'>
      {sections && sections.length > 1 && (
        <div className="flex flex-row space-x-6 justify-center">
          {sections?.map((section, index) => {
            return (
              <Link
                href={{
                  pathname: `/explore`,
                  query: {
                    tab: slugify(section.title),
                  },
                }}
                scroll={false}
                shallow={true}
                key={section.title}
              >
                <div className="flex flex-col cursor-pointer ">
                  {activeSection?.title === section.title ? (
                    <div className={'border border-solid rounded-full border-[#984DDF] px-4 py-0 my-0 h-fit'}>
                      <h3 className={'text-[#984DDF] my-2'}>{section.title.toUpperCase()}</h3>
                    </div>
                  ) : (
                    <>
                    <h3 className={' my-2'}>{section.title.toUpperCase()}</h3>
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div >
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