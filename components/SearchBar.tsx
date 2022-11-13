import React  from 'react'
import { inputFocus, container, submitsearch, searchInput } from '../styles/SearchBar.css';
import searchIcon from '../public/search-icon-24.png'




const SearchBar = () => {

    return (
        <div className={container}>
        <input src='../public/search-icon-24.png' type="text" className={searchInput} placeholder="Songs, artists, playlists, moods..." />
      </div>
    )   

}

export default SearchBar;