const initialState = {
    productList: [],
    responspostProduct:[],
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
      case 'POST_PRODUCT_PENDING':
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
          };
        case 'POST_PRODUCT_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
        case 'POST_PRODUCT_FULFILLED':
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            responspostProduct: action.payload,
          };
     
      default:
        return state;
    }
  };

  export default product;