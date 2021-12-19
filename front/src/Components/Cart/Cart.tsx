import React, { FunctionComponent,useState,useEffect } from 'react';
import {  Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import "../../Styles/App.css";
import CartTable from './CartTable'

type Props = {
    Items: Product[]
}

const Cart: FunctionComponent<Props> =  (props) =>{

  const items: Product[]                = useSelector( (state: ProductState) => state.products  )
  const [subTotal, setSubTotal]         = useState<number>(0.00)
  const [total, setTotal]               = useState<number>(0.00)
  const [checkOutView, setCheckOutView] = useState<boolean>(true)
  const shipping                        = 10.00


  useEffect(() => {
        let totals = items.map((item:Product) => {
        return item.quantity * item.price
      })

      setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
      setTotal(subTotal + shipping)
      
      if(items.length >0)
        setCheckOutView(false)

  }, [items, subTotal, total])


    return (
        <div className="container">
          <div className="row">
            <div className="col">
                <CartTable Items={items} />
            </div>
            <div className="col-sm-3">
              <ul className="list-group">
                <li className="list-group-item">Commande</li>
     
                <li className="list-group-item">
                  <ul className="list-group flex">
                    <li className="text-left">Sous-Total</li>
                    <li className="text-right">{subTotal.toFixed(2)} €</li>
                  </ul>
                  <ul className="list-group flex">
                    <li className="text-left">Frais d'expedition</li>
                    <li className="text-right">{shipping} €</li>
                  </ul>
                </li>     
                <li className="list-group-item ">
                  <ul className="list-group flex">
                    <li className="text-left">Total</li>
                    <li className="text-right">{total.toFixed(2)} €</li>
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