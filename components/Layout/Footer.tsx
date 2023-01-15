import React  from 'react'
import Image from 'next/image'

const Footer = () => {

    return (
        <footer>
        <a
          href="https://brickxstudio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Brick Studio Product{' '}
          <span>
            <Image src="/BrckStd_BS-logo-Black.svg" alt="Brick Studio Logo" width={42} height={42} />
          </span>
        </a>
      </footer>
    )
}

export default Footer