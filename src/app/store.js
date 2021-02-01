import { configureStore } from '@reduxjs/toolkit';
import crudReducer from '../features/crud/crudSlice';

export default configureStore({
  reducer: {
    crud: crudReducer
  },
});
