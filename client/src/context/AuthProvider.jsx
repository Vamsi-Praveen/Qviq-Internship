import { createContext, useEffect, useState } from "react";
import usePersistent from "../hooks/usePersistent";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const { getPersistentItem } = usePersistent()
    const persistentId = getPersistentItem('userId')
    const [userId, setUserId] = useState(persistentId || 'null')
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:4000/api/get-user/${userId}`)
                .then((data) => {
                    setUser(data?.data?.data)
                })
        }
        fetchData()
    }, [])
    return <AuthContext.Provider value={{ user, setUser, token, setToken, userId, setUserId }}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider