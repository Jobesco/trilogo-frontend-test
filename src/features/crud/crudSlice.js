import { createSlice, nanoid } from '@reduxjs/toolkit'

export const crudSlice = createSlice({
  name: 'crud',
  initialState: {
    turnOffModal: true,
  },
  reducers: {
    // TODO async functions
    // * entries have 'DATA:' at the beggining of the key
    create: (state, action) => {
      localStorage.setItem('DATA:'+nanoid(),JSON.stringify(action.payload))
      // state.db.push(action.payload)
    },
    update: (state,action) => {

      console.log(action.payload,'AHAHAHA')
      localStorage.setItem(action.payload.id,JSON.stringify(action.payload.data))

      // console.log(state,'state')
      // return state.db.map((item) => {
      //   if(item.id === action.payload.id){ // * change in this one
      //     console.log(action.payload,'payload')
      //     console.log(item,'item')
      //     return action.payload
      //   }else return item
      // })
    },
    deleteCRUD: (state,action) => {
      localStorage.removeItem(action.payload)
    },
    change: state => {
      state.turnOffModal = !state.turnOffModal
    },
  }
})

export const { create, update, deleteCRUD, change } = crudSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const getCRUD = state => {return state.crud.db};
export const getCRUD = () => {
  let arr = []
  for (let x in localStorage) {
    if(x.slice(0,5) === 'DATA:'){
      // localStorage.clear() 
      arr.push({ data: JSON.parse(localStorage.getItem(x)), id: x })
    }
  }
  return arr
};
export const getModalState = state => state.crud.turnOffModal;


export default crudSlice.reducer