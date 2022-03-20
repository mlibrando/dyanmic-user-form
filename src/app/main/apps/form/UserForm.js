/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
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

const _ = require('lodash');

const initialFieldValues = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  },
  company: {
    name: '',
    catchPhrase: '',
  },
};

function UserForm() {
  const dispatch = useDispatch();
  const data = useSelector((formData));

  // const fieldData = FormUtils.getFilteredArray(data);
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
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        street: data.address.street,
        suite: data.address.suite,
        city: data.address.city,
        zipcode: data.address.zipcode,
        companyName: data.company.name,
        companyCatchPhrase: data.company.catchPhrase,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const renderFields = () => {
    let ret = (
      <div>
        <div className="flex justify-center my-4">
          <Typography variant="body2" color="error">
            If no content is being loaded below, this is likely a CORS issue.
            Try opening this page in another browser like Opera and see if that fixes the issue.
          </Typography>
        </div>
        <div className="flex justify-center">
          <CircularProgress />
        </div>

      </div>
    );
    if (FormUtils.isFormDataValid() && !_.isEmpty(value)) {
      // const randomString = fieldData[3].fieldName;
      // const { [randomString]: randomStringValue } = value;
      ret = (
        <div className="m-8">
          <div className="grid sm:grid-cols-4 gap-4 mb-4">
            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-full-name"
                label="Full Name"
                name="name"
                variant="outlined"
                value={value.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-user-name"
                label="Username"
                name="username"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.username || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-phone"
                label="Phone"
                name="phone"
                onChange={handleChange}
                variant="outlined"
                value={value.phone || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-email-address"
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.email || ''}
              />
            </div>

          </div>
          <div className="grid sm:grid-cols-4 gap-4 mb-4">

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-address-line-1"
                label="Address Line 1"
                name="street"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.street || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-address-line-2"
                label="Address Line 2"
                name="suite"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.suite || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-address-city"
                label="City"
                name="city"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.city || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-address-zipcode"
                label="Zipcode"
                name="zipcode"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.zipcode || ''}
              />
            </div>

          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-company-name"
                label="Company Name"
                name="companyName"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.companyName || ''}
              />
            </div>

            <div>
              <TextField
                disabled={isProcessing}
                fullWidth
                id="field-company-phrase"
                label="Company Phrase"
                multiline
                name="companyCatchPhrase"
                onChange={handleChange}
                required
                variant="outlined"
                value={value.companyCatchPhrase || ''}
              />
            </div>
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
    const {
      name,
      username,
      email,
      phone,
      street,
      suite,
      city,
      zipcode,
    } = value;

    const transformedData = {
      name,
      username,
      email,
      phone,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
      company: {
        name: value.companyName,
        catchPhrase: value.companyCatchPhrase,
      },
    };
    event.preventDefault();
    setIsProcessing(true);
    dispatch(addUserForm(transformedData)).then((response) => {
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
