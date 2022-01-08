import IProduct from './Product'
import ICustomer from '../Customer/Customer' 
 
 export default interface  IProductState {
    readonly _id:string
    readonly orderId:string
    readonly customers:  ICustomer[]
    readonly products: IProduct[]
    readonly fees:string
    readonly totalBeforeFees:string
    readonly total:string
    readonly hidden:boolean
    readonly date:string
 }