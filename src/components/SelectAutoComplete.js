import { useEffect, useState, useCallback } from 'react';
import debounce from '../utils/debounce';
import findItems from '../utils/findItems';
import Results from './Results';
import SearchInput from './SearchInput';
export const MAX_RESULTS = 10;
const ReactSearchAutocomplete = ({ items = [], onSearch = () => {}, onSelect = () => {}, resultStringKeyName }) => {

    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
    const [isSearchComplete, setIsSearchComplete] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showNoResultsFlag, setShowNoResultsFlag] = useState(false);

    useEffect(() => {
        searchString?.length > 0 && results && results?.length > 0 && setResults(findItems(items, searchString, resultStringKeyName));
    }, [items]);

    useEffect(() => {
        if (searchString.length > 0 && !isTyping && results.length === 0 && !isSearchComplete) {
            setShowNoResultsFlag(true);
        } else {
            setShowNoResultsFlag(false);
        }
    }, [isTyping, isSearchComplete, searchString, results])

    useEffect(() => {
        const handleDocumentClick = () => {
            eraseResults();
        }
        document.addEventListener('click', handleDocumentClick)
        return () => document.removeEventListener('click', handleDocumentClick)
    }, []);
    const callOnSearch = (keyword) => {
        let newResults = [];
        keyword?.length > 0 && (newResults = findItems(items, keyword, resultStringKeyName));
        setResults(newResults);
        onSearch(keyword, newResults);
        setIsTyping(false);
    };
    const handleOnSearch = useCallback(
        debounce((keyword) => callOnSearch(keyword)),
        [items]
    );
    const handleOnClick = (result) => {
        eraseResults();
        onSelect(result);
        setSearchString(result[resultStringKeyName]);
    };
    const handleSetSearchString = ({ target }) => {
        const keyword = target.value;
        setSearchString(keyword);
        handleOnSearch(keyword);
        setIsTyping(true);
        if (isSearchComplete) {
            setIsSearchComplete(false);
        }
    };
    const eraseResults = () => {
        setResults([]);
        setIsSearchComplete(true);
    };
    return (
            <>
                <SearchInput
                    searchString={searchString}
                    setSearchString={handleSetSearchString}
                    eraseResults={eraseResults}
                    placeHolder={'Search Phone Name...'}
                />
                <Results
                    results={results}
                    onClick={handleOnClick}
                    setSearchString={setSearchString}
                    maxResults={MAX_RESULTS}
                    resultStringKeyName={resultStringKeyName}
                    showNoResultsFlag={showNoResultsFlag}
                />
            </>
    )
}

export default ReactSearchAutocomplete;
