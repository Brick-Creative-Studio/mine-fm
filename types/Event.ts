export type Event = {

  id: string | null

  title: string

  address: string

  ownerAddress: string | null

  organizer: string

  artist: string

  isOnline: boolean

  isApproved: boolean

  isFree: boolean

  posterURL: string | null

  startingPrice: string | null

  startDate: Date

  endDate: Date | null

  description: string | null

}
