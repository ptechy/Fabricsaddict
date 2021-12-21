import React, { ReactNode, useRef,useState, useEffect, FunctionComponent } from "react";
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios'
import env from "react-dotenv"
import { bindActionCreators } from "redux";
import {resetCart} from '../../State/Actions/ActionCreators'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import ButtonPaypalWrapper from './ButtonPaypalWrapper' 


type Props = { };

const Delivery: FunctionComponent<Props> =  (props) =>{

  // const userProfile = useContext(UserProfileContext)
  // const items = useSelector(state => state.items)
  const dispatch = useDispatch()


  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const order_url        = `${base_api}/order`

 const currency = "EUR"
 const amount = 1

  const items: ProductState = useSelector( (state: ProductState) => state )

  useEffect(() => {    
    
})

  const commitOrder = async () => {
      await  axios.post(order_url,items)
          .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

        
        reset()
  }

  const reset = () => {
    dispatch(resetCart())
 }


    return (
        <>

                <div className="jumbotron text-center">
                  <h3 className="display-10">CONFIRMER VOTRE COMMANDE ?</h3>
                  <hr />
          
                  <p className="lead">
                     <Link className="btn btn-outline-warning btn-lg" to="/Delivery" onClick={()=> commitOrder()} >
                      Confirmer
                    </Link>
                  </p>
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

                          <ButtonPaypalWrapper currency={currency} showSpinner={true} amount={amount}   />

                        </PayPalScriptProvider>
                </div>


                </div>


        </>
    )

}

export default Delivery