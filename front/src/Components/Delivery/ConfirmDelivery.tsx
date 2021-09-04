import React, { ReactNode, useRef,useState, useEffect, FunctionComponent } from "react";
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios'
import env from "react-dotenv"

type Props = { };

const Delivery: FunctionComponent<Props> =  (props) =>{

  // const userProfile = useContext(UserProfileContext)
  // const items = useSelector(state => state.items)
  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const order_url        = `${base_api}/order`


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

  }


    return (
        <>

                <div className="jumbotron text-center">
                  <h1 className="display-3">Thank You!</h1>
                  <hr />
          
                  <p className="lead">
                    <strong>Confirm</strong>
                    <br /> <span>{order_url} zzzz</span> <br />
                    <Link className="btn btn-primary btn-sm" to="/Delivery" onClick={()=> commitOrder()} >
                      Confirm delivery
                    </Link>
                  </p>
                  <br />
                </div>


        </>
    )

}

export default Delivery