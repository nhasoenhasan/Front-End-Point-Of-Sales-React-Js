import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../Actions/action-types/cart-actions'

const initialState = {
    productList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    addedItems:[],
    total: 0
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

      //INSIDE HOME COMPONENT
      case 'ADD_TO_CART':
            let addedItem = state.productList.find(item=> item.id_product === action.id)
              //check if the action id exists in the addedItems
            let existed_item= state.addedItems.find(item=> action.id === item.id_product)
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
                //calculating the total
                let newTotal = state.total + addedItem.price 
                
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total : newTotal
                }
                
            }
        case 'REMOVE_ITEM':
            let itemToRemove= state.addedItems.find(item=> action.id === item.id_product)
            let new_items = state.addedItems.filter(item=> action.id !== item.id_product)
            
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        // case 'ADD_QUANTITY':
        //     let addeQuantity = state.productList.find(item=> item.id_product === action.id)
        //     addeQuantity.quantity += 1 
        //     let Total = state.total + addedItem.price
        //     return{
        //         ...state,
        //         total: Total
        //     }
        // case 'SUB_QUANTITY':
        //     addedItem = state.productList.find(item=> item.id_product === action.id) 
        //     //if the qt == 0 then it should be removed
        //     if(addedItem.quantity === 1){
        //         let new_items = state.addedItems.filter(item=>item.id_product !== action.id)
        //         let newTotal = state.total - addedItem.price
        //         return{
        //             ...state,
        //             addedItems: new_items,
        //             total: newTotal
        //         }
        //     }
        //     else {
        //         addedItem.quantity -= 1
        //         newTotal = state.total - addedItem.price
        //         return{
        //             ...state,
        //             total: newTotal
        //         }
        //     }
        // case 'ADD_SHIPPING':
        //   return{
        //     ...state,
        //     total: state.total + 6
        //   }
        // case 'SUB_SHIPPING':
        //     return{
        //       ...state,
        //       total: state.total - 6
        //   }
      
      default:
        return state;
    }
  };

  export default product;