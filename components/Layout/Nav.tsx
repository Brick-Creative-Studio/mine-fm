import React, { useEffect, useState } from 'react'
import { NavBar, navActions, navCreate, navLogo } from './styles.css'
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
import { User } from 'types/User'

const Nav = () => {
  const isMounted = useIsMounted()
  const { setSignerAddress } = useLayoutStore((state) => state)
  const { hasAccount, setHasAccount, setId, id } = useProfileStore((state) => state)

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
      setHasAccount(false)
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
      if (id) {
        setHasAccount(true)
      } else {
        setHasAccount(false)
      }
    },
  })

  const getUser = async (url: string, address: string) => {
    try {
      let user: User = await axios
        .post(url, {
          walletAddress: address,
        })
        .then((res) => {
          setId(res.data.id)

          return res.data
        })
      return user
    } catch (e) {
      console.log('error fecthing user', e)
    }
  }

  useEffect(() => {
    const url = `https://minefm-server.herokuapp.com/user/user`

    const user = getUser(url, address as string).then((data) => {
      if (data) {
        if (hasAccount) {
          setHasAccount(true)
        } else {
          setHasAccount(false)
        }
      }
      return data
    })
  }, [])

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
        <Link
          key={'create'}
          href={'/create'}
        >
          <button className={navCreate}>
            <h3> Create </h3>
          </button>
        </Link>
        {address && <NavMenu hasAccount={hasAccount} signerAddress={address} />}
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
