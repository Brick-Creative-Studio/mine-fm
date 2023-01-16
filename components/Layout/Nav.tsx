import React from 'react'
import { NavBar, navConnect, navActions, navButtonMap, navButtonRadio, navCreate, navAvatar, navLogo } from './styles.css'
import Image from 'next/image'
import { useLayoutStore } from 'stores'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { ConnectButton } from '@rainbow-me/rainbowkit';




const Nav = () => {
        //TODO: Check if we have signer then return UI based on if value is present or not
    const signerAddress = useLayoutStore((state) => state.signerAddress)

    //TODO: Add Search to NavBar

    return (
        signerAddress ? (
            <div className={NavBar}>
                <div className={navLogo}>
                    <Link 
                    key={'home'}
                    href={'./'}>
                    <img
                        src={'/icon-white-small.png'}
                        alt={'minefm-logo'}
                       
                    />
                    </Link>
                </div>
                <div>

                </div>

                <div className={navActions}>
                    <Link
                        key={'create'}
                        href={'./create'}>
                    <button className={navCreate} >
                        <Image src={'/create-icon.png'} width={24} height={24} />
                        Create
                    </button>
                    </Link>
                    <NavMenu />
                      
                </div>
            </div>
        ) :
            <div className={NavBar}>
                <div>
                    <img
                        src={'/icon-white-small.png'}
                        alt={'minefm-logo'}
                    />
                </div>
                <div>

                </div>

                <div className={navActions}>

                   <ConnectButton/>

                    <img />
                </div>
            </div>
    )
}

export default Nav;