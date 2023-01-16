import React  from 'react'
import Image from 'next/image'
import styles from './Collection.module.css'


export const CollectionSquare: React.FC<{ collectionData: { url: string, artist: string, title: string }}> = ({
     collectionData
    }) => {


    return (
        <div className={styles.collection}>
           {
           collectionData && (
            <>
           <Image src={ collectionData.url } width={125} height={125}/>
           <div>
            {collectionData.artist}
            </div>
            <div>
            {collectionData.title}
            </div>
            </>
            )}
        </div>
    )
}