import React from "react";
import { useLayoutStore, useMCStore } from "../../../../stores";
import { useRouter } from "next/router";
import AuraForm from "../../../../components/Forms/AuraForm";
import IdentityForm from "../../../../components/Forms/IdentityForm";
import { SettingsSectionHandler as SectionHandler } from "../../../../components/Layout/SectionHandlers/SettingsSectionHandler";
import Link from "next/link";
import Image from "next/image";

export default function SettingsPage({}){

  const { signerAddress } = useLayoutStore((state) => state)
  const { query } = useRouter()
  const { needsCard, setStatus} = useMCStore((state) => state)

  let sections = [
    {
      title: 'Aura',
      component: [<AuraForm key={'Aura'} />],
    },
    {
      title: 'Identity',
      component: [<IdentityForm key={'Identity'} />],
    },
  ]


  return (
    <div className="flex flex-col w-full mt-28">
      <div className="flex flex-row w-full items-center">
        <div className="absolute ml-12">
          <Link
            href={{
              pathname: `/profile/${signerAddress}`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <Image src={'/chevron-left.svg'} width={32} height={32} alt="back button" />
              <h3>Profile</h3>
            </div>
          </Link>
        </div>
        <div className={'mx-auto'}>
          <h2 > Profile Settings </h2>
        </div>
      </div>
          <SectionHandler
            sections={sections}
            signerAddress={signerAddress ? signerAddress : undefined}
            activeTab={query?.tab ? (query.tab as string) : undefined}
          />
    </div>
  )
}
