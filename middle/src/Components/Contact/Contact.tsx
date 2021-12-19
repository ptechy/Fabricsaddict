import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import moment from 'moment';
import {  useHistory} from "react-router-dom";
import './Contacts.css'

import ProductState from '../../Models/Products/ProductState'
import Product from '../../Models/Products/Product'
import Customer from '../../Models/Customer/Customer'
import axios from 'axios'

import env from "react-dotenv"




type Props = {
    Item: any,
    Key: number
   };



const Contact: FunctionComponent<Props> =  (props) =>{




    return (


      
     
          <div className="orderTable">

            <table className="table table-sm table-striped table-bordered">
              <tbody>

                 {   Object.entries(props.Item)
                                .filter(([key, value],  index: number) =>  key !== 'archived' && key!== '__v'  && key !== '_id')
                                .map(([key, value],  index: number) => {                                                       
                                    return( 
                                            <tr key={index}>
                                                <th scope="row"> {key}</th>
                                                <td colSpan={2} >{value}</td>
                                            </tr> 
                                )})
                 }
               
              </tbody>
            </table>


          </div>)


   
      
    
}

export default Contact;