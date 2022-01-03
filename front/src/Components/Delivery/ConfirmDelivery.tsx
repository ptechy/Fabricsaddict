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
  const amount = items.total


  useEffect(() => {    
    
})

const reset = () => {
  dispatch(resetCart())
}


  const commitOrder = async (orderId) => {
      await  axios.post(order_url, {orderId, ...items})
          .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });
        
        reset()        
        history.push("/Delivery")
  }



    return (
        <>

                <div className="jumbotron text-center">
                  <h3 className="display-10">CONFIRMER VOTRE COMMANDE ?</h3>
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

                          <ButtonPaypalWrapper currency={currency} showSpinner={true} amount={amount} confirm={commitOrder}  />

                        </PayPalScriptProvider>
                </div>


                </div>


        </>
    )

}

export default Delivery