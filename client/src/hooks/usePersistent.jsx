const usePersistent = () => {
    const setPersistentItem = (key, item) => {
        return localStorage.setItem(key, JSON.stringify(item))
    }
    const getPersistentItem = (key) => {
        const item = localStorage.getItem(key);
        return JSON.parse(item)
    }
    const deleteItem = () => {
        return localStorage.clear()
    }
    return { setPersistentItem, getPersistentItem, deleteItem }
}

export default usePersistent