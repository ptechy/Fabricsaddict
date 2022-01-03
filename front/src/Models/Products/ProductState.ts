import Product from './Product'
import Customer from '../Customer/Customer' 
 
 export default class  ProductState {

  constructor( readonly customers:  Customer[], readonly products: Product[], readonly fees:number,readonly total:string)  {  }

  };