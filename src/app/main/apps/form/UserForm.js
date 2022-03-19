/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  addUserForm,
  getUserForm,
  formData,
} from 'features/form/formSlice';
import FormUtils from 'app/main/apps/utils/form/formUtils';
import { GENDER_TYPE_MAP } from 'app/constants/form.constants';

const _ = require('lodash');

const initialFieldValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  age: 0,
  testimonial: '',
  gender: 'other',
};

function UserForm() {
  const dispatch = useDispatch();
  const data = useSelector((formData));

  const fieldData = FormUtils.getFilteredArray(data);
  const [value, setValue] = useState(initialFieldValues);
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserForm());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setValue({
        ...initialFieldValues,
        firstName: data.firstName.value,
        lastName: data.lastName.value,
        emailAddress: data.emailAddress.value,
        [fieldData[3].fieldName]: fieldData[3].value,
      });
    }

    if (_.has(data, 'gender')) {
      setValue((prevState) => ({
        ...prevState,
        gender: data.gender.value,
      }));
    }

    if (_.has(data, 'age')) {
      const age = parseInt(data.age.value, 10);
      setValue((prevState) => ({
        ...prevState,
        age,
      }));
    }

    if (_.has(data, 'testimonial')) {
      setValue((prevState) => ({
        ...prevState,
        testimonial: data.testimonial.value,
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    setValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const renderFields = () => {
    let ret = '';
    if (FormUtils.isFormDataValid() && !_.isEmpty(value)) {
      const randomString = fieldData[3].fieldName;
      const { [randomString]: randomStringValue } = value;
      ret = (
        <div className="m-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-fist-name"
                label="First Name"
                name="firstName"
                variant="outlined"
                value={value.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-last-name"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.lastName}
              />
            </div>

          </div>
          <div className="grid sm:grid-cols-4 gap-4 mb-4">
            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-email-address"
                label="Email Address"
                name="emailAddress"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.emailAddress}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-age"
                label="Age"
                name="age"
                type="number"
                onChange={handleChange}
                variant="outlined"
                value={value.age}
              />
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  disabled={isProcessing}
                  id="opt-field-gender"
                  value={value.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                >
                  {Object.keys(GENDER_TYPE_MAP).map((key) => (
                    <MenuItem key={key} value={key}>
                      {GENDER_TYPE_MAP[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-random"
                label={fieldData[3].fieldName}
                name={fieldData[3].fieldName}
                multiline
                onChange={handleChange}
                required
                variant="outlined"
                value={randomStringValue}
              />
            </div>
          </div>

          <div>
            <TextField
              disabled={isProcessing}
              fullWidth
              id="field-testimonial"
              label="Testimonial"
              multiline
              name="testimonial"
              onChange={handleChange}
              required
              variant="outlined"
              value={value.testimonial}
            />
          </div>

        </div>
      );
    }
    return ret;
  };

  const renderSubmitButton = () => FormUtils.isFormDataValid() && (
  <div className="flex justify-center">
    <Button
      className="mb-12"
      color="success"
      disabled={isProcessing}
      variant="contained"
      type="submit"
    >
      {isProcessing && <CircularProgress className="mr-2" size={12} />}
      Submit
    </Button>
  </div>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsProcessing(true);
    dispatch(addUserForm(value)).then((response) => {
      if (response.type === 'form/postForm/fulfilled') {
        setOpen(true);
        setIsProcessing(false);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <form
        className="p-4"
        onSubmit={handleSubmit}
      >
        <div className="ml-8">
          <Typography
            variant="h3"
          >
            Dynamic User Form
          </Typography>
        </div>

        {renderFields()}

        {renderSubmitButton()}

      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
        open={open}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </>

  );
}

export default UserForm;
