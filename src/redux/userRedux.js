import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "electron",
        answers: {}
    },
    reducers: {
        addUserAnswer: (state, action) => {
            const quizId = action.payload.quizId
            const userChoice = action.payload.userChoice
            state.answers[quizId] = userChoice
        }
    }
})

export const { addUserAnswer } = userSlice.actions
export default userSlice.reducer