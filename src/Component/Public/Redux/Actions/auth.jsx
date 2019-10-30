import axios from 'axios';

export const postRegister = (input) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/auth/register',input),
  };
};

export const postLogin = (input) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/auth/signin',input),
  };
};

