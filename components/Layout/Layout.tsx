import React from 'react'
import { useLayoutStore } from '../../stores/index'
import { useSigner } from 'wagmi'
import { getProvider } from '../../utils/provider'
import Nav from './Nav'
import Footer from './Footer'
import { flexContainer } from './styles.css'


type Props = {
  children: JSX.Element | null 
}

const Layout = ({ children }: Props) => {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()

  //TODO: Server side props to retrieve 

  /*

    store signer, signerAddress and provider is store

   */

  React.useEffect(() => {
    if (status === 'success') {
      setProvider(signer?.provider ?? getProvider())
      setSigner(signer)
      //@ts-ignore
      setSignerAddress(signer?._address)
      console.log('provider reset', signer?.provider)
      console.log('signer reset', signer)
    }
  }, [status, signer])

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
    <Nav /> 
    <>{children}</>
    <Footer />
    </div>
  )
}

export default Layout
