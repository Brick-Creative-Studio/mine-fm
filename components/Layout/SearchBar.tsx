import React  from 'react'
import { searchContainer, searchInput } from './styles.css';




const SearchBar = () => {

    return (
        <div className={searchContainer}>
        <input src='../public/search-icon-24.png' type="text" className={searchInput} placeholder="Songs, artists, playlists, moods..." />
      </div>
    )   

}

export default SearchBar;