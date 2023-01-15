import { style } from '@vanilla-extract/css'



export const NavBar = style([
    {
        display: 'flex',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent : 'space-between',
        width: '100%',
        padding: '20px 32px',
        background: '#5D2E8C', 
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
        background: 'linear-gradient(180deg, #FFB200 0%, #FF2313 100%)'
    
    }
])

export const navLogo = style ([
    {
        alignSelf: 'center'
    }
])
