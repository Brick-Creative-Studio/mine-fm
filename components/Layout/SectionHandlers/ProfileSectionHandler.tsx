import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { slugify } from 'utils/slugify'
import { unslugify } from 'utils/unslugify'
import {useLayoutStore} from "../../../stores";

interface SectionHandlerProps {
  sections: {
    title: string
    component: ReactElement[]
  }[]
  signerAddress?: string
  activeTab?: string
  aura: string

}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

export const ProfileSectionHandler: React.FC<SectionHandlerProps> = ({
  sections,
  signerAddress,
  activeTab,
  aura
}) => {

  const { isMobile } = useLayoutStore()

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
    const irl = tab('IRL')
    const livestream = tab('Livestream')

    if (!activeTab) {
      return livestream
    }

    return tab(unslugify(activeTab)) ?? irl
  }, [activeTab, tab])

  return (
    <div className={'flex flex-col flex-1 w-full mt-4'}>
      { isMobile ? (
        <div className="flex flex-row justify-center space-x-6 mb-4">
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
                  {activeSection?.title === section.title ? (
                    <div className={'border border-solid rounded-full border-[#B999FA] px-4 py-0 my-0 h-fit'}>
                      <h3 className={'text-[#B999FA] text-[14px] my-2'}>{section.title.toUpperCase()}</h3>
                    </div>
                  ) : (
                    <>
                      <h3 className={'text-[14px] my-2'}>{section.title.toUpperCase()}</h3>
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-row justify-start space-x-6 mb-4">
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
                <div className="flex flex-col cursor-pointer mx-8 ">
                  {activeSection?.title === section.title ? (
                    <div className={'border border-solid rounded-full border-[#B999FA] px-4 py-0 my-0 h-fit'}>
                      <h3 className={'text-[#B999FA] text-[16px] my-2'}>{section.title.toUpperCase()}</h3>
                    </div>
                  ) : (
                    <>
                      <h3 className={'text-[16px] my-2'}>{section.title.toUpperCase()}</h3>
                    </>
                  )}
                </div>
              </Link>
            )
          })}
          <div className={''}></div>
        </div>
      )}

      <div style={{ background: aura }} className={'flex flex-1 h-full rounded-t-xl items-center justify-center'}>
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
