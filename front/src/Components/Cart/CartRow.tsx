import React, {FunctionComponent, Fragment,useState,useEffect} from 'react'
import Product from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,updateCart, removeFromCart } from  '../../State/Actions/ActionCreators'

type Props = {
    Item: Product,
    key: number
};

const CartRow: FunctionComponent<Props> =  (props) => {

    const maxProduct = 10
    let imgStyle     = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
    let imgPath      = process.env.PUBLIC_URL + '/img/' + props.Item.repo + '/' + props.Item.img;
    let priceDetail  = props.Item.price + '€ ' +'/' + props.Item.footage;

    const addQty = () =>{
        let current = qty
        if(current < maxProduct)
         setQty(qty+1)
    }

    const removeQty = () =>{
        let current = qty
        if(current >1)
         setQty(qty-1)
    }

        const [qty, setQty] = useState(props.Item.quantity);
        const dispatch = useDispatch()

        const updateBag = (product:Product, qty:number) =>{
            const item = {...product,... {quantity:qty}}
            dispatch(updateCart(item))
        }


        const update = (item:Product, action:string) => {
          if (action === 'increment') {
                addQty() 
          }

          if (action === 'decrement') {
               removeQty() 
          }
        }

        const remove = (product:Product) => {
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
        <td><span  className="colorBox2">{props.Item.title}</span></td>
        <td>{props.Item.price} €</td>
        <td>
            <div className="btn-group" role="group" aria-label="Basic example">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                    if (qty > 1) {
                        update(props.Item, 'decrement') 
                    }
                }}
                >
                -
            </button>
            <button type="button" className="btn btn-outline-secondary">{qty}</button>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>  {
                    update(props.Item, 'increment')
                }}
                >
                +
            </button>
            </div>
        </td>
        <td>
            <button
            type="button"
            className="btn btn-danger remove"
                onClick={() => remove(props.Item)}>
            X
            </button>
        </td>
        <td><span  className="colorBox2">{(props.Item.quantity *  props.Item.price).toFixed(2)} €</span></td>

        </tr>
    );
}
    
  
export default CartRow;