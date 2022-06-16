import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeOutId = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    },
  },
})

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createMessage(message))

    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      dispatch(clearMessage())
    }, time)
  }
}

export const { createMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer