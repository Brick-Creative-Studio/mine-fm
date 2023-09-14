import React from "react";
import Image from "next/image";
import styles from './MoodCard.module.css'


export const MoodCard = () => {


    return (
      <div className={'flex flex-col p-2 px-4 mb-4 rounded-md drop-shadow-lg w-72 bg-[#1D0045]'}>
        <div className={styles.overlay}>
          <div className={'md:opacity-0 md:hover:opacity-100 w-full h-full fixed bg-transparent '}>
            <img alt={'play-icon'} src={'/play.svg'} className={'z-20 w-20 h-20 absolute top-28'} />
          </div>
          <img alt={'Mood artwork'} className={'-z-10 self-center w-64 h-48 border-solid rounded-md border-[#B999FA]'} src={'/stock/stonie-test-poster.jpeg'} />
        </div>
        <div className={'flex justify-between'}>
          <p className={'text-[#B999FA]'}>Bad Bunny </p>
          <p className={'text-[#B999FA]'}> 08-07-23 </p>
        </div>
        <p className={'my-0 text-xl text-[#B999FA]'}> any Other Name </p>

        <p className={'my-0 text-sm'}> Morem ipsum dolor sit amet, consectetur adipiscing elit... </p>

        <div className={'flex my-2'}>
          <div className={'border-solid border border-[#984DDF] px-2 py-0 mr-6'}> <h3 className={'text-sm text-[#984DDF]'}> EXPERIMENTAL </h3>  </div>
          <div className={' border-solid border border-[#984DDF] px-2'}> <h3 className={'text-sm text-[#984DDF]'}> AMBIENT </h3>  </div>

        </div>
      </div>
    )
}