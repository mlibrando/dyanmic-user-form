/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import {
  formData,
} from 'features/form/formSlice';
import { useSelector } from 'react-redux';

const _ = require('lodash');

class FormUtils {
  isFormDataValid = () => {
    const data = useSelector((formData));
    return !_.isEmpty(data);
  };

  getFilteredArray = (entities) => {
    const arr = Object.keys(entities).map((id) => entities[id]);
    return arr;
  };
}

const instance = new FormUtils();

export default instance;
