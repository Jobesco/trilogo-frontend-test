import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createReducer from '../features/crud/createSlice';
import readReducer from '../features/crud/readSlice';
import updateReducer from '../features/crud/updateSlice';
import deleteReducer from '../features/crud/deleteSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    create: createReducer,
    read: readReducer,
    update: updateReducer,
    delete: deleteReducer,
  },
});
