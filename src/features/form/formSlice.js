/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FormApiCall from '../../app/main/apps/utils/form/formApiCall';

const _ = require('lodash');

const initialState = {
  forms: {},
  newForm: {},
};

export const getUserForm = createAsyncThunk(
  'form/getForm',
  async () => {
    const response = await FormApiCall.getForm();
    return response;
  },
);

export const addUserForm = createAsyncThunk(
  'form/postForm',
  async (data) => {
    const response = await FormApiCall.postForm(data);
    return response;
  },
);

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserForm.fulfilled, (state, action) => {
        state.forms = _.keyBy(action.payload.data, 'fieldName');
      })
      .addCase(addUserForm.fulfilled, (state, action) => {
        state.newForm = action.payload.data;
      });
  },
});

export const formData = (state) => state.form.forms;
export const newFormData = (state) => state.form.newForm;

export default formSlice.reducer;
