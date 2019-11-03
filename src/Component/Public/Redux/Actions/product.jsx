import axios from 'axios';
const token = localStorage.getItem("x-access-token");
const headers = {
  "xaccess-token": token
};

export const getProduct = (data) => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product',{params: data,headers:headers}),
  };
};

export const postProduct = (input) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/product',input,{headers:headers}),
  };
};

export const patchProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch ('https://pointofsaleshasan.herokuapp.com/product/'+id,input,{headers:headers}
    )
  };
};

export const deleteProduct = (input) => {
  const id=input.id_product;
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete ('https://pointofsaleshasan.herokuapp.com/product/'+id,{headers:headers},
    )
  };
};

export const postOrder=(input,total)=>{
  return{
      type: 'POST_ORDER',
      payload:axios.post('http://localhost:3307/product/order',input,{headers:headers})
  }
}