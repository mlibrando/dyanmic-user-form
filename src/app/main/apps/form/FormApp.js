/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Grid,
  Paper,
} from '@mui/material';
import UserForm from './UserForm';
import ResponseList from './ResponseList';

function FormApp() {
  return (
    <Grid
      container
      className="flex justify-center"
    >
      <Grid item xs={6}>
        <Paper className="mt-8" elevation={3}>
          <UserForm />
        </Paper>
        <ResponseList />
      </Grid>
    </Grid>
  );
}

export default FormApp;
