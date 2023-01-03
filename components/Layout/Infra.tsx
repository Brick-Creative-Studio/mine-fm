import React from 'react'
import { useLayoutStore } from '../../stores/index'
import { useSigner } from 'wagmi'
import { getProvider } from '../../utils/provider'

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()

  /*

    store signer, signerAddress and provider is store

   */

  React.useEffect(() => {
    if (status === 'success') {
      setProvider(signer?.provider ?? getProvider())
      setSigner(signer)
      //@ts-ignore
      setSignerAddress(signer?._address)
    }
  }, [status, signer, setProvider, setProvider])

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
}

export default Layout
