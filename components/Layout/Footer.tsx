import React  from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'

const Footer = () => {

    return (
        <footer className={styles.footer}>
        <a
          href="brickxstudio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Brick Studio Product{' '}
          <span className={styles.logo}>
            <Image src="/BrckStd_BS-logo-Black.svg" alt="Brick Studio Logo" width={42} height={42} />
          </span>
        </a>
      </footer>
    )
}

export default Footer