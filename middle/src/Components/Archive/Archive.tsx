import moment from 'moment';

import axios from 'axios'
import React, {FunctionComponent, Fragment, useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {  useHistory} from "react-router-dom";
import ProductState from '../../Models/Products/ProductState'
import Product from '../../Models/Products/Product';

import env from "react-dotenv"


import CardModal from "../Card/CardModal"

   const Archive: FunctionComponent =  () =>{

    const root_url                 = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api                = `${root_url}/${env.API_BASE_URL}`
    const order_url               = `${base_api}/orders/hidden`
    const activate_Order          = `${base_api}/order/activate/`
    const history                 = useHistory();
    const [orders, setOrders]     = useState<ProductState[]>([])

    const [show, setShow] = useState(false);

    const handleShow      = () => setShow(true);

    const activate = async (item:ProductState) =>{

        const targetUrl =  activate_Order + item._id
        await  axios.put(targetUrl)
            .then((res) => {
          }).catch((error) => {
              console.log(error)
          });


        history.push("/Main")
    }


  // loading titles and products only on page refresh
    useEffect( () => {

        //get product list in central area
            const loadOrders = async () => {
            await  axios.get(order_url)
            .then(result => setOrders(result.data.data))          
            .catch(error => `Error:${error}`)
        }
        loadOrders()

    }, []);


      return (
       
        <div className="list-group">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">N° de commande</th>
                        <th scope="col">Date</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Total</th>
                        <th scope="col">Update</th>
                        <th scope="col">Activatation</th>
                    </tr>
                </thead>
                 <tbody>
                        { orders.map((item:ProductState, index:number) =>{
                            const reducer = (previousValue, currentValue) => previousValue + currentValue;
                            let values = item.products.map((item:Product) => {
                            return item.quantity * item.price
                            })

                            const dt =  moment(item.customers[0].date).format('DD-MM-YYYY HH:mm:ss');
                            let total = values.reduce(reducer)
                            return(  
                            
                                <tr>
                                    <td>{item._id} </td>
                                    <td>{dt} </td>
                                    <td>{item.customers[0].firstName}</td>
                                    <td>{item.customers[0].lastName}</td>
                                    <td>{total}</td>
                                    <td>update</td>
                                    <td> 
                                        <button type="button"   className="list-group-item list-group-item-action"        onClick = {() => activate(item)}
                                            key={index}  >  
                                        Activer
                                    </button>                
                                    </td>
                                </tr>   )
                        }) } 

                </tbody>
            </table>
        </div>
          
    )
      
              
}

export default Archive;