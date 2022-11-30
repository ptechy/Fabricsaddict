import React, { ReactNode, useRef,useState, FunctionComponent } from "react";
import Product from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { Button,Modal } from 'react-bootstrap';
import {ADD_TO_CART,  REMOVE_FROM_CART, SAVE_CART, RESET_CART } from "../../State/Actions/actionTypes"
import {addToCart } from "../../State/Actions/ActionCreators"
import './Card.css';

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

//https://dev.to/anxinyang/create-an-image-magnifier-with-react-3fd7
   const magnifier = {  
                        "src": "src",
                        "width": 120, //initial width
                        "height": 90,  //initialheight
                        "zoomWidth": 240,
                        "zoomHeight": 180,
                        "zoomLevel" : 2 
                     }

    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);




    let magStyle    = { width: magnifier.width+'px', height:magnifier.height + 'px',  margin: 3 + 'px'  };

    let imgContainerStyle    = {alignItems: 'center'};
    let imgStyle    = { width: 250+'px', height:350 + 'px', margin: 3 + 'px' ,  border: '1px solid #000000'};
    let modalIdx    =  props.Tissu.repo + props.Idx
    let modalId     = '#' + modalIdx
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Tissu.repo + '/' + props.Tissu.img
    let priceDetail = props.Tissu.price + '€ ' +'/' + props.Tissu.footage
  







    const dispatch = useDispatch()

  
    const ref = useRef<HTMLButtonElement>(null);
    const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
        ref, // Don't change the value of this ref.
        false // But change this as you like throughout the lifetime of the component.
      );
      const [qty, setQty] = useState<number>(1)

      //add and update product to bag
      const addToBag = (product:Product, quantity:number) =>{
        dispatch(addToCart(product, quantity))
    }

      const [show, setShow] = useState(false);
      const handleClose     = () => setShow(false);
      const handleShow      = () => setShow(true);

        const addQty = () =>{
            let current = qty

            if(current < 10)
                setQty(qty+1)
        }

        const removeQty = () =>{
            let current = qty

            if(current >1)
                setQty(qty-1)
        }


    return (
        <div className="col-lg-3">
            <div className="card" style={imgStyle}  >
                <div  >
                    <div  className="center" >
                            <img src={imgPath} 
                       
                          onMouseEnter={(e) => {
                            // update image size and turn-on magnifier
                            const elem = e.currentTarget;
                            const { width, height } = elem.getBoundingClientRect();
                            setSize([width, height]);
                            setShowMagnifier(true);
                          }}
                          onMouseMove={(e) => {
                            // update cursor position
                            const elem = e.currentTarget;
                            const { top, left } = elem.getBoundingClientRect();
                  
                            // calculate cursor position on the image
                            const x = e.pageX - left - window.pageXOffset;
                            const y = e.pageY - top - window.pageYOffset;
                            setXY([x, y]);
                          }}
                          onMouseLeave={() => {
                            // close magnifier
                            setShowMagnifier(false);
                          }}
                         className="img-thumbnail" 

                         alt="..."/>
                    </div>     
                    <div
                            style={{
                            display: showMagnifier ? "" : "none",
                            position: "absolute",

                            // prevent magnifier blocks the mousemove event of img
                            pointerEvents: "none",
                            // set size of magnifier
                            height: `${magnifier.zoomHeight}px`,
                            width: `${magnifier.zoomWidth}px`,
                            // move element center to cursor pos
                            top: `${y - magnifier.height / 2}px`,
                            left: `${x - magnifier.width / 2}px`,
                            opacity: "1", // reduce opacity so you can verify position
                            border: "1px solid lightgray",
                            backgroundColor: "white",
                            backgroundImage: `url('${imgPath}')`,
                            backgroundRepeat: "no-repeat",

                            //calculate zoomed image size
                            backgroundSize: `${imgWidth * magnifier.zoomLevel}px ${
                                imgHeight *  magnifier.zoomLevel
                            }px`,

                            //calculate position of zoomed image.
                            backgroundPositionX: `${-x * magnifier.zoomLevel + magnifier.width / 2}px`,
                            backgroundPositionY: `${-y * magnifier.zoomLevel + magnifier.height / 2}px`
                            }}
                        ></div>

                    <div className="card-body">
                        <h5 className="card-title">{props.Tissu.title}</h5>
                        <p className="card-text fs-6">{props.Tissu.description}</p>
                        <div>
                           <p  className="priceWrap"> <span className="articlePrice" >{priceDetail}</span>
                                <Button  className="btn btn-outline-success"  onClick={handleShow}>
                                        Détail
                                </Button>
                            </p>
                        </div>                    
                    </div>      
                </div>            
            </div>
             {/* Modal  */}
            <Modal show={show} onHide={handleClose}>
                 <Modal.Body><h4><strong>{props.Tissu.title}</strong></h4></Modal.Body>
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
                                                <button type="button"  onClick={() => removeQty()} className="btn btn-outline-secondary">-</button>
                                                <button type="button" className="btn btn-outline-secondary">{qty}</button>
                                                <button type="button"  onClick={() => addQty()} className="btn btn-outline-secondary">+</button>
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
                    <Button className="btn btn-outline-success"  onClick={()=>{addToBag(props.Tissu, qty)}}>
                    Ajouter au panier
                    </Button>
                </Modal.Footer>
            </Modal>

      </div>
    )
}

export default Card;