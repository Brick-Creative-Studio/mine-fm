import React, { useEffect, useState } from 'react'
import { NavBar, navActions, navCreate, navLogo, marquee } from './styles.css'
import Image from 'next/image'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { useIsMounted } from '../../hooks/useMounted'
import { useAccount } from 'wagmi'
import { useProfileStore } from 'stores'
import { useLayoutStore } from 'stores'
import useGetUser from '../../hooks/useGetUser'
import { User } from '../../types/User'
import { useRouter } from 'next/router'
import ConnectButton from 'components/ConnectButton/ConnectButton'
import Hamburger from 'components/Hamburger/Hamburger'

const Nav = () => {
  const isMounted = useIsMounted()
  const { setSignerAddress, isMobile } = useLayoutStore((state) => state)
  const [isHidden, setHidden] = useState<boolean>(false)
  const { hasAccount, setAura, setIdentity, id, resetProfileState, setHasAccount } =
    useProfileStore((state) => state)
  const router = useRouter()

  const { address } = useAccount({
    onDisconnect() {
      setSignerAddress(null)
      setHasAccount(false)
      resetProfileState()
    },
    onConnect({ address, connector, isReconnected }) {
      address && setSignerAddress(address)
    },
  })

  const { error, isLoading, user } = useGetUser(address as string)

  useEffect(() => {
    if (user) {
      setIdentity({
        id: user.id,
        miner_tag: user.miner_tag,
        instagram: user.instagram,
        twitter: user.twitter,
        email: user.email,
        bio: user.bio,
        name: user.name,
      })
      setAura({
        colorOne: user.colorOne!!,
        colorTwo: user.colorTwo!!,
        colorThree: user.colorThree!!,
        direction: user.direction!!,
      })
      setHasAccount(true)
      return
    }

    if (error || !user) {
      resetProfileState()
      return
    }
  }, [user, error, isLoading])

  useEffect(() => {
    if (router.pathname.includes('livestream')) {
      setHidden(true)
      return
    }
    setHidden(false)
  }, [router])

  return isHidden ? null : isMounted && address ? (
    <nav className={NavBar}>
      <div className={navLogo}>
        <Link key={'home'} href={'/'}>
          <img
            src={'/mine-boxLogo-icon.svg'}
            alt={'minefm-logo'}
            width={48}
            height={48}
            color={'#FFF'}
          />
        </Link>
      </div>
      {isMobile ? (
        <div
          className={
            'flex w-fit h-12 border-solid border-[#654A8F] rounded-md overflow-x-hidden overflow-y-hidden relative cursor-pointer md:ml-12'
          }
        >
          <div
            className={
              'animate-marquee flex items-center justify-center pt-1 whitespace-nowrap'
            }
          >
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-[16px]'}> MINE.FM Live Broadcasts </p>
          </div>
          <div
            className={
              'animate-marquee2 absolute top-0 flex items-center whitespace-nowrap'
            }
          >
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-[16px]'}> MINE.FM Live Broadcasts </p>
          </div>
        </div>
      ) : (
        <div
          className={
            'flex items-center justify-center w-2/5 h-12 border-solid border-[#654A8F] rounded-md overflow-x-hidden overflow-y-hidden relative cursor-pointer md:ml-16'
          }
        >
          <div className={'flex items-center justify-center pt-1 whitespace-nowrap'}>
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-center text-[16px]'}>
              {' '}
              MINE.FM Live Broadcasts{' '}
            </p>
          </div>
        </div>
      )}

      <div className={navActions}>
        {address && <NavMenu hasAccount={hasAccount} signerAddress={address} />}
        <Hamburger />
      </div>
    </nav>
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
      {/*<div className={marquee}>*/}
      {/*  <h3 className={'float-left'}> MINE.FM Radio </h3>*/}
      {/*</div>*/}
      {isMobile ? (
        <div
          className={
            'flex w-fit h-12 border-solid border-[#654A8F] rounded-md overflow-x-hidden overflow-y-hidden relative cursor-pointer md:ml-12'
          }
        >
          <div
            className={
              'animate-marquee flex items-center justify-center pt-1 whitespace-nowrap'
            }
          >
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-[16px]'}> MINE.FM Live Broadcasts </p>
          </div>
          <div
            className={
              'animate-marquee2 absolute top-0 flex items-center whitespace-nowrap'
            }
          >
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-[16px]'}> MINE.FM Live Broadcasts </p>
          </div>
        </div>
      ) : (
        <div
          className={
            'flex items-center justify-center w-2/5 h-12 border-solid border-[#654A8F] rounded-md overflow-x-hidden overflow-y-hidden relative md:left-12 lg:left-28 cursor-pointer mx-auto'
          }
        >
          <div className={'flex items-center justify-center pt-1 whitespace-nowrap'}>
            <div
              className={'rounded-full w-2 h-2 mx-2 bg-red-700 animate-pulse float-left'}
            />
            <p className={'text-[#B999FA] text-center text-[16px]'}>
              {' '}
              MINE.FM Live Broadcasts{' '}
            </p>
          </div>
        </div>
      )}

      <div className={navActions}>
        <ConnectButton />
        <Hamburger />
      </div>
    </div>
  )
}

export default Nav
