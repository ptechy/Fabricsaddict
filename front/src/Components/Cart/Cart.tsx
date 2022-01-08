import React, { FunctionComponent,useState,useEffect } from 'react';
import {  Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import { useSelector } from 'react-redux'
import "../../Styles/App.css";
import CartTable from './CartTable'

type Props = {
    Items: Product[]
}

const Cart: FunctionComponent<Props> =  (props) =>{

  const items:ProductState               = useSelector( (state: ProductState) => state  )
  const [checkOutView, setCheckOutView] = useState<boolean>(true)

  useEffect(() => {
      
      if(items.products.length > 0)
          setCheckOutView(false)

  }, [items])


    return (
        <div className="container">
          <div className="row">
            <div className="col">
                <CartTable Items={items.products} />
            </div>
            <div className="col-sm-3">
              <ul className="list-group">
                <li className="list-group-item">Commande</li>
     
                <li className="list-group-item">
                  <ul className="list-group flex">
                    <li className="text-left">Sous-Total</li>
                    <li className="text-right">{items.totalBeforeFees} €</li>
                  </ul>
                  <ul className="list-group flex">
                    <li className="text-left">Frais d'expedition</li>
                    <li className="text-right">{items.fees} €</li>
                  </ul>
                </li>     
                <li className="list-group-item ">
                  <ul className="list-group flex">
                    <li className="text-left">Total</li>
                    <li className="text-right">{items.total} €</li>
                  </ul>
                </li>
              </ul>
              
              <button type="button" className="btn btn-light btn-lg btn-block checkout bg-crimson" disabled={checkOutView} >
              <Link to="/Checkout" className="white">Passer la commande</Link>
              </button>
            </div>
          </div>
        </div>
      );

}

export default Cart;