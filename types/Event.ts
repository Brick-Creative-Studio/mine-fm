export type Event = {

  id: string | null

  title: string

  address: string

  ownerAddress: string | null

  tokenAddress: string | null

  tokenId: number | null

  memoryCard: string | null

  organizer: string

  splitAddress: string | null

  artist: string

  isOnline: boolean

  isApproved: boolean

  isFree: boolean

  posterURL: string | null

  startingPrice: string | null

  startDate: Date

  endDate: Date

  description: string | null

}
