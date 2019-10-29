import axios from 'axios';

export const getProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product'),
  };
};