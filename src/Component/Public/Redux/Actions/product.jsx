import axios from 'axios';

export const getProduct = (data) => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product',{params:
      data
    }),
  };
};

export const postProduct = (input) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/product',input),
  };
};

export const patchProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch ('https://pointofsaleshasan.herokuapp.com/product/'+id,input
    )
  };
};

export const deleteProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete ('https://pointofsaleshasan.herokuapp.com/product/'+id
    )
  };
};
