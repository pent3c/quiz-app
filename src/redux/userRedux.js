import { createSlice } from "@reduxjs/toolkit";

const THREE_DAYS_IN_MS = 1 * 1 * 10 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "electron",
        answers: {},
        countDownTime: 22222
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