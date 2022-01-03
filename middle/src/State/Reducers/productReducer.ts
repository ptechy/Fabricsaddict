

 import ProductAction from '../../Models/Products/ProductAction'
 import Product from '../../Models/Products/Product'
 import Customer from '../../Models/Customer/Customer'

 import {ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, RESET_CART, ADD_CUSTOMER } from "../Actions/actionTypes"
 import ProductState from '../../Models/Products/ProductState'


  const saveToLocalStorage = (state:ProductState) => {
    const str = JSON.stringify(state)
    console.log("localStorage : \n\r" + str)
    localStorage.setItem("state", str )
  }

  const resetLocalStorage = () => {
    localStorage.clear()
  }


  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const getTotal = (products: Product[]) => {
    let values =  products.length== 0 
    ? [0] 
    :  products.map((product) => product.quantity * product.price)

    return values.reduce(reducer).toFixed(2)
  }

  const initialState: ProductState = localStorage.getItem("state") != null
  ? JSON.parse(localStorage.getItem("state")) 
  : new ProductState("",[], [], 0, "0.0")


  const productReducer = (state:ProductState = initialState, productAction:ProductAction) : ProductState =>  {
      
    switch (productAction.type) {
      case ADD_TO_CART:

        let nb = state.products.filter( item =>item._id === productAction.payload._id )
        if(nb.length >0)
        {
          const finalItem: Product[] = state.products.map( item =>{
            if(item._id === productAction.payload._id)
            {
              const finalQty    = item.quantity + productAction.payload.quantity 
              return {...item,...{quantity:finalQty} }
            }     
              
            return item
          })
          
          const np = new ProductState(state.orderId,state.customers, finalItem, state.fees, getTotal(finalItem))
          saveToLocalStorage(np)
          return np
        }

        const npr = new ProductState(state.orderId, state.customers, [...state.products, productAction.payload], state.fees,  getTotal(state.products))
        saveToLocalStorage(npr)
        return npr

      case UPDATE_CART:
        const finalUpdate = state.products.map( item =>{
          if(item._id === productAction.payload._id)
          {
            return  productAction.payload
          }              
          return item
        });
        const nprod =   new ProductState(state.orderId, state.customers, finalUpdate, state.fees,  getTotal(state.products))
        saveToLocalStorage(nprod)
        return nprod

      case REMOVE_FROM_CART:
        const finalRemove = state.products.filter(item => item._id !== productAction.payload._id);
        const rmv =  new ProductState(state.orderId, state.customers, finalRemove, state.fees,  getTotal(state.products))
        saveToLocalStorage(rmv)
        return rmv

      case SAVE_CART:
        return  state

      case RESET_CART:
        resetLocalStorage()
        return new ProductState("", [], [], 0, "0.00");

      case ADD_CUSTOMER:
      const finalCustomer = {...state.customers, ...productAction.payload}
      const npdt =  new ProductState(state.orderId, [finalCustomer], state.products, state.fees,  getTotal(state.products));
      saveToLocalStorage(npdt)
      return npdt
 

      default:
        return state;
    }
  };
  export default productReducer;
  