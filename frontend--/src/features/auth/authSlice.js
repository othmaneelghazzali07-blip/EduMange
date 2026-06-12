import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

/**
 * Initialisation des données utilisateur depuis les cookies
 */
let parsedUser = null;
const rawUser = Cookies.get('user');

if (rawUser && rawUser !== "undefined") {
    try {
        parsedUser = JSON.parse(rawUser);
    } catch (e) {
        parsedUser = null;
    }
}

const initialState = {
    user: parsedUser,
    token: Cookies.get('token') || null,
    isAuthenticated: !!Cookies.get('token'),
};


/**
 * authSlice
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // setCredentials
        setCredentials: (state, action) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
            state.isAuthenticated = true;

            // Sauvegarde des données dans les cookies pour 7 jours
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
            Cookies.set('token', token, { expires: 7 });
        },


        // logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Suppression des données des cookies
            Cookies.remove('user');
            Cookies.remove('token');
        },

    },
});


/**
 * Exportation des actions et du reducer
 */
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;


/**
 * Selectors pour accéder aux données de l'état
 */
export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.token;