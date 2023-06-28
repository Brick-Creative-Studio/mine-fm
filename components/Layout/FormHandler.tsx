import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { slugify } from 'utils/slugify'
import { unslugify } from 'utils/unslugify'

interface FormHandlerProps {
  forms: {
    title: string
    component: ReactElement[]
  }[]
  signerAddress?: string
  activeTab?: string
}

interface activeFormProps {
  title: string
  component: React.ReactElement[]
}

export const FormHandler: React.FC<FormHandlerProps> = ({
  forms,
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
      return forms?.find((form) => form.title === title)
    },
    [forms]
  )

  const activeForm: activeFormProps | undefined = React.useMemo(() => {
    const livestream = tab('Livestream')


    if (!activeTab) {
      return livestream
    }

    return tab(unslugify(activeTab)) ?? livestream
  }, [activeTab, tab])

  return (
    <>
      {forms && forms.length > 1 && (
        <div className="flex-col w-full">
          <h2> Put Your Sound Onchain </h2>

          <div className="flex flex-row space-x-6">
            {' '}
            {forms?.map((form, index) => {
              return (
                <Link
                  href={{
                    pathname: `/create/livstream`,
                    query: {
                      tab: slugify(form.title),
                    },
                  }}
                  scroll={false}
                  shallow={true}
                  key={form.title}
                >
                  <div className="flex flex-col cursor-pointer ">
                    <p>{form.title}</p>
                    {activeForm?.title === form.title ? (
                      <div key={index} className="w-auto h-0.5 -mt-4 bg-sky-500/75" />
                    ) : (
                      <div className="w-auto h-0.5 -mt-4 bg-sky-500/75 hidden" />
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="w-full border border-white opacity-10 border-solid -mt-2" />

        </div>
      )}

      <div>
        <AnimatePresence mode={'wait'}>
          <motion.div
            key={activeForm?.title}
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
            {!!activeForm && <>{React.cloneElement(activeForm.component[0])}</>}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
