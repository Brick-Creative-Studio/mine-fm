import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'



interface SectionHandlerProps {
    sections: {
      title: string
      component: ReactElement[]
    }[]
    collectionAddress: string
    tokenId?: string
    activeTab?: string
    preAuction?: boolean
  }
  
  interface activeSectionProps {
    title: string
    component: React.ReactElement[]
  }

  
  