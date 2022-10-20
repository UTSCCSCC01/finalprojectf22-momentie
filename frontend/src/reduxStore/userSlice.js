import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
    },
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeEmail } = userSlice.actions

export default userSlice.reducer