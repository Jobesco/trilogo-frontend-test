import { configureStore } from '@reduxjs/toolkit';
import crudReducer from '../features/crud/crudSlice';
// import generalReducer from '../features/generalSlice'

export default configureStore({
  reducer: {
    crud: crudReducer,
  },
});
