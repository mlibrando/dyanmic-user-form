/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
