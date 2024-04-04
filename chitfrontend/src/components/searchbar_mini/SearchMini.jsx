import './SearchMini.css';

import SearchBar from '../inputs/SearchBar.jsx';

export default function SearchMini(){
    return (
            <div className='search-mini'>
                <h1>Search</h1>
                <SearchBar size={'large'} placeholder="Name or username"/>
            </div>
    )
}