import axios from 'axios';
const token = localStorage.getItem("xaccess-token");
const headers = {
  "xaccess-token": token
};
require('dotenv').config()

export const getProduct = (data) => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get (`${process.env.REACT_APP_BASE_URL}/product`,{params: data,headers:headers}),
    // payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product',{params: data,headers:headers}),
  };
};

export const postProduct = (input) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post (`${process.env.REACT_APP_BASE_URL}/product/`,input,{headers:headers}),
  };
};

export const patchProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch (`${process.env.REACT_APP_BASE_URL}/product/`+id,input,{headers:headers}
    )
  };
};

export const deleteProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete (`${process.env.REACT_APP_BASE_URL}/product/`+id,{headers:headers},
    )
  };
};

export const postOrder=(order,total)=>{
  return{
      type: 'POST_ORDER',
      payload:axios.post(`${process.env.REACT_APP_BASE_URL}/product/order/`,{
        total,order},
        {headers:headers})
  }
}

export const getOrder=()=>{
  return{
      type: 'GET_ORDER',
      payload:axios.get(`${process.env.REACT_APP_BASE_URL}/product/order/`,{headers:headers})
  }
}