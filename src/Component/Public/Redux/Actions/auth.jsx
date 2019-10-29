import axios from 'axios';

export const postRegister = (input) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/auth/register',input),
  };
};

