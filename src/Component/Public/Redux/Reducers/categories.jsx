const initialState = {
    categoriesList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  const categories = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CATEGORIES_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_CATEGORIES_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_CATEGORIES_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoriesList: action.payload.data.result,
        };
     
      default:
        return state;
    }
  };

  export default categories;