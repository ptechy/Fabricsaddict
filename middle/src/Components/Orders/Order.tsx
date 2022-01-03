import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import moment from 'moment';
import {  useHistory} from "react-router-dom";
import './Orders.css'

import ProductState from '../../Models/Products/ProductState'
import Product from '../../Models/Products/Product'
import Customer from '../../Models/Customer/Customer'
import axios from 'axios'

import env from "react-dotenv"




type Props = {
    Item: ProductState,
    Key: number
   };



const Order: FunctionComponent<Props> =  (props) =>{


  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const hidden_url       = `${base_api}/order/hide/`
  const history          = useHistory();


  
    const hide = async (item:ProductState) =>{



      const targetUrl        =  hidden_url + item._id

      await  axios.put(targetUrl)
          .then((res) => {
        }).catch((error) => {
            console.log(error)
        });


      history.push("/Main")
    }
    const getCustomer = (customer) =>{
      const items = Object.entries(customer).map(([key, value],  index: number) => {
                        <tr>
                          <td  key={key}>{key} customer</td>
                          <td>{value} key={index}</td>
                        </tr>  
                      })      

        return items
    }


    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    let values = props.Item.products.map((item:Product) => {
      return item.quantity * item.price
    })

    let total = values.reduce(reducer)


    const GetCustomers = (props:ProductState) =>{

       const customers = props.customers

       return   customers.map( customer => {
            getCustomer(customer)
        })      
    }


    return (


      
     
          <div className="orderTable">

            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#   {props.Item.orderId}  </th>
                  <th scope="col">Date: {props.Item.date} </th>
                  <th scope="col"><button type="button" className="btn btn-secondary"  onClick = {() => console.log("modifier")}>Modifier </button>  </th>
                </tr>
              </thead>
              <tbody>

                { props.Item.customers.map( (customer:Customer, index:number) => {  
                          return  Object.entries(customer)
                                        .filter(([key, value],  index: number) =>  key !== '_id' && key!== 'date')
                                        .map(([key, value],  index: number) => {                                                       
                                            return( 
                                                    <tr key={index}>
                                                        <th scope="row"> {key}</th>
                                                        <td colSpan={2} >{value}</td>
                                                    </tr> 
                                            )})
                  })}



                <tr>
                  <td colSpan={3} >
                    <table className="table mb-0 table-sm table-success table-bordered border-dark">
                          <tbody>
                              <tr>

                                  <th>catégorie</th>
                                  <th>Titre</th>
                                  <th>Description</th>
                                  <th>Footage</th>
                                  <th>Quantité</th>
                                  <th>Prix</th>

                              </tr>
                                  { props.Item.products.map( (product:Product, index:number) => {                

                                          return( <tr>
                                              <td key={index} >{product["category"]}</td>
                                              <td>{product["title"]}</td>
                                              <td>{product["description"]}</td>
                                              <td>{product["footage"]}</td>
                                              <td>{product["quantity"]}</td>
                                              <td>{product["price"]} €</td>        
                                            </tr>)                
                                    }) }
                          </tbody>
                      </table>                
                  </td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>  {total} €</td>
                  <td>  <button type="button" className="btn btn-warning"  onClick = {() => hide(props.Item)}>Cacher </button>  </td>
                </tr>
              </tbody>
            </table>








          </div>)


   
      
    
}

export default Order;