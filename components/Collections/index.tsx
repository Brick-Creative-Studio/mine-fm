import React  from 'react'
import { CollectionSquare } from './CollectionSquare'
import styles from './Collection.module.css'


const CollectionGrid: React.FC<{ collectionData: { url: string, artist: string, title: string }[]}> = ({
    collectionData
}) => {
    console.log('collectionData', collectionData)

    return (
        
        <div  className={styles.grid}>
            {collectionData?.map((item, key) => (
                <CollectionSquare collectionData={item} />

            ))}
        </div>
    )
}

export default CollectionGrid