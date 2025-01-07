import React, { createContext } from 'react'
import authService from '../service/auth';
import { jwtDecode } from 'jwt-decode';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const token = authService.getToken()
    const decodedToken = jwtDecode(token)
    const { username, role, token_ib, institution_id, customer_id, client_id, accounts, id } = decodedToken

    return (
        <ProfileContext.Provider value={{username, role, token_ib, institution_id, customer_id, client_id, accounts, id }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider