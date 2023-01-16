import React  from 'react'
import { inputFocus, searchContainer, submitsearch, searchInput } from './styles.css';
import searchIcon from '../public/search-icon-24.png'




const SearchBar = () => {

    return (
        <div className={searchContainer}>
        <input src='../public/search-icon-24.png' type="text" className={searchInput} placeholder="Songs, artists, playlists, moods..." />
      </div>
    )   

}

export default SearchBar;