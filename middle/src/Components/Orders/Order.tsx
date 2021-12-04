import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import {  useHistory} from "react-router-dom";


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


      
     
          <div className="row">
            <table className="table table-bordered border-warning">
              <thead>
                <tr>
                  <th scope="col">Commande # {props.Item._id}</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                    <td>
                          <table className="table table-secondary table-bordered ">
                              <tbody>
                                  { props.Item.customers.map( (customer:Customer, index:number) => {  
                                      return  Object.entries(customer).map(([key, value],  index: number) => {  
                                                        
                                                  return( 
                                                          <tr key={index}>
                                                          <td> {key}</td>
                                                          <td>{value}</td>
                                                          </tr> 
                                                  )})
                                  })}
                            </tbody>
                          </table>

                    </td>
                  
                </tr>
                <tr>
                  <td>
                      <table className="table table-success table-bordered border-dark">
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
                  <table className="table table-secondary">
                      <tbody>
                          <tr>


                                          <td>Total</td>
                                          <td>{total}</td>
                                          <td>  <button type="button"  className="btn btn-warning"  onClick = {() => hide(props.Item)}  >  
                                        Cacher
                        </button>  </td>

                        </tr>                

                      </tbody>
                  </table>  
                  
                </tr>
              </tbody>
            </table>           
          </div>)


   
      
    
}

export default Order;