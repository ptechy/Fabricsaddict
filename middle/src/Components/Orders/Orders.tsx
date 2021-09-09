import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductState from '../../Models/Products/ProductState'
import axios from 'axios'
import env from "react-dotenv"
import Order from './Order'



const Orders: FunctionComponent =  () =>{

  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const order_url        = `${base_api}/orders`


  const [orders, setOrders]   = useState<ProductState[]>([])


  // loading titles and products only on page refresh
  useEffect( () => {

    //get product list in central area
    const loadOrders = async () => {
      await  axios.get(order_url)
      .then( result => setOrders(result.data.data) )         
      .catch(error => `Error:${error}`)
      }

      loadOrders()

  }, []);

    return (

      <div>
      { orders.map( (productState:ProductState, index:number) => {            
        return <Order Item={productState} Key={index} />
      })}

    </div>)
   
      
    
}

export default Orders;