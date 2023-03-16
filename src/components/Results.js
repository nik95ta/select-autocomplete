import SearchIcon from './atoms/SearchIcon';
const Results = ({ results = [], onClick, setSearchString, maxResults, resultStringKeyName = 'name', showNoResultsFlag = true }) => {
    const handleClick = (result) => {
        onClick(result);
        setSearchString(result[resultStringKeyName]);
    }
    const handleMouseDown = ({ event, result }) => {
        if (event.button === 0) {
            event.preventDefault();
            handleClick(result);
        }
    }
    if (showNoResultsFlag) {
        return (
            <div className="result">
                <div className="line">
                    <ul>
                        <li>
                            <SearchIcon />
                            <div className="ellipsis">No Results</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    if (results?.length <= 0 && !showNoResultsFlag) {
        return null
    }
    return (
        <div className="result">
            <div className="line">
                <ul>
                    {results.slice(0, maxResults).map((result, index) => (
                        <li
                            key={`result-${result.id}`}
                            onMouseDown={(event) => handleMouseDown({ event, result })}
                            onClick={() => handleClick(result)}
                        >
                            <SearchIcon />
                            <div className="ellipsis">
                                {result[resultStringKeyName]}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Results;
