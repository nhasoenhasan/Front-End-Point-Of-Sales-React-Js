import axios from 'axios';



export const getCategories = (data,token) => {
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get (`${process.env.REACT_APP_BASE_URL}/product/categories/`,{params:
      data,headers:{"xaccess-token": token}
    }),
  };
};

export const postCategories = (input,token) => {
  return {
    type: 'POST_CATEGORIES',
    payload: axios.post (`${process.env.REACT_APP_BASE_URL}/product/categories/`,input,{ headers:{"xaccess-token": token}}),
  };
};

export const patchCategories = (input,token) => {
  const id=input.id_categories;
  return {
    type: 'PATCH_CATEGORIES',
    payload: axios.patch (`${process.env.REACT_APP_BASE_URL}/product/categories/`+id,input,{ headers:{"xaccess-token": token}}
    )
  };
};

export const deleteCategories = (input,token) => {
  const id=input.id_categories;
  return {
    type: 'DELETE_CATEGORIES',
    payload: axios.delete (`${process.env.REACT_APP_BASE_URL}/product/categories/`+id,{ headers:{"xaccess-token": token}}
    )
  };
};

