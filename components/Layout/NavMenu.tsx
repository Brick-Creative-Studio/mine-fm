import React, { useEffect } from 'react'
import { miniAvatar, navAvatar } from "./styles.css";
import { useDisconnect } from 'wagmi'
import { Menu } from '@headlessui/react'
import {useProfileStore} from "../../stores";
import Link from "next/link";
interface NavMenuProps {
    signerAddress: string,
    hasAccount: boolean
}


const NavMenu: React.FC<NavMenuProps> = ({ signerAddress, hasAccount }) => {
    const { aura } = useProfileStore((state) => state)
    const { disconnect } = useDisconnect()
    let userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    console.log('user gradient', userGradient)
    useEffect(() => {
        userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
    },[aura])

    return (
        <div className='z-40'>

            <Menu as='div' className="" >
                <Menu.Button as={React.Fragment}>
                    <button style={{ background: `${userGradient}`}} className={navAvatar} />
                </Menu.Button>
                <Menu.Items className='absolute top-0 right-0 flex flex-col w-full  bg-[#1D0045] rounded-md'>
                    <Menu.Item as="div" className={'self-end'} >
                        {({ active }) => (
                          <div style={{ background: `${userGradient}`}} className={miniAvatar} />

                        )}
                    </Menu.Item>
                     <Menu.Item>
                        {({ active }) => (

                               <h2 className={'text-center'}>1.03 ETH</h2>
                        )}
                    </Menu.Item>
                    <Menu.Item as="div" className={'w-full'} >
                        {({ active, close }) => (
                          <div className={'w-full flex justify-center items-center'}>
                              <Link href={'/create'}>
                              <button onClick={() => close()} className={'flex items-center justify-between w-32 h-8 mr-8 bg-transparent border border-solid border-white rounded-full cursor-pointer'}>
                                  <div className={'rounded-full bg-white w-6 h-6 items-center justify-center flex'}>
                                  <img className={'h-4 w-4 '} alt={'create button'} src={'/arrow-left.svg'}/>
                                  </div>

                                  <h3 className={'text-sm mx-auto'}> CREATE </h3>
                              </button>
                              </Link>

                              <Link href={'/explore?tab=livestream'}>
                              <button onClick={() => close()} className={'flex items-center justify-between w-32 h-8 ml-8 bg-transparent border border-solid border-white rounded-full cursor-pointer'}>
                                  <h3 className={'text-sm mx-auto'}> EXPLORE </h3>
                                  <div className={'rounded-full bg-white w-6 h-6 items-center justify-center flex'}>
                                      <img className={'h-4 w-4 '} alt={'create button'} src={'/arrow-right.svg'}/>
                                  </div>
                              </button>
                              </Link>
                          </div>



                        )}
                    </Menu.Item>
                    <Menu.Item as="div" className="flex border-white border-solid border-x-0 my-4">
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'} flex items-center justify-between w-full`}
                                href={ hasAccount ? `/profile/${signerAddress}` : '/onboarding?tab=aura'}
                            >
                              {hasAccount ? <h3 className={'text-sm mx-8'}>Profile</h3> : <h3 className={'text-md'}>Create Account</h3>}


                                <div className={'rounded-full bg-transparent border-white border-solid rounded-full w-12 h-6 items-center justify-center flex mx-8'}>
                                    <img className={'h-6 w-6 '} alt={'create button'} src={'/w-arrow-right.svg'}/>
                                </div>
                            </a>


                        )}
                    </Menu.Item>

                    <Menu.Item as="div" className="flex border-white border-solid border-x-0 my-4 ">
                        {({ active }) => (
                          <a
                            className={`${active && 'bg-blue-500'} flex items-center justify-between w-full`}
                            href={ hasAccount ? `/profile/${signerAddress}/identity` : undefined}
                          >
                              {hasAccount ? <h3 className={'text-sm mx-8'}>Settings </h3> : null}


                              <div className={'bg-transparent border-white border-solid rounded-full w-12 h-6 items-center justify-center flex mx-8'}>
                                  <img className={'h-6 w-6 '} alt={'create button'} src={'/w-arrow-right.svg'}/>
                              </div>
                          </a>


                        )}
                    </Menu.Item>

                    <Menu.Item as="div" className={`flex border-white border-solid border-x-0 my-4`}>
                        {({ active }) => (
                          <button
                            className={`${active && 'bg-blue-500'} hover:bg-red-500 bg-transparent flex items-center justify-center w-full`}
                            onClick={() => {disconnect()}}

                          >
                              {<h3 className={'text-sm'}>Disconnect  </h3> }

                          </button>


                        )}
                    </Menu.Item>

                    <Menu.Item as="div" className={`w-full flex items-end justify-end  p-4`}>
                        {({ active, close }) => (
                          <button
                            className={`${active && 'bg-blue-500'}  bg-[#B999FA] flex items-center justify-center  rounded-full w-20 h-20`}
                            onClick={() => {close()}}

                          >
                              <img src={'/cross.svg'} className={'w-16 h-16'}/>

                          </button>


                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

        </div>
    )
}

export default NavMenu