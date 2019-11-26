const initialState = {
    productList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    addedItems:[],
    total: 0,
    orderResponse:[]
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
        const productList=state.productList
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

      //INSIDE HOME COMPONENT
      case 'ADD_TO_CART':
        let addedItem = state.productList.find(item=> item.id_product === action.id)
            //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id_product)
        // console.log('REDUCERS',addedItem.price*addedItem.quantity)
        if(existed_item)
        {
            addedItem.quantity += 1 
            return{
              ...state,
              total: state.total + addedItem.price
            }
        }
        else{
            addedItem.quantity = 1;
                
            return{
                 ...state,
                addedItems: [...state.addedItems, addedItem],
                total : state.total + addedItem.price
            }
                
        }
      case 'ADD_QUANTITY':
        let addeQuantity = state.addedItems.find(item=> item.id_product === action.id)
        addeQuantity.quantity += 1 
        let Totaladd = state.total + addeQuantity.price
        return{
            ...state,
            total: Totaladd
        }
      case 'SUB_QUANTITY':
        let subQuantity = state.addedItems.find(item=> item.id_product === action.id)
        subQuantity.quantity -= 1 
        let Totalsub = state.total - subQuantity.price
        return{
          ...state,
            total: Totalsub
        }
      case 'REMOVE_ITEM':
          let itemToRemove= state.addedItems.find(item=> action.id === item.id_product)
          let new_items = state.addedItems.filter(item=> action.id !== item.id_product)
              
          //calculating the total
          let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
          return{
            ...state,
            addedItems: new_items,
            total: newTotal
          }
      case 'POST_ORDER__PENDING':
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
          };
      case 'POST_ORDER_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
        case 'POST_ORDER_FULFILLED':
            return {
              ...state,
              isLoading: false,
              isFulfilled: true,
              orderResponse: action.payload.data,
              addedItems:[],
            };
      default:
        return state;
    }
  };

  export default product;