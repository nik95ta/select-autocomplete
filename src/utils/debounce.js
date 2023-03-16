const debounce = (func) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args)
        }, 200);
    }
}
export default debounce;
