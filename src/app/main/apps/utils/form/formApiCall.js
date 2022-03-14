/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import axios from 'axios';

class FormApiCall {
  getForm = () => {
    const formApi = `${process.env.REACT_APP_FORM_API_URL}/form`;
    return new Promise((resolve, reject) => {
      axios.get(formApi).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  postForm = (data) => {
    const formApi = `${process.env.REACT_APP_FORM_API_URL}/form`;
    return new Promise((resolve, reject) => {
      axios.post(formApi, data).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };
}

const instance = new FormApiCall();

export default instance;
