import React from 'react'
import { NavBar, navConnect, navActions, navButtonMap, navButtonRadio, navCreate, navAvatar, navLogo } from './styles.css'
import Image from 'next/image'
import { useLayoutStore } from 'stores'
import Link from 'next/link'



const Nav = () => {
        //TODO: Check if we have signer then return UI based on if value is present or not
    const signerAddress = useLayoutStore((state) => state.signerAddress)

    //TODO: Add Search to NavBar
    //TODO: Add gradient circle for profile image when connected

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
                    <button className={navButtonRadio}>
                        <Image src={'/radio-icon.png'} width={24} height={24} />
                        Radio
                    </button>
                    <button className={navButtonMap}>
                        <Image src={'/map-icon.png'} width={24} height={24} />
                        Map
                    </button>
                    <Link
                        key={'create'}
                        href={'./create'}>
                    <button className={navCreate} >
                        <Image src={'/create-icon.png'} width={24} height={24} />
                        Create
                    </button>
                    </Link>
                    <button className={navAvatar} />
                      
                </div>
            </div>
        ) :
            <div className={NavBar}>
                <div>
                    <img
                        src={'/mine-text-logo-goblin.png'}
                        alt={'minefm-logo'}
                    />
                </div>
                <div>

                </div>

                <div className={navActions}>

                    <button className={navConnect} >
                        <Image src={'/wallet-icon.png'} width={24} height={24} />
                        Connect Wallet
                    </button>

                    <img />
                </div>
            </div>
    )
}

export default Nav;