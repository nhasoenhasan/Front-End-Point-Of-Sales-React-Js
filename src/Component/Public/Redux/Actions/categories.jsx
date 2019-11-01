import axios from 'axios';
const token = localStorage.getItem("x-access-token");
const headers = {
  "xaccess-token": token
};

export const getCategories = (data) => {
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get ('https://pointofsaleshasan.herokuapp.com/product/categories',{params:
      data,headers:headers
    }),
  };
};

export const postCategories = (input) => {
  return {
    type: 'POST_CATEGORIES',
    payload: axios.post ('https://pointofsaleshasan.herokuapp.com/product/categories',input,{ headers:headers }),
  };
};

export const patchCategories = (input) => {
  const id=input.id_categories;
  return {
    type: 'PATCH_CATEGORIES',
    payload: axios.patch ('https://pointofsaleshasan.herokuapp.com/product/categories/'+id,input,{  headers:headers  }
    )
  };
};

export const deleteCategories = (input) => {
  const id=input.id_categories;
  return {
    type: 'DELETE_CATEGORIES',
    payload: axios.delete ('https://pointofsaleshasan.herokuapp.com/product/categories/'+id,{ headers:headers }
    )
  };
};

