import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import usePersistent from '../hooks/usePersistent'

const Protected = () => {
    const { getPersistentItem } = usePersistent()
    const persistentToken = getPersistentItem('token')
    const persistentId = getPersistentItem('userId')
    if (!persistentId || !persistentToken) {
        return <Navigate to={'/login'} />
    }
    return (
        <Outlet />
    )
}

export default Protected