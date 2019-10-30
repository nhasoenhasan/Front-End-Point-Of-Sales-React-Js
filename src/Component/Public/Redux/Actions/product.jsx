import axios from 'axios';

export const getProduct = (data) => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product',{params:
      data
    }),
  };
};
