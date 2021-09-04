import React, { ReactNode, useRef,useState, FunctionComponent } from "react";
import Product from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { Button,Modal } from 'react-bootstrap';
import {ADD_TO_CART,  REMOVE_FROM_CART, SAVE_CART, RESET_CART } from "../../State/Actions/actionTypes"
import {addToCart } from "../../State/Actions/ActionCreators"
import {
    RovingTabIndexProvider,
    useRovingTabIndex,
    useFocusEffect
  } from "react-roving-tabindex";


type Props = {
    Tissu: Product,
    Idx : number
   };

const Card: FunctionComponent<Props> =  (props) =>{

    let imgStyle    = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
    let modalIdx    =  props.Tissu.repo + props.Idx
    let modalId     = '#' + modalIdx
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Tissu.repo + '/' + 'tissu.jpg'
    let priceDetail = props.Tissu.price + '€ ' +'/' + props.Tissu.footage
  
    const dispatch = useDispatch()


    // const [qty, setQty] = useState(1);
    // const dispatch = useDispatch()
  
    // const add = (item, quantity) => {
    //   dispatch(addtoCart(item, quantity))
    // }
    const ref = useRef<HTMLButtonElement>(null);

    const [qty, setQty] = useState<number>(1)

      //add and update product to bag
    const addToBag = (product:Product, quantity:number) =>{
        dispatch(addToCart(product, quantity))
    }

      const [show, setShow] = useState(false);
      const handleClose     = () => setShow(false);
      const handleShow      = () => setShow(true);

    return (
        <div className="col-lg-3">
            <div className="card" style={imgStyle}  >
                <img src={imgPath}
                     className="img-thumbnail" 
                     alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.Tissu.title}</h5>
                    <p className="card-text fs-6">{props.Tissu.description}</p>
                    <div>
                        <span className="text-start px-1 fs-6">{priceDetail}</span>
                        <Button variant="primary" onClick={handleShow}>
                            Détail
                        </Button>
                    </div>                    
                </div>                  
            </div>
             {/* Modal  */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>                    
                    <Modal.Title>{props.Tissu.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src={imgPath}
                                    className="img-thumbnail" 
                                    alt="..."/>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <p>{props.Tissu.description}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p>{priceDetail}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                <button type="button"  onClick={() => setQty(qty>1 ? - 1 : 1)} className="btn btn-outline-primary">-</button>
                                                <button type="button" className="btn btn-outline-primary">{qty}</button>
                                                <button type="button"  onClick={() => setQty(qty + 1)} className="btn btn-outline-primary">+</button>
                                            </div>
                                        </div>
                                    </div>                           
                                </div>
                            </div>
                        </div>
                    </div> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Fermer
                    </Button>
                    <Button variant="primary" onClick={()=>{addToBag(props.Tissu, qty)}}>
                    Ajouter au panier
                    </Button>
                </Modal.Footer>
            </Modal>

      </div>
    )
}

export default Card;