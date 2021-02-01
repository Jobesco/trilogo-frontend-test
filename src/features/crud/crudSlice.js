import { createSlice } from '@reduxjs/toolkit'

export const crudSlice = createSlice({
  name: 'crud',
  initialState: [
    {desc: 'test1', resp: 'resp1', tipo: 'Bem', id: 0},
    {desc: 'test2', resp: 'resp2', tipo: 'Predial', id: 1}
  ],
  reducers: {
    // TODO async functions
    create: (state, action) => {
      state.push(action.payload)
    },
    update: (state,action) => {
      state = state.map((item) => {
        if(item.id == action.payload.id){ // * change in this one
          return action.payload
        }else return item
      })
    },
    deleteCRUD: (state,action) => {
      state = state.filter((item) => item.id != action.payload.id)
    },
  }
})

export const { create, update, deleteCRUD } = crudSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCRUD = state => state.crud;

export default crudSlice.reducer