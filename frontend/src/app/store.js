import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';

/**
 * Configuration du store global de l'application
 */
export const store = configureStore({
    reducer: {
        // Reducer pour la gestion des appels API (RTK Query)
        [apiSlice.reducerPath]: apiSlice.reducer,

        // Reducer pour la gestion de l'authentification
        auth: authReducer
    },

    // Ajout du middleware pour gérer le cache et les requêtes de apiSlice
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),

    // Activation des outils de développement (Redux DevTools)
    devTools: true
});