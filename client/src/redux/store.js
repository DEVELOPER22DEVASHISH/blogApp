import { createSlice, configureStore } from '@reduxjs/toolkit'


const authoSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false
    },
    reducers: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.login = false
        }
    }
})

export const authActions = authoSlice.actions

export const store = configureStore({
    reducer: authoSlice.reducer
})