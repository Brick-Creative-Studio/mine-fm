export type Event = {

  id: string | null

  title: string

  address: string

  ownerAddress: string | null

  ownerId: string | null

  ownerAura: string | null

  tokenAddress: string | null

  tokenId: number | null

  tokensMinted: number | null

  memoryCard: string | null

  organizer: string

  splitAddress: string | null

  artist: string

  social: string | null;

  website: string | null;

  isOnline: boolean

  isApproved: boolean

  isFree: boolean

  posterURL: string | null

  startingPrice: string | null

  statsMetadata: string | null

  startDate: Date

  endDate: Date

  description: string | null

}
