import { createSlice } from '@reduxjs/toolkit'
import type { Cliente } from '@/hooks/Clientes/clientes.types'


const initialState: Cliente[] = []

export const clienteReducer = createSlice({
    name: 'cliente',
    initialState,
    reducers: {}
})

export default clienteReducer.reducer