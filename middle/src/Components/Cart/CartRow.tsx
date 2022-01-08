import React, {FunctionComponent, Fragment,useState,useEffect} from 'react'
import IProduct from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,updateCart, removeFromCart } from  '../../State/Actions/ActionCreators'

type Props = {
    Item: IProduct,
    key: number
};

const CartRow: FunctionComponent<Props> =  (props) => {

    let imgStyle    = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Item.repo + '/' + 'tissu.jpg';
    let priceDetail = props.Item.price + '€ ' +'/' + props.Item.footage;

        const [qty, setQty] = useState(props.Item.quantity);
        const dispatch = useDispatch()

        const updateBag = (product:IProduct, qty:number) =>{
            const item = {...product,... {quantity:qty}}
            dispatch(updateCart(item))
        }


        const update = (item:IProduct, action:string) => {
          if (action === 'increment') {
               setQty(qty + 1) 
          }

          if (action === 'decrement') {
               setQty(qty - 1) 
          }
        }

        const remove = (product:IProduct) => {
          dispatch(removeFromCart(product))
        }

        useEffect( () => {
            updateBag(props.Item, qty)
          },[qty])


    return (
        <tr  >
        <td>
            <img
            width="70"
            height="70"
            src={imgPath}
            alt="..."
            />
        </td>
        <td>{props.Item.title}</td>
        <td>€{props.Item.price}</td>
        <td>
            <div className="btn-group" role="group" aria-label="Basic example">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                    if (qty > 1) {
                        update(props.Item, 'decrement') 
                    }
                }}
                >
                -
            </button>
            <span className="btn btn-light">{qty}</span>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>  {
                    update(props.Item, 'increment')
                }}
                >
                +
            </button>
            </div>
        </td>
        <td>{(props.Item.quantity *  props.Item.price).toFixed(2)} € </td>
        <td>
            <button
            type="button"
            className="btn btn-danger remove"
                onClick={() => remove(props.Item)}>
            X
            </button>
        </td>
        </tr>
    );
}
    
  
export default CartRow;