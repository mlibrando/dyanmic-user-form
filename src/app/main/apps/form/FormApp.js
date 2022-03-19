/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Paper,
} from '@mui/material';
import UserForm from './UserForm';
import ResponseList from './ResponseList';

function FormApp() {
  return (
    <div className="grid sm:grid-cols-1 gap-4 p-8">
      <Paper className="mt-8" elevation={3}>
        <UserForm />
      </Paper>
      <ResponseList />
    </div>
  );
}

export default FormApp;
