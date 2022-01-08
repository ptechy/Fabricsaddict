import React, { FunctionComponent, useState, useEffect} from 'react';
import {  useHistory} from "react-router-dom";
import './Orders.css'

import IProductState from '../../Models/Products/ProductState'
import IProduct from '../../Models/Products/Product'
import ICustomer from '../../Models/Customer/Customer'
import axios from 'axios'

import env from "react-dotenv"




type Props = {
    Item: IProductState,
    Key: number
   };



const Order: FunctionComponent<Props> =  (props) =>{


  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const hidden_url       = `${base_api}/order/hide/`
  const history          = useHistory();
  let idx = 1234

  
    const hide = async (item:IProductState) =>{

      const targetUrl        =  hidden_url + item._id

      await  axios.put(targetUrl)
          .then((res) => {
        }).catch((error) => {
            console.log(error)
        });
        console.log("dir")
      history.push("/")
    }



    return (


      
     
          <div className="orderTable">

            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr key={++idx}>
                  <th scope="col">Paypal:    {props.Item.orderId}  </th>
                  <th scope="col">Date: {(props.Item.date).split(' ')[0]} </th>
                  <th scope="col">Heure: {(props.Item.date).split(' ')[1]} </th>
                  <th scope="col"><button type="button" className="btn btn-secondary"  onClick = {() => console.log("modifier")}>Modifier </button>  </th>
                </tr>
              </thead>
              <tbody>

                { props.Item.customers.map( (customer:ICustomer, index:number) => {  
                          return  Object.entries(customer)
                                        .filter(([key, value],  index: number) =>  key !== '_id' && key!== 'date')
                                        .map(([key, value],  index: number) => {                                                       
                                            return( 
                                                    <tr  key={++idx}>
                                                        <th scope="row"> {key}</th>
                                                        <td colSpan={3} >{value}</td>
                                                    </tr> 
                                            )})
                  })}



                <tr  key={++idx}>
                  <td colSpan={4} >
                    <table className="table mb-0 table-sm table-success table-bordered border-dark">
                          <tbody>
                              <tr  key={++idx} >

                                  <th>catégorie</th>
                                  <th>Titre</th>
                                  <th>Description</th>
                                  <th>Footage</th>
                                  <th>Quantité</th>
                                  <th>Prix unitaire</th>
                                  <th>Total</th>

                              </tr >
                                  { props.Item.products.map( (product:IProduct, index:number) => {                

                                          return( <tr  key={++idx}>
                                              <td  >{product["category"]}</td>
                                              <td>{product["title"]}</td>
                                              <td>{product["description"]}</td>
                                              <td>{product["footage"]}</td>
                                              <td>{product["quantity"]}</td>
                                              <td>{product["price"]} €</td> 
                                              <td>{(product["quantity"]*product["price"]).toFixed(2)} €</td>           
                                            </tr>)                
                                    }) }
                          </tbody>
                      </table>                
                  </td>
                </tr>
                <tr key={++idx}>
                  <td>montant avant frais:  {props.Item.totalBeforeFees}  €</td>
                  <td>Frais:   {props.Item.fees}  €</td>
                  <td>Total: <b>{props.Item.total} € </b></td>
                  <td>  <button type="button" className="btn btn-warning"  onClick = {() => hide(props.Item)}>Cacher </button>  </td>
                </tr>
              </tbody>
            </table>








          </div>)


   
      
    
}

export default Order;