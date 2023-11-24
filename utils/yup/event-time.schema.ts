import * as Yup from 'yup'

export const livestreamSchema = Yup.object().shape({

})

const requiredString = Yup.string().required("please enter a date in the future");
