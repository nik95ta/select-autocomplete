import ClearIcon from './atoms/ClearIcon';
import SearchIcon from './atoms/SearchIcon';
const SearchInput = ({ searchString, setSearchString, eraseResults, placeHolder='Type Something to Search...' }) => (
        <div className="search-input">
            <SearchIcon />
            <input
                type="text"
                value={searchString}
                onChange={setSearchString}
                placeholder={placeHolder}
                onBlur={() => eraseResults()}
            />
            <ClearIcon
                setSearchString={setSearchString}
                searchString={searchString}
            />
        </div>
);
export default SearchInput;
