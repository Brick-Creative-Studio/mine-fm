import React, { useEffect, useState } from "react";
import { miniAvatar, navAvatar } from './styles.css'
import { useDisconnect, useBalance, useAccount } from 'wagmi'
import { Menu } from '@headlessui/react'
import { useLayoutStore, useProfileStore } from "../../stores";
import Link from 'next/link'
import { parseEther, formatEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import { usePrivy, useLogin, useLogout } from '@privy-io/react-auth';


interface NavMenuProps {

}

const NavMenu: React.FC<NavMenuProps> = ({ }) => {

  const { aura, setHasAccount } = useProfileStore((state) => state)
  const { isMobile } = useLayoutStore((state) => state)
  const {disconnect} = useDisconnect();

  //TODO: Change after inital launch
  const isConnected = false;
  const hasAccount = false;

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      if(isNewUser){
        setHasAccount(false)
      } else {
        setHasAccount(true)
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    }
  })
  const {logout} = useLogout({
    onSuccess: async () => {
      console.log('User logged out');
      setHasAccount(false)
      await disconnect()
    },
  })
  const {address, isConnecting, isDisconnected} = useAccount({
    async onDisconnect() {
      await logout()
    }
  });

  const { data } = useBalance({
    address: address as `0x${string}`,
    formatUnits: 'ether',
  })

  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  const balance =
    hasAccount && data ? BigNumber.from(data?.value.toString()).mod(1e14) : null
  const formattedBalance = balance
    ? formatEther(BigNumber.from(data?.value.toString()).sub(balance))
    : null

  let userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
  useEffect(() => {
    userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
  }, [aura])


  return (
    <nav className="z-40">
      <Menu as="div" className="">
        <Menu.Button as={React.Fragment}>
          {
            isConnected ? (
              <button style={{ background: `${userGradient}` }} className={navAvatar} />
            ) : (
              <div className="pl-[20px] mr-[-20px] cursor-pointer" onClick={toggleHamburger}>
                <div className="flex justify-around flex-col flex-nowrap w-[2rem] h-[2rem] z-10">
                  <div
                    className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
                      'rotate-0'
                    }`}
                  />
                  <div
                    className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
                      'translate-x-0'
                    }`}
                  />
                  <div
                    className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
                      hamburgerOpen ? '-rotate-45' : 'rotate-0'
                    }`}
                  />
                </div>
              </div>
            )
          }


        </Menu.Button>

        <Menu.Items className="absolute top-2 md:top-0 right-0 flex flex-col w-full md:w-1/3  bg-[#12002C] rounded-md">
          <div className={'flex justify-between'}>
            <Menu.Item disabled={true} as="div" className={`p-4`}>
              {({ active, close }) => (
                <button
                  className={` bg-transparent items-center justify-center w-12 h-12 cursor-pointer`}
                  onClick={() => {
                    close()
                  }}
                >
                  <img
                    alt={'close-menu button'}
                    src={'/cross-2.svg'}
                    className={'w-10 h-10'}
                  />
                </button>
              )}
            </Menu.Item>
            <Menu.Item as="div" className={'p-4'}>
              {({ active }) => (
                isConnected ? <div style={{ background: `${userGradient}` }}
                     className={miniAvatar} /> : <div/>
              )}
            </Menu.Item>
          </div>
          <Menu.Item>
            {({ active }) => (

              isConnected ?
              <h2 className={'text-center'}>
                {' '}
                {formattedBalance ? formattedBalance : 0} ETH{' '}
              </h2> :
                <h2 className={'text-center'}>
                  {/*Sign In to View Balance*/}
                </h2>
              // <h2 className={'text-center'}> { 0 } ETH </h2>
            )}
          </Menu.Item>
          <div className={'w-full border-[#B999FA] border-1 border-solid mb-4'}/>
          <Menu.Item as="div" className={'w-full '}>
            {({ active, close }) => (
              <div className={'w-full flex justify-center items-center'}>
                <Link href={'/create'}>
                  <button
                    onClick={() => close()}
                    className={
                      'flex items-center justify-between w-32 h-8 mr-8 bg-transparent hover:bg-fuchsia-950 hover:border-purple-600 border border-solid border-white rounded-full cursor-pointer'
                    }
                  >
                    {/*<div className={'rounded-full bg-white w-6 h-6 items-center justify-center flex'}>*/}
                    {/*<img className={'h-4 w-4 '} alt={'create button'} src={'/arrow-left.svg'}/>*/}
                    {/*</div>*/}

                    <h3 className={'text-sm mx-auto text-white'}> CREATE </h3>
                  </button>
                </Link>

                <Link href={'/explore?tab=moods'}>
                  <button
                    onClick={() => close()}
                    className={
                      'flex items-center justify-between w-32 h-8 ml-8 bg-transparent hover:bg-fuchsia-950 hover:border-purple-600 border border-solid border-white rounded-full cursor-pointer'
                    }
                  >
                    <h3 className={'text-sm mx-auto text-white'}> EXPLORE </h3>
                    {/*<div className={'rounded-full bg-white w-6 h-6 items-center justify-center flex'}>*/}
                    {/*    <img className={'h-4 w-4 '} alt={'create button'} src={'/arrow-right.svg'}/>*/}
                    {/*</div>*/}
                  </button>
                </Link>
              </div>
            )}
          </Menu.Item>
          <Link
            className={`
            } flex items-center  justify-between w-full`}
            href={hasAccount ? `/profile/${address}` : '/onboarding?tab=aura'}
          >
          <Menu.Item as="div" className={`flex my-4 cursor-pointer hover:bg-[#FF8500] ${isConnected ? null : 'hidden'}`}>
                {hasAccount ? (
                  <h3 className={'text-[20px] font-light mx-8 cursor-pointer'}>Profile</h3>
                ) : (
                  <h3 className={'text-[20px] font-light mx-8 cursor-pointer'}>Create Account</h3>
                )}
          </Menu.Item>
          </Link>

          <Link
            className={`flex items-center justify-between w-full`}
            href={hasAccount ? `/profile/${address}/settings?tab=aura` : ''}
          >
          <Menu.Item as="div" className={`flex my-4 cursor-pointer hover:bg-[#FF8500] ${hasAccount ? null : 'hidden'}`}>

                {hasAccount ? <h3 className={'text-[20px] font-light mx-8 cursor-pointer'}>Settings </h3> : null}
          </Menu.Item>
          </Link>

          <Link
            className={`flex items-center justify-between w-full`}
            href={ `/about-us`}
          >
            <Menu.Item as="div" className={`flex my-4 cursor-pointer hover:bg-[#FF8500]`}>

              { <h3 className={'text-[20px] font-light mx-8 cursor-pointer'}>About Us </h3> }
            </Menu.Item>
          </Link>
          {/*TODO: add back in after Launch 1 */}
          {/*<Menu.Item as="div" className={`flex my-4`}>*/}
          {/*  {({ active }) => (*/}
          {/*    <a*/}
          {/*      className={`${*/}
          {/*        active && 'bg-[#FF8500]'*/}
          {/*      } flex items-center justify-between w-full`}*/}
          {/*      href={'https://brickstudio.notion.site/FAQ-04bfb4c4580c4ce8a94202f4e6a7b359?pvs=4'}*/}
          {/*      target="_blank"*/}
          {/*    >*/}
          {/*      <h3 className={'text-[20px] font-light mx-8'}>FAQ </h3>*/}

          {/*    </a>*/}
          {/*  )}*/}
          {/*</Menu.Item>*/}

          {/*<Menu.Item as="div" className={`flex my-4 justify-center `}>*/}
          {/*  {({ active }) => (*/}
          {/*    <button*/}
          {/*      className={`${*/}
          {/*        active && 'bg-blue-500'*/}
          {/*      } border-[#B999FA] rounded-md border-solid hover:bg-red-500 bg-transparent flex items-center justify-center w-3/4 cursor-pointer`}*/}
          {/*      onClick={() =>  {*/}
          {/*        isConnected ? (disconnect() ): login()*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {<h3 className={'text-[20px] font-light text-white'}>{ isConnected ? `Log Out` : `Log In`} </h3>}*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*</Menu.Item>*/}
        </Menu.Items>
      </Menu>
    </nav>
  )
}

export default NavMenu
