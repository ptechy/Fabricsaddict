import React, { ReactNode, useRef,useState, FunctionComponent,useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useHistory, useLocation} from "react-router-dom";
import Product from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { Button,Modal } from 'react-bootstrap';

import axios from 'axios'
import env from "react-dotenv"



    type Props = {
        Tissu: Product,
        Show: boolean,
        SetShow: (value:boolean)=>void,
        Idx : number
   };

const CardModal: FunctionComponent<Props> =  (props) =>{


    const history = useHistory();
    let imgStyle    = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
    let modalIdx    =  props.Tissu.repo + props.Idx
    let modalId     = '#' + modalIdx
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Tissu.repo + '/' + props.Tissu.img
    let priceDetail = props.Tissu.price + '€ ' +'/' + props.Tissu.footage

    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const order_url        = `${base_api}/fabrics/`
    const hide_url         = `${base_api}/product/hide/`

    const doUpload = async (items) => {
      const targetUrl =  order_url + items._id
      console.log("target: " +targetUrl)
      console.log("Update: " +items)
      await  axios.put(targetUrl,items)
          .then((res) => {
        }).catch((error) => {
            console.log(error)
        });
    }

    const doDelete = async (items) => {
        const targetDelete =  order_url + items._id
        console.log("target: " +targetDelete)
        await  axios.delete(targetDelete)
            .then((res) => {
          }).catch((error) => {
              console.log(error)
          });
      }






    const ref = useRef<HTMLButtonElement>(null);

    const [img, setImg] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [footage, setFootage] = useState('')
    const [price, setPrice] = useState('')



    const handleClose     = () => {
        props.SetShow(false);
        window.location.reload();
    }

    const hide = async (item:Product) =>{

        const targetUrl =  hide_url + item._id
        await  axios.put(targetUrl,item)
            .then((res) => {
          }).catch((error) => {
              console.log(error)
          });


        history.push("/Main")
      }

    const handleDelete     = () => {

        props.SetShow(false);
        doDelete({_id: props.Tissu._id});
        window.location.reload();

    }

    const onSubmit = (item:Product) => {       
        

        console.log("footage: " +footage + "===" + '')
        const finalFootage = footage === ''
        ?   props.Tissu.footage 
        : footage      
        console.log("footage: " + finalFootage)


        console.log("category: " +category + " === " +'' )
        const finalCategory = category === ''
        ?   props.Tissu.category 
        : category

        const finalTitle =  title === ''
        ?   props.Tissu.title 
        : title

        const finalDescription =  description === ''
        ?   props.Tissu.description 
        : description

        const finalPrice =  price === ''
        ?   props.Tissu.price 
        : price

        const finalImg = img === ''
        ?   props.Tissu.img 
        :  img

        const doc =  {
            _id: props.Tissu._id,
            footage: finalFootage,
            category: finalCategory,
            title: finalTitle,
            description: finalDescription,
            price:finalPrice,
            repo: finalCategory,
            img: finalImg
        }
        console.log("update:" + JSON.stringify(doc))      
        doUpload(doc)
        history.push("/main")
  
    }

    if(props.Show)
    {

            return (

                <Modal show={props.Show} onHide={handleClose}>  
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
                                                        Category:
                                                        <input
                                                            size={100}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Category"                                  
                                                            defaultValue={props.Tissu.category} 
                                                            onChange={event => setCategory(event.target.value)}
                                                        />
                                                </label>
                                                </div>
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
                                                            onChange={event => setFootage(event.target.value)}                                                  
                                                            />
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
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                            <Button variant="warning" onClick={()=>{hide(props.Tissu)}} >
                            Hide
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>

                            <Button variant="primary" onClick={()=>{onSubmit(props.Tissu)}}>
                            Update
                            </Button>

                        </Modal.Footer>      
                </Modal>              

            )
    }

    return  (     <> </>      )
}

export default  CardModal