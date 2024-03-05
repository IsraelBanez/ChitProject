import '../styles/component-styles/SearchBar.css';

import {ReactComponent  as SearchIcon} from '../icons/search-icon.svg';

export default function SearchBar(){
    return (
            <div className='search-bar'>
                <h1>Search</h1>
                <div>
                    <input type="search" placeholder="Name or username">
                    </input> 
                    <button>
                        <SearchIcon/>
                    </button>
                </div>
            </div>
    )
}