import {configureStore} from '@reduxjs/toolkit'
import clienteReducer from './users/slice'

export const store = configureStore({
    reducer: {
        cliente: clienteReducer
    },

})