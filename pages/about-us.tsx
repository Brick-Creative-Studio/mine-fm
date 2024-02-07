import React from 'react'
import styles from '../styles/home.module.css'


export default function LivestreamPage() {


  return (
    <div className={'h-full w-1/2 mt-28 m-auto'}>
    {/*<div className={styles.typewriter}>*/}
      <p className={'text-4xl'}>
        MINE.FM exists to make music discovery beneficial for both artists and fans. Audiophiles are brought together by the communal appreciation of sound, but communities will not form if kindred souls can't connect. We let music function as the signal for that connection.
      </p>
      <p className={'text-4xl'}>
        Our platform is for the artists and the crate-diggers. We leverage decentralized tech to enable portable identities not bound by platform but by experiences. We're cultivating a space to make sharing and listening to music more communal, more intentional, and more lucrative.
      </p>

      <p className={'text-4xl'}>
        The industry can no longer keep up with democratization of music creation and distribution. For better or worse, the future of music is now in our hands to shape, will you let it be theirs or <span className={'italic'}>MINE</span>?
      </p>
    {/*</div>*/}
    </div>
  )
}