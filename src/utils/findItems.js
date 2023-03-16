const findItems = (collection, keyword, selector) =>
    collection.filter(item => item[selector].toLowerCase().includes(keyword.toLowerCase()));
export default findItems;
