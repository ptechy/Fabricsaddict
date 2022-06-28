import React, { ReactNode, useRef,useState, useEffect, FunctionComponent } from "react";
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios'
import env from "react-dotenv"
import { bindActionCreators } from "redux";
import {  useHistory} from "react-router-dom";
import {resetCart} from '../../State/Actions/ActionCreators'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import ButtonPaypalWrapper from './ButtonPaypalWrapper' 
import CartTable from "../Cart/CartTable";
import Product from "../../Models/Products/Product";
import './ConfirmDelivery.css'

type Props = { };

const Delivery: FunctionComponent<Props> =  (props) =>{

  // const userProfile = useContext(UserProfileContext)
  // const items = useSelector(state => state.items)
  const dispatch = useDispatch()

  const history                 = useHistory();
  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const order_url        = `${base_api}/order`

 const currency = "EUR"
  const items: ProductState = useSelector( (state: ProductState) => state )


  useEffect(() => {    
    
})

const reset = () => {
  dispatch(resetCart())
}


  const commitOrder = async (orderId) => {
      await  axios.post(order_url, {orderId, ...items})
          .then((res) => {

        }).catch((error) => {
 
        });
        
        reset()        
        history.push({
          pathname: '/Delivery',
          state: items
      })
  }



return (
<>
  <div className="row fluid"  style={{ margin: '20px auto' }}>
    <div className="col-sm-8">
            <div className="container">
              <div className="row">
                <div className="col">
                <table  className="table">
                  <tbody>
                  <tr>
                    <th className="cartTable">Produit</th>
                    <th className="cartTable">Référence</th>
                    <th className="cartTable">Prix</th>
                    <th className="cartTable">Quantité</th>
                    <th className="cartTable">Total</th>
                  </tr>
                  {items.products.map((item : Product, index: number) => {

                      let imgPath      = process.env.PUBLIC_URL + '/img/' + item.repo + '/' + item.img;

                      return (
                          <tr  key={index+1} >
                            <td  key={index+2} ><img width="70" height="70" src={imgPath} alt="..." />
                            </td>
                            <td key={index+3} >{item.title}</td>
                            <td key={index+4} >{item.price} €</td>
                            <td key={index+5} >
                                <div className="btn-group" role="group" aria-label="Basic example">
                                {item.quantity}
                                </div>
                            </td>
                            <td key={index+6} >{(item.quantity *  item.price).toFixed(2)} € </td>
                          </tr>)
                  })}
                  </tbody>
                </table>
                </div>
                <div className="col-sm-4">
                  <ul className="list-group">
                    <li className="list-group-item">Commande</li>
        
                    <li className="list-group-item">
                      <ul className="list-group flex">
                        <li className="text-left">Sous-Total:</li>
                        <li className="txtr">{items.totalBeforeFees} €</li>
                      </ul>
                      <ul className="list-group flex">
                        <li className="text-left">Frais d'expedition:</li>
                        <li className="txtr">{items.fees} €</li>
                      </ul>
                    </li>     
                    <li className="list-group-item ">
                      <ul className="list-group flex">
                        <li className="text-left">Total:</li>
                        <li  className="txtr">{items.total} €</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
    </div>
    <div className="col-sm-4">
            <section className="section-content padding-y" >
                <div className="jumbotron text-center">
                  <h5 className="display-10">CONFIRMER VOTRE COMMANDE</h5>
                  <hr />
                  <br />
                </div>
                <div>
                  <div style={{ maxWidth: "495px", minHeight: "200px" }}>
                          <PayPalScriptProvider
                              options={{
                                  "client-id": "test",
                                  components: "buttons",
                                  currency: "EUR"
                              }} >
                            <ButtonPaypalWrapper currency={currency} showSpinner={true} amount={items.total} confirm={commitOrder}  />
                          </PayPalScriptProvider>
                  </div>
              </div>
          </section>
    </div>
  </div>
</>
    )

}

export default Delivery