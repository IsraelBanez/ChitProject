import './SearchMini.css';

import SearchBarV1Input from '../inputs/SearchBarV1Input.jsx';

export default function SearchMini(){
    return (
            <div className='search-mini'>
                <h1>Search</h1>
                <SearchBarV1Input size={'large'} placeholder="Name or username"/>
            </div>
    )
}