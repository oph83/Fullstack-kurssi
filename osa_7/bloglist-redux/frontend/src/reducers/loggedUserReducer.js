import { createSlice } from '@reduxjs/toolkit'

import loggedUserService from '../services/loggedUser'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: loggedUserService.getUser(),
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
    clearLoggedUser() {
      return null
    },
  },
})

export const { setLoggedUser, clearLoggedUser } = loggedUserSlice.actions

export const loginUser = () => {
  return async dispatch => {
    const userFromStorage = await loggedUserService.getUser()
    if (userFromStorage) {
      dispatch(setLoggedUser(userFromStorage))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(clearLoggedUser())
  }
}

export default loggedUserSlice.reducer