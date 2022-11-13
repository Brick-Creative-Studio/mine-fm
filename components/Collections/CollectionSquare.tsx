import React  from 'react'
import Image from 'next/image'



export const CollectionSquare: React.FC<{ collectionData: { url: string, artist: string, ore: string }}> = ({
     collectionData
    }) => {


    return (
        <div>
           {
           collectionData && (
            <>
           <Image src={ collectionData.url } width={195} height={195}/>
           <div>
            {collectionData.artist}
            </div>
            <div>
            {collectionData.ore}
            </div>
            </>
            )}
        </div>
    )
}