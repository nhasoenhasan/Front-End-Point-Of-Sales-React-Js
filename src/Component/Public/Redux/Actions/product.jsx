import axios from 'axios';

require('dotenv').config()

export const getProduct = (data,token) => {
  // console.log(headers)
  return {
    type: 'GET_PRODUCT',
    payload: axios.get (`${process.env.REACT_APP_BASE_URL}/product`,{params: data,headers:{"xaccess-token": token}}),
  };
};

export const postProduct = (input,token) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post (`${process.env.REACT_APP_BASE_URL}/product/`,input,{headers:{"xaccess-token": token}}),
  };
};

export const patchProduct = (input,token) => {
  const id=input.id_product;
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch (`${process.env.REACT_APP_BASE_URL}/product/`+id,input,{headers:{"xaccess-token": token}}
    )
  };
};

export const deleteProduct = (input,token) => {
  const id=input.id_product;
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete (`${process.env.REACT_APP_BASE_URL}/product/`+id,{headers:{"xaccess-token": token}},
    )
  };
};

export const postOrder=(order,total,token)=>{
  return{
      type: 'POST_ORDER',
      payload:axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/`,{
        total,order},
        {headers:{"xaccess-token": token}})
  }
}

export const getOrder=(token)=>{
  return{
      type: 'GET_ORDER',
      payload:axios.get(`${process.env.REACT_APP_BASE_URL}/product/order/`,{headers:{"xaccess-token": token}})
  }
}