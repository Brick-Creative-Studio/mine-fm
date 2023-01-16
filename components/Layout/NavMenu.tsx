import React, { useState } from 'react'
import { navAvatar } from './styles.css'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import useSWR from 'swr'
import { useLayoutStore } from 'stores'



const NavMenu: React.FC<{}> = () => {

    const signerAddress = useLayoutStore((state) => state.signerAddress)
    const [isOpenMenu, setIsOpenMenu] = useState(false)



    return (
        <div onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <button className={navAvatar} />

            {isOpenMenu ?
                <ul>
                    <div>
                        Disconnect
                    </div>
                    <div>
                        Profile
                    </div>
                </ul>
                : null}

        </div>
    )
}

export default NavMenu