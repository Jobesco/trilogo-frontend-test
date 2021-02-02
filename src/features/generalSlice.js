import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
      turnOffModal: true
  },
  reducers: {
    change: state => {
        state.turnOffModal = !state.turnOffModal
    },
  }
})

export const { change } = generalSlice.actions

export const getModalState = state => state.general.turnOffModal;

export default generalSlice.reducer