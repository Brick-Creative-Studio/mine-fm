import { motion } from 'framer-motion'
import React from 'react'
import { useLayoutStore } from "../../stores";
import { copyButtonVariants } from './CopyButton.css'
import Image from "next/image";

interface CopyButtonProps {
  title?: string
  text?: string
  variant?: 'default' | 'icon'
}

const CopyButtonLight = ({ title, text, variant = 'icon' }: CopyButtonProps) => {
  const { signerAddress } = useLayoutStore()
  const copy: any = {
    address: signerAddress,
  }

  // const copyAll = Object.keys(copy).reduce(
  //   (acc, key) => {
  //     return `${acc}${key}: ${copy[key as string]}\n`
  //   },
  //   title ? `${title}:\n` : `all addresses:\n`
  // )

  const [copied, setCopied] = React.useState<boolean>(false)
  const handleCopy = async (text: string) => {
    if (copied) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <React.Fragment>
      {!copied ? (
        <div
          className={copyButtonVariants[variant]}
          onClick={() => handleCopy((text as string))}
        >
          <button className="bg-transparent hover:bg-sky-100 w-fit h-fit cursor-pointer">
            <img
              className={'w-6 h-6'}
              src={'/copy_green.svg'}
              alt="copy address button"
            />
          </button>        </div>
      ) : (
        <div className={copyButtonVariants[variant]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ scale: 0 }}
          >
            <button className="bg-transparent hover:bg-sky-100 w-fit h-fit">
              <img
                className={'w-8 h-8'}
                src={'/check.svg'}
                alt="copy address button"
              />
            </button>
          </motion.div>
        </div>
      )}
    </React.Fragment>
  )
}

export default CopyButtonLight