import { keyframes, style } from '@vanilla-extract/css'
import searchIcon from '../public/search-icon-24.png'
import Image from 'next/image'
 


export const inputFocus = style({
    outlineOffset: '-2px'
})

export const container = style({
    // top: '50%',
    // left: '50%',
    marginTop: '1em',
    width: '500px',
    borderRadius: '30px',
    margin: '12px'
    // opacity: '0.2',
    // backgroundColor: '#FFF',
  })




export const submitsearch = style({
  // border: '1px solid rgb(138, 134, 134)',
  // marginLeft: '-82px',
  // padding: '5px',
  // borderRadius: '19px',
  // cursor: 'pointer',
  // paddingLeft: '10px',
  // paddingRight: '8px', 
  // paddingTop: '4px',
  // display: 'none',
  // boxShadow: '0 0 1px black',
  // opacity: '0.2',
  // backgroundColor: 'white',
  // marginRight: '110px',
  // width: 'inherit'

  
})

export const searchInput = style({
      width: 'inherit',
      borderRadius: 'inherit',
      fontSize: '16px',
      color: '#FFF',
      // backgroundPosition: '10px 7px',
      backgroundRepeat: 'no-repeat',
      padding:' 8px 20px 8px 40px',
      backgroundColor: 'rgba(254, 254, 254, 0.2)',
      outline: 'none',
      border: 'none'
})
