const initialState = {
    productList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };

  const product = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCT_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_PRODUCT_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: action.payload.data.result,
        };
      //-------------------POST----------------
      case 'POST_PRODUCT_FULFILLED':
        const productList=state.productList.slice(0)
        productList.push(action.payload.data.result[0])
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList
        };
      case 'PATCH_PRODUCT_FULFILLED':
        const productListAfterPatch = state.productList.map (product => {
          if (product.id_product === action.payload.data.result[0].id_product) {
              return action.payload.data.result[0];
          }
          return product;
        });
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList:productListAfterPatch
        };

      case 'DELETE_PRODUCT_FULFILLED':
        
        const  dataAfterDelete = state.productList.filter(function(value, index, arr){
          return value.id_product != action.payload.data.id;
        });

        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: dataAfterDelete,
        };
     
      default:
        return state;
    }
  };

  export default product;