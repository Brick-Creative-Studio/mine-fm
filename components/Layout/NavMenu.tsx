import React, { useEffect } from 'react'
import { navAvatar } from './styles.css'
import { useDisconnect } from 'wagmi'
import { Menu } from '@headlessui/react'
import {useProfileStore} from "../../stores";
interface NavMenuProps {
    signerAddress: string,
    hasAccount: boolean
}




const NavMenu: React.FC<NavMenuProps> = ({ signerAddress, hasAccount }) => {
    const { aura } = useProfileStore((state) => state)
    const { disconnect } = useDisconnect()
    let userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorTwo})`

    useEffect(() => {
        userGradient = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorTwo})`
    },[aura])

    return (
        <div className='z-40'>

            <Menu as='div' className="" >
                <Menu.Button as={React.Fragment}>
                    <button style={{ background: `${userGradient}`}} className={navAvatar} />
                </Menu.Button>
                <Menu.Items className='absolute right-10 flex flex-col justify-around h-32 bg-indigo-700 p-4 rounded-md'>
                    {/* <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'}`}
                                href="/account-settings"
                            >
                                miner_tag
                            </a>
                        )}
                    </Menu.Item> */}
                    <Menu.Item as="div" className="flex justify-center">
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'}`}
                                href={ hasAccount ? `/profile/${signerAddress}` : '/onboarding?tab=aura'}
                            >
                              {hasAccount ? <p>Profile</p> : <p>Create Account</p>}
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        <button 
                            className='rounded p-2 bg-black w-32 h-18'
                            onClick={() => {disconnect()}}
                            >
                             Disconnect
                         </button>
                    </Menu.Item>
                </Menu.Items>
            </Menu>

        </div>
    )
}

export default NavMenu