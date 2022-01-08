import Product from './Product'
import Customer from '../Customer/Customer' 
 
const fees      = 0.11   //frais de port
                                                const reducer   = (previousValue, currentValue) => previousValue + currentValue

                                                const getTotal  = (products: Product[]) => {
                                                    let values  =  products.length== 0 
                                                                ? [0] 
                  :  products.map((product) => product.quantity * product.price)

    return  values.reduce(reducer)
}


 export default class  ProductState {
    readonly customers:  Customer[]
    readonly products: Product[]
    readonly fees:string
    readonly totalBeforeFees:string
    readonly total:string


    constructor( customers:  Customer[], products: Product[])  {

        this.customers       = customers
        this.products        = products
        
        const  productSum    = getTotal(products)
        const finalFees      = productSum > (fees*10) ? 0.00 : fees
        
        this.fees            = products.length == 0 ? "0.00" : finalFees.toFixed(2)
        this.totalBeforeFees = products.length == 0 ? "0.00" : productSum.toFixed(2)
        this.total           = products.length == 0 ? "0.00" :  (productSum+ finalFees).toFixed(2)
    }

  };