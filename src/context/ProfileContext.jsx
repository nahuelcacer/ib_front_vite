import React, { createContext } from 'react'

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const { username, role, token_ib, institution_id, customer_id, client_id, accounts, id } = JSON.parse(sessionStorage.getItem('user'))

    return (
        <ProfileContext.Provider value={{username, role, token_ib, institution_id, customer_id, client_id, accounts, id }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider