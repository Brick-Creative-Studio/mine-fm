import React, { useEffect } from 'react'
import { NavBar, navConnect, navActions, navButtonMap, navButtonRadio, navCreate, navAvatar, navLogo } from './styles.css'
import Image from 'next/image'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { useIsMounted } from '../../hooks/useMounted'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLayoutStore } from 'stores'





const Nav = () => {
        //TODO: Check if we have signer then return UI based on if value is present or not
        const isMounted = useIsMounted()
        const { signerAddress, setSignerAddress } = useLayoutStore()

        const { address } = useAccount({
            onDisconnect() {
              console.log('Disconnected')
              setSignerAddress( null )
            },
            onConnect({ address, connector, isReconnected }) {
                console.log('Connected', { address, connector, isReconnected })
                address && setSignerAddress( address )
              },
          })
        
        useEffect(() => {
            console.log('nav here', address )
        },[] )
        
    

    return (
        isMounted && address ? (
            <div className={NavBar}>
                <div className={navLogo}>
                    <Link 
                    key={'home'}
                    href={'/'}>
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
                        href={'/create'}>
                    <button className={navCreate} >
                        <Image src={'/boulder.svg'} alt="create button" width={24} height={24} />
                    </button>
                    </Link>
                   { signerAddress && <NavMenu signerAddress={signerAddress}/> }
                      
                </div>
            </div>
        ) :
            <div className={NavBar}>
                <div className={navLogo}>
                    <Link 
                    key={'home'}
                    href={'/'}>
                     <Image
                        src={'/mine-boxLogo-icon.svg'}
                        alt={'minefm-logo'}
                        width={48}
                        height={48}
                        color={'#FFF'}
                    />
                    </Link>
                </div>

                <div>

                </div>

                <div className={navActions}>

                   <ConnectButton/>

                </div>
            </div>
    )
}

export default Nav;