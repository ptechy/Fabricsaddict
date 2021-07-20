

 import ProductAction from '../../Models/Products/ProductAction'
 import Product from '../../Models/Products/Product'
 import {ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, RESET_CART } from "../Actions/actionTypes"

  const initialState: Product[] = []


  const productReducer = (state:Product[] = initialState, productAction:ProductAction) => {
      
    switch (productAction.type) {
      case ADD_TO_CART:
        let nb = state.filter( item =>item._id === productAction.payload._id )
        if(nb.length >0)
        {
          return state.map( item =>{
            if(item._id === productAction.payload._id)
            {
              const finalQty    = item.quantity + productAction.payload.quantity 
              return {...item,...{quantity:finalQty} }
            }     
              
            return item
          })
        }
        return [...state, productAction.payload];

      case UPDATE_CART:
        return state.map( item =>{
          if(item._id === productAction.payload._id)
          {
            return  productAction.payload
          }              
          return item
        });

      case REMOVE_FROM_CART:
        return state.filter(item => item._id !== productAction.payload._id);

      case SAVE_CART:
        return [...state, productAction.payload];
      case RESET_CART:
        return [];
      default:
        return state;
    }
  };
  export default productReducer;
  