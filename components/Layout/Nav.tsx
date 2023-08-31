import React, { useEffect} from 'react'
import { NavBar, navActions, navCreate, navLogo } from './styles.css'
import Image from 'next/image'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { useIsMounted } from '../../hooks/useMounted'
import { useAccount } from 'wagmi'
import { useProfileStore } from 'stores'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useLayoutStore } from 'stores'
import useGetUser from "../../hooks/useGetUser";

const Nav = () => {
  const isMounted = useIsMounted()
  const { setSignerAddress } = useLayoutStore((state) => state)
  const { hasAccount, setAura, setIdentity, id, resetProfileState, setHasAccount } = useProfileStore((state) => state)

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
      resetProfileState()
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
    },
  })

  const { error, isLoading, user } = useGetUser(address as string)

  useEffect(() => {
    console.log('user:', user)
    if (user){
      setIdentity({
        id: user.id,
        m_tag: user.miner_tag,
        instagram: user.instagram,
        twitter: user.twitter,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        name: user.name,
      })
      setAura({
        colorOne: user.colorOne!!,
        colorTwo: user.colorTwo!!,
        colorThree: user.colorThree!!,
        direction: user.direction!!
      })
      setHasAccount(true)
      return
    }

    if(error || !user) {
      resetProfileState()
      return
    }

  }, [user, error, isLoading])

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
