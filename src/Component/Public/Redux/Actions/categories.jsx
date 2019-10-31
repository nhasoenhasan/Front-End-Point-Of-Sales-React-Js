import axios from 'axios';

export const getCategories = (data) => {
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product/categories',{params:
      data
    }),
  };
};

export const postCategories = (input) => {
  return {
    type: 'POST_CATEGORIES',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/product/categories',input),
  };
};
