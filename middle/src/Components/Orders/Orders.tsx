import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductState from '../../Models/Products/ProductState'
import axios from 'axios'
import env from "react-dotenv"




const Orders: FunctionComponent =  () =>{

  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const order_url        = `${base_api}/orders`


  const [orders, setOrders]   = useState<ProductState[]>([])


  // loading titles and products only on page refresh
  useEffect( () => {

    //get product list in central area
    const loadOrders = async () => {
      console.log(order_url)
      await  axios.get(order_url)
      .then( result => setOrders(result.data.data) )         
      .catch(error => `Error:${error}`)
      }

      loadOrders()

  }, []);



    return (

      <div>


      { orders.map( (productState:ProductState, index:number) => 

        
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Commande #</th>
              </tr>
            </thead>
            <tbody>
            <tr><td>{productState.customers[0].firstName}       </td></tr>
              <tr>

                <td>
                      <table className="table table-bordered">
                        <tbody>
                          {productState.customers.map( customer => {
                            return Object.entries(customer).map(([key, value],  index: number) => {
                                    <tr>
                                      <td>{key} customer</td>
                                      <td>{value} key={index}</td>
                                    </tr>  
                                  })
                                })}

                        </tbody>
                      </table>

                </td>
              </tr>
              <tr>
                <td>  
                  {
                      productState.products.map(( product,  index: number) => {

                          <table className="table table-bordered">
                          <tbody>                            
                            {
                                Object.entries(product).map(([key, value],  index: number) => {

                                        <tr>
                                          <td>{key}</td>
                                          <td>{value} key={index}</td>
                                        </tr>
      
                                })
                            }
                          </tbody>
                          </table>
                      })
                  }

                </td>
              </tr>
            </tbody>
          </table>           
        </div>

    )}
   
      </div>)
    
}

export default Orders;