import Product from './Product'
  
  
  export default interface ProductAction {
    type:String,
    payload:Product
  };