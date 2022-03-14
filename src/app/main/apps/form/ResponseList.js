/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  newFormData,
} from 'features/form/formSlice';
import {
  Paper,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

const _ = require('lodash');

function ResponseList() {
  const createdFormData = useSelector((newFormData));

  const renderCreatedFormData = () => {
    let ret = '';
    if (!_.isEmpty(createdFormData)) {
      const createdDataKeys = Object.keys(createdFormData);
      const createdData = Object.keys(createdFormData).map((element, index) => (
        <div key={element}>
          {createdDataKeys[index]}
          {' '}
          :
          {' '}
          {createdFormData[element]}
        </div>
      ));
      ret = (
        <div className="p-4 m-8">
          <Typography
            variant="h4"
          >
            Response
          </Typography>
          {createdData}
        </div>
      );
    }
    return ret;
  };
  return (
    <Paper elevation={3} className="mt-8">
      {renderCreatedFormData()}
    </Paper>
  );
}

export default ResponseList;
