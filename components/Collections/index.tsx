import React  from 'react'
import { CollectionSquare } from './CollectionSquare'

const CollectionGrid: React.FC<{ collectionData: { url: string, artist: string, ore: string }[]}> = ({
    collectionData
}) => {

    return (
        <div>
            {collectionData?.map((item, key) => (
                <CollectionSquare collectionData={item} />
            ))}
        </div>
    )
}

export default CollectionGrid