import { useState } from 'react'
import Link from 'next/link'

const Hamburger = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }
  return (
    <div>
      <div className="pl-[20px]" onClick={toggleHamburger}>
        <div className="flex justify-around flex-col flex-nowrap w-[2rem] h-[2rem] z-10">
          <div
            className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
              hamburgerOpen ? 'rotate-45' : 'rotate-0'
            }`}
          />
          <div
            className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
              hamburgerOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
          <div
            className={`flex w-[6px] h-[6px] rounded-full bg-white origin-[1px] transition-all ${
              hamburgerOpen ? '-rotate-45' : 'rotate-0'
            }`}
          />
        </div>
      </div>
      <div
        className={`${
          hamburgerOpen ? 'inline' : 'hidden'
        } absolute md:right-[150px] right-[115px] top-[50px]`}
      >
        <Link key={'about-us'} href={'/about-us'}>
          <p
            className={`text-xl text-white cursor-pointer hover:text-purple-800`}
            onClick={toggleHamburger}
          >
            ABOUT US
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Hamburger
