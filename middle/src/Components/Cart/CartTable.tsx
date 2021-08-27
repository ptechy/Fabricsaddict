import React, {FunctionComponent, Fragment,useState,useEffect} from 'react'
import Product from '../../Models/Products/Product'
import CartRow from './CartRow'
import "../../Styles/App.css";
import CSS from 'csstype';


type Props = {
    Items: Product[]
   };


   const h1Styles: CSS.Properties = {
    width: '120px'
  };


const CartTable: FunctionComponent<Props> =  (props) =>{

    return (
      <table>
        <tbody>
        <tr>
          <th className="cartTable">Product</th>
          <th className="cartTable">Reference</th>
          <th className="cartTable">Price</th>
          <th className="cartTable">Quantity</th>
          <th className="cartTable">Total</th>
        </tr>
        {props.Items.map((item : Product, index: number) => {
          return(<CartRow Item={item} key={index} />)
        })}
        </tbody>
      </table>
    );
}
  
export default CartTable;
