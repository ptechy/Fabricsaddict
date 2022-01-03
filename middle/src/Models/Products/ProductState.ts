import Product from './Product'
import Customer from '../Customer/Customer' 
 
 export default class  ProductState {
  _id:string
  date:string

  constructor(readonly orderId:string,  readonly customers:  Customer[], readonly products: Product[], readonly fees:number,readonly total:string)  {}
  };