import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

const useAuth = () => {
    let context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthContextProvider only!');
    }
    return context
}
export default useAuth