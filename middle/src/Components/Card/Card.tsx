import React, { ReactNode, useRef,useState, FunctionComponent,useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useHistory, useLocation} from "react-router-dom";
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


    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('le prénom est obligatoire')
            .min(2, 'le prénom doit contenir au moins 2 caractères')
            .max(20, 'le prénom contient au maximum 20 caractères'),
     
    });
  
  
  
 
      const history = useHistory();


      



    let imgStyle    = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
    let modalIdx    =  props.Tissu.repo + props.Idx
    let modalId     = '#' + modalIdx
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Tissu.repo + '/' + 'tissu.jpg'
    let priceDetail = props.Tissu.price + '€ ' +'/' + props.Tissu.footage



    // const [qty, setQty] = useState(1);
    // const dispatch = useDispatch()
  
    // const add = (item, quantity) => {
    //   dispatch(addtoCart(item, quantity))
    // }
    const ref = useRef<HTMLButtonElement>(null);

    const [img, setImg] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [footage, setFootage] = useState('')
    const [price, setPrice] = useState('')


      const [show, setShow] = useState(false);
      const handleClose     = () => setShow(false);
      const handleShow      = () => setShow(true);

      const addToBag = () =>{
    }

    const onSubmit = (item:Product) => {         
        console.log("rrrr" + description)
       // history.push("/ConfirmDelivery")
  
    }

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

                    <div className="modal-body">

                        <div className="container">

                                <div className="col">
                                    <div className="row">
                                        <div className="col-sm-3"><img src={imgPath}className="img-thumbnail" alt="..."/>
                                        </div>
                                        <label>
                                                Image:
                                                <input
                                                    size={100}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="image"                                  
                                                    defaultValue={props.Tissu.img} 
                                                    onChange={event => setImg(event.target.value)}
                                                />
                                        </label>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                        <label>
                                                Title:
                                                <input
                                                    size={100}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="title"                                  
                                                    defaultValue={props.Tissu.title} 
                                                    onChange={event => setTitle(event.target.value)}
                                                />
                                        </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                        <label>
                                                Description:
                                                <textarea
                                                style={{ height: 150, width:450 }}
                                                    className="form-control"
                                                    defaultValue={props.Tissu.description}
                                                    placeholder="description" 
                                                    onChange={event => setDescription(event.target.value)}  />
                                            </label>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                        <label>
                                                Coupon/metre:
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="footage"                                  
                                                    defaultValue={props.Tissu.footage} 
                                                    onChange={event => setFootage(event.target.value)} />
                                        </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label>
                                                    price:
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="price"                              
                                                        defaultValue={props.Tissu.price} 
                                                        onChange={event => setPrice(event.target.value)}     />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">

                                    </div>                           
                                </div>
                            </div>
                        </div>

                    </div> 

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Fermer
                    </Button>

                    <Button variant="primary" onClick={()=>{onSubmit(props.Tissu)}}>
                    Ajouter au panier
                    </Button>

                </Modal.Footer>
               

            </Modal>


      </div>
    )
}

export default Card;