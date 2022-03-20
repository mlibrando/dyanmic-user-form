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

function renderData(data) {
  const objectKeys = Object.keys(data);
  const objectRenderMap = Object.keys(data).map((element, index) => (

    <div key={element}>
      {objectKeys[index]}
      {' '}
      :
      {' '}
      {data[element]}
    </div>
  ));
  return objectRenderMap;
}

function ResponseList() {
  const createdFormData = useSelector((newFormData));

  const renderCreatedFormData = () => {
    let ret = '';
    if (!_.isEmpty(createdFormData)) {
      ret = (
        <div className="p-4 m-8">
          <Typography
            variant="h4"
          >
            Response
          </Typography>
          {`name: ${createdFormData.name}`}
          <br />
          {`username: ${createdFormData.username}`}
          <br />
          {`email: ${createdFormData.email}`}
          <br />
          {`phone: ${createdFormData.phone}`}
          <br />
          <br />
          Address
          {renderData(createdFormData.address)}
          <br />
          <br />
          Company
          {renderData(createdFormData.company)}
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
