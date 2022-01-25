import React, { ReactNode, useRef,useState, FunctionComponent,useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useHistory, useLocation} from "react-router-dom";
import IProduct from '../../Models/Products/Product'
import "../../Styles/App.css";
import { useDispatch, useSelector } from 'react-redux'
import { Button,Modal } from 'react-bootstrap';
import Category from '../../Models/Fabric/Category'
import axios from 'axios'
import env from "react-dotenv"


import CardModal from "./CardModal"


type Props = {
    Tissu: IProduct,
    Categories: Category[],
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
    let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Tissu.repo + '/' + props.Tissu.img
    let priceDetail = props.Tissu.price + '€ ' +'/' + props.Tissu.footage

    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const order_url        = `${base_api}/fabrics/`

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

    const [show, setShow] = useState(false);
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
                            Update
                        </Button>
                    </div>                    
                </div>                  
            </div>

             {/* Modal  */}

                <CardModal Tissu={props.Tissu} Idx={props.Idx} SetShow={setShow} Show={show} Categories= {props.Categories} />




      </div>
    )
}

export default Card;