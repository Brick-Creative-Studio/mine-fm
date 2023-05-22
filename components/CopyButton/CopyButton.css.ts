import { style, styleVariants } from '@vanilla-extract/css'

export const copyButton = style({
    display: 'inline-flex',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 'round',
    borderStyle: 'solid',
    borderWidth: 'thin',
    cursor: 'pointer',

})

export const copyButtonVariants = styleVariants({
  default: copyButton, padding: '4',
  icon: copyButton, padding: '2',
})