import React from 'react'
import { useLayoutStore } from '../../stores'
import { useWalletClient } from 'wagmi'
import Nav from './Nav'
import Footer from './Footer'
import { bodyGradient } from 'styles/gradient.css'

import { flexContainer } from './styles.css'

type Props = {
  children: JSX.Element | null
}

const Layout = ({ children }: Props) => {
  const { data: walletClient, status } = useWalletClient()
  const { setSigner, setSignerAddress, signerAddress } = useLayoutStore()
  const { setIsMobile, isMobile } = useLayoutStore()
  /*

    store walletClient, signerAddress and provider is store

   */

  React.useEffect(() => {
    if (status === 'success') {
      // setProvider(walletClient?.provider ?? getProvider())
      setSigner(walletClient)
      //@ts-ignore
      setSignerAddress(walletClient?.account.address)
    }
  }, [status, walletClient, signerAddress])

  /*

     add mobile flag to layout store

   */
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  return (
    <div className={flexContainer}>
      <meta name="color-scheme" content="dark only"/>
      <Nav />
      <>
        <div className={bodyGradient} />

        {children}
      </>
    </div>
  )
}

export default Layout
