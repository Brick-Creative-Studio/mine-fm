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
import { useProfileStore } from 'stores'
import useSWR from 'swr'
import axios from 'axios'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useLayoutStore } from 'stores'
import { Miner } from 'types/Miner'

const Nav = () => {
  const isMounted = useIsMounted()
  const { signerAddress, setSignerAddress } = useLayoutStore((state) => state)
  const { hasAccount, setHasAccount, setId } = useProfileStore((state) => state)

  const [ isAccount, setStateAccount ] = useState(false) 

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
      setHasAccount(false)
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
      if(miner){
        setHasAccount(true)
      } else {
        setHasAccount(false)
      }
    },
  })

  const isMinerFetcher = async (url: string, address: string) => {
    let miner: Miner = await axios.post(url, {
        walletAddress: address
    }).then((res) => {
        setId(res.data.id);
      return res.data
    })
    return miner;
  }
//TODO: Remove SWR state since this data does not change often
  const url = `https://minefm-server.herokuapp.com/miner/miner`
  const miner = useSWR([url, address], isMinerFetcher).data

  useEffect(() => {
    if(miner){
        setStateAccount(true)
        if(hasAccount){
          setHasAccount(true)
        } else {
          setHasAccount(false)
        }
        
       }
  }, [miner])

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
          <h3> Create </h3>
          </button>
        </Link>
        {signerAddress && <NavMenu hasAccount={isAccount} signerAddress={signerAddress} />}
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
