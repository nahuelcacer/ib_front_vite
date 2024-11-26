import React, { createContext } from 'react'

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const { username, role } = JSON.parse(sessionStorage.getItem('user'))

    return (
        <ProfileContext.Provider value={{username, role}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider