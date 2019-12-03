import axios from 'axios';

export const postRegister = (input) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post (`${process.env.REACT_APP_BASE_URL}/auth/register`,input),
  };
};

export const postLogin = (input) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post (`${process.env.REACT_APP_BASE_URL}/auth/signin`,input),
  };
};

export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload:token,
  };
};

