import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore, useProfileStore } from 'stores'
import { useForm, SubmitHandler } from 'react-hook-form'
import auraCircle from '../../../styles/aura.css'
import { useRouter } from 'next/router'
import AuraForm from "../../../components/Forms/AuraForm";
import { useIsMounted } from "../../../hooks/useMounted";
import { useAccount} from "wagmi";


export default function Aura({})  {
  const router = useRouter()
  const isMounted = useIsMounted()
  const { address, isConnecting, isDisconnected } = useAccount()

  return isMounted ? (
    <div className="flex flex-col mt-24 ">
      <div className="flex justify-around  items-center">
        <div className="">
          <Link
            href={{
              pathname: `/profile/${address}/identity`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <Image src={'/chevron-left.svg'} width={32} height={32} alt="back button" />
              <h3>Back</h3>
            </div>
          </Link>
        </div>

        <h2 className={'w-24 text-center'}> Change Aura </h2>

        <div className="invisible">
          <Link
            href={{
              pathname: `/profile/${address}/mc-gallery`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <h3>Gallery</h3>
              <Image
                src={'/chevron-right.svg'}
                width={32}
                height={32}
                alt="gallery button"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full border border-white opacity-10 border-solid bg-white" />
      <AuraForm/>
    </div>
  ): null
}


