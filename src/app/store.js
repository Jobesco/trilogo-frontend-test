import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import crudReducer from '../features/crud/crudSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    crud: crudReducer
  },
});
