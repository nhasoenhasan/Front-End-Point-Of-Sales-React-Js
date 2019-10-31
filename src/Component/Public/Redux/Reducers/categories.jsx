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
      case 'POST_CATEGORIES_FULFILLED':
          const categoriesList=state.categoriesList.slice(0)
          categoriesList.push(action.payload.data.result[0])
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            categoriesList
          };
      case 'PATCH_CATEGORIES_FULFILLED':
          const categoriesListAfterPatch = state.categoriesList.map (categories => {
            if (categories.id_categories === action.payload.data.result[0].id_categories) {
              return action.payload.data.result[0];
            }
            return categories;
          });
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            categoriesList:categoriesListAfterPatch
          };

      case 'DELETE_CATEGORIES_FULFILLED':
        const  dataAfterDelete = state.categoriesList.filter(function(value, index, arr){
          return value.id_categories != action.payload.data.id;
        });
    
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoriesList: dataAfterDelete,
        };
     
      default:
        return state;
    }
  };

  export default categories;