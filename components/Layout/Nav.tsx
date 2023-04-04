import React, { useEffect, useState } from 'react'
import {
  NavBar,
  navActions,
  navCreate,
  navLogo,
} from './styles.css'
import Image from 'next/image'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { useIsMounted } from '../../hooks/useMounted'
import { useAccount } from 'wagmi'
import useSWR from 'swr'
import axios from 'axios'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useLayoutStore } from 'stores'
import { Miner } from 'types/Miner'

const Nav = () => {
  const isMounted = useIsMounted()
  const { signerAddress, setSignerAddress } = useLayoutStore()


  const [ hasAccount, setHasAccount ] = useState(false) 

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
    },
  })

  const isMinerFetcher = async (url: string) => {
    let miner: Miner = await axios.post(url, {
        address: address
    }).then((res) => res.data)
  }

  const url = `https://minefm-server.herokuapp.com/miner/${address}`
  const miner = useSWR(url, isMinerFetcher)

  useEffect(() => {
    if(miner){
        setHasAccount(true)
       }
  }, [address])

  return isMounted && address ? (
    <div className={NavBar}>
      <div className={navLogo}>
        <Link key={'home'} href={'/'}>
          <Image
            src={'/mine-boxLogo-icon.svg'}
            alt={'minefm-logo'}
            width={48}
            height={48}
            color={'#FFF'}
          />
        </Link>
      </div>

      <div className={navActions}>
        <Link key={miner ? 'create' : 'make-account'} href={ miner ? '/create' : '/make-account'}>
          <button className={navCreate}>
            <Image src={'/boulder.svg'} alt="create button" width={24} height={24} />
          </button>
        </Link>
        {signerAddress && <NavMenu hasAccount={hasAccount} signerAddress={signerAddress} />}
      </div>
    </div>
  ) : (
    <div className={NavBar}>
      <div className={navLogo}>
        <Link key={'home'} href={'/'}>
          <Image
            src={'/mine-boxLogo-icon.svg'}
            alt={'minefm-logo'}
            width={48}
            height={48}
            color={'#FFF'}
          />
        </Link>
      </div>

      <div></div>

      <div className={navActions}>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Nav
