const initialState = {
    registerResponse: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_REGISTER_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'POST_REGISTER_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'POST_REGISTER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          registerResponse: action.payload,
        };
     
      default:
        return state;
    }
  };

  export default auth;