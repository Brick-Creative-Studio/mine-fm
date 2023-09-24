import { style } from '@vanilla-extract/css'


export const flexContainer = style([
    {
        display: 'flex',
        minHeight: '100vh', 
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
])


export const NavBar = style([
    {
        display: 'flex',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent : 'space-between',
        width: '100%',
        padding: '20px 32px',
        '@media': {
            '(max-width: 768px)': {
                padding: '10px 32px',
            },
        },
    },
])

export const navActions = style([
    {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    }
])

export const navConnect = style([
    {
        margin: 8,
        borderRadius: 6,
        color: '#EFE9DB',
        fontSize: 16,
        background: 'rgba(0, 0, 0, 0.2)',
        height: 40,
        width: 166.1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        alignItems: 'center',

    }
])

export const navButtonRadio = style([
    {
        margin: 8,
        borderRadius: 6,
        color: '#EFE9DB',
        fontSize: 16,
        background: 'rgba(0, 0, 0, 0.2)',
        height: 40,
        width: 93.05,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
])

export const navCreate = style([
    {
        margin: 8,
        marginLeft: 12,
        borderRadius: 6,
        color: '#EFE9DB',
        fontSize: 16,
        background: 'rgba(0, 0, 0, 0.2)',
        height: 40,
        width: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        cursor: 'pointer'
    }
])

export const navButtonMap = style([
    {
        margin: 8,
        borderRadius: 6,
        width: 82.05,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: '#EFE9DB',
        fontSize: 16,
        background: 'rgba(0, 0, 0, 0.2)'
    }
])

export const navAvatar = style ([
    {
        margin: 8,
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex', 
        cursor: 'pointer'

    
    }
])

export const miniAvatar = style ([
    {
        margin: 8,
        borderRadius: '50%',
        width: 32,
        height: 32,
        display: 'flex',
        cursor: 'pointer'


    }
])

export const navLogo = style ([
    {
        alignSelf: 'center',
        cursor: 'pointer'
    }
])



export const inputFocus = style({
    outlineOffset: '-2px'
})

export const searchContainer = style({
    // top: '50%',
    // left: '50%',
    marginTop: '1em',
    width: '500px',
    borderRadius: '30px',
    margin: '12px'
    // opacity: '0.2',
    // backgroundColor: '#FFF',
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

export const footerLogo = style([

])
