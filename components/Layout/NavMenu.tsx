import React, { useEffect } from 'react'
import { miniAvatar, navAvatar } from './styles.css'
import { useDisconnect, useBalance } from 'wagmi'
import { Menu } from '@headlessui/react'
import { useProfileStore } from '../../stores'
import Link from 'next/link'
import { parseEther, formatEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'

interface NavMenuProps {
  signerAddress: string
  hasAccount: boolean
}

const NavMenu: React.FC<NavMenuProps> = ({ signerAddress, hasAccount }) => {
  const { aura } = useProfileStore((state) => state)
  const { disconnect } = useDisconnect()
  const { data } = useBalance({
    address: signerAddress as `0x${string}`,
    formatUnits: 'ether',
  })

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
          <button style={{ background: `${userGradient}` }} className={navAvatar} />
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
                <div style={{ background: `${userGradient}` }} className={miniAvatar} />
              )}
            </Menu.Item>
          </div>
          <Menu.Item>
            {({ active }) => (
              <h2 className={'text-center'}>
                {' '}
                {formattedBalance ? formattedBalance : 0} ETH{' '}
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

                <Link href={'/explore?tab=livestream'}>
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
          <Menu.Item as="div" className="flex my-4">
            {({ active }) => (
              <a
                className={`${
                  active && 'bg-[#FF8500]'
                } flex items-center justify-between w-full`}
                href={hasAccount ? `/profile/${signerAddress}` : '/onboarding?tab=aura'}
              >
                {hasAccount ? (
                  <h3 className={'text-sm mx-8'}>Profile</h3>
                ) : (
                  <h3 className={'text-sm mx-8'}>Create Account</h3>
                )}

              </a>
            )}
          </Menu.Item>

          <Menu.Item as="div" className={`flex my-4 ${hasAccount ? null : 'hidden'}`}>
            {({ active }) => (
              <a
                className={`${
                  active && 'bg-[#FF8500]'
                } flex items-center justify-between w-full`}
                href={hasAccount ? `/profile/${signerAddress}/aura` : undefined}
              >
                {hasAccount ? <h3 className={'text-sm mx-8'}>Settings </h3> : null}

              </a>
            )}
          </Menu.Item>
          <Menu.Item as="div" className={`flex my-4`}>
            {({ active }) => (
              <a
                className={`${
                  active && 'bg-[#FF8500]'
                } flex items-center justify-between w-full`}
                href={'https://www.notion.so/brickstudio/FAQ-04bfb4c4580c4ce8a94202f4e6a7b359'}
                target="_blank"
              >
                <h3 className={'text-sm mx-8'}>FAQ </h3>

              </a>
            )}
          </Menu.Item>

          <Menu.Item as="div" className={`flex my-4 justify-center `}>
            {({ active }) => (
              <button
                className={`${
                  active && 'bg-blue-500'
                } border-[#B999FA] rounded-md border-solid hover:bg-red-500 bg-transparent flex items-center justify-center w-3/4 cursor-pointer`}
                onClick={() => {
                  disconnect()
                }}
              >
                {<h3 className={'text-sm text-white'}>Disconnect </h3>}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  )
}

export default NavMenu
