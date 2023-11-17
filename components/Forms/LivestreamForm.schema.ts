import * as Yup from 'yup'

import { urlValidationSchema} from "../../utils/yup";
import { addressValidationSchema } from "../../utils/yup";


export interface LivestreamInputValues {
  title: string
  organizer: string
  ownerAddress: string
  artist: string
  description: string
  posterUrl: string
  website?: string
  social: string
  startDate: string
  startTime: string
  startingPrice: string
  isApproved: boolean
  isFree: boolean
  endDate: string
  endTime: string
}

export const streamValidationSchema: Yup.ObjectSchema<LivestreamInputValues> = Yup.object({
  title: Yup.string().required(),
  ownerAddress: addressValidationSchema.required(),
  organizer: Yup.string().required(),
  artist: Yup.string().required(),
  description: Yup.string().required(),
  posterUrl: Yup.string().required(),
  website: urlValidationSchema,
  social: Yup.string().required(),
  startDate: Yup.string()
    .required('*')
    .test('isDateInFuture', 'Must be in future', (value: string | undefined) => {
      if (!value) return false
      const date = new Date(value)
      const now = new Date()
      return date > now
    }).required('Start Date is required'),
  startTime: Yup.string().required('Start Time is required'),
  endDate: Yup.string()
    .required('*')
    .test('isDateInFuture', 'Must be in future', (value: string | undefined) => {
      if (!value) return false
      const date = new Date(value)
      const now = new Date()
      return date > now
    }).required('End Date is required'),
  endTime: Yup.string().required('End Time is required'),
  startingPrice: Yup.string().required(),
  isApproved: Yup.boolean().required(),
  isFree: Yup.boolean().required()

})
