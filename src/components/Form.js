import { useEffect, useState } from "react";
import axios from "axios";
import SelectAutoComplete from '../components/SelectAutoComplete';
// import mockedData from '../data/mockedData';
const Form = () => {

    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('https://dummyjson.com/products').then((response) => {
            if (response.data?.products && Array.isArray(response.data?.products)) {
                setCollection(response.data.products);
            }
        }).catch((error) => {
            console.log("Error getting data: " + error);
        }).finally(() => setLoading(false));
    }, []);
    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };
    const handleOnSelect = (item) => {
        console.log(item);
    };
    if (loading) {
        return <div className="loading">Loading</div>;
    }
    return (
        <div className="search-auto-complete">
            <div className="wrapper">
                <SelectAutoComplete
                    items={collection}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    resultStringKeyName='title'
                />
            </div>
        </div>);
};

export default Form;
