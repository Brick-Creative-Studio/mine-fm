import React from 'react'
import { NavBar, navButtonConnect, navActions, navButtonMap, navButtonRadio, navCreate, navAvatar } from './styles.css'
import Image from 'next/image'



const Nav = () => {
        //TODO: Check if we have signer then return UI based on if value is present or not
    const signer = 55

    //TODO: Add Search to NavBar
    //TODO: Add gradient circle for profile image when connected


    return (
        signer ? (
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
                    <button className={navButtonRadio}>
                        <Image src={'/radio-icon.png'} width={24} height={24} />
                        Radio
                    </button>
                    <button className={navButtonMap}>
                        <Image src={'/map-icon.png'} width={24} height={24} />
                        Map
                    </button>
                    <button className={navCreate} >
                        <Image src={'/create-icon.png'} width={24} height={24} />
                        Create
                    </button>

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

                    <button className={navButtonConnect} >
                        <Image src={'/wallet-icon.png'} width={24} height={24} />
                        Connect Wallet
                    </button>

                    <img />
                </div>
            </div>
    )
}

export default Nav;