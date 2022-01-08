
import React, {FunctionComponent, Fragment, useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {  useHistory} from "react-router-dom";
import IProduct from '../../Models/Products/Product'

import axios from 'axios'
import env from "react-dotenv"

import CardModal from "../Card/CardModal"
import Category from '../../Models/Fabric/Category'


type Props = {
    Categories: Category[]
   };



   const Hidden: FunctionComponent <Props> =  (props) =>{


    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const hidden_url       = `${base_api}/fabrics/hidden`
    const activate_url     = `${base_api}/product/activate/`
    const history = useHistory();
    const [customProducts, setCustomProducts]     = useState<IProduct[]>([])

    const [show, setShow] = useState(false);

    const handleShow      = () => setShow(true);

    const activate = async (item:IProduct) =>{

        const targetUrl =  activate_url + item._id
        await  axios.put(targetUrl,item)
            .then((res) => {
          }).catch((error) => {
              console.log(error)
          });


        history.push("/Main")
    }


  // loading titles and products only on page refresh
    useEffect( () => {

        //get product list in central area
            const loadProduct = async () => {
            await  axios.get(hidden_url)
            .then(result => setCustomProducts(result.data.data))          
            .catch(error => `Error:${error}`)
        }
        loadProduct()

    }, []);


      return (
       
        <div className="list-group">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Update</th>
                        <th scope="col">Activatation</th>
                    </tr>
                </thead>
                 <tbody>
                        { customProducts.map((item:IProduct, index:number) =>{

                            let imgPath     = process.env.PUBLIC_URL + '/img/' + item.repo + '/' + item.img

                            return(  
                            
                                <tr  key={index}>
                                    <td>            
                                        <img
                                            width="70"
                                            height="70"
                                            src={imgPath}
                                            alt="..."
                                            />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td> 
                                        <button type="button" 
                                            className="list-group-item list-group-item-action"
                                            onClick ={handleShow}
                                            key={index}  >  
                                        Update
                                        </button>        
                                        <CardModal Tissu={item} Idx={index} SetShow={setShow} Show={show} Categories={props.Categories}  />        
                                    </td>
                                    <td> 
                                        <button type="button" 
                                            className="list-group-item list-group-item-action"
                                            onClick = {() => activate(item)}
                                            key={index}  >  
                                        Activer
                                    </button>                
                                    </td>
                                </tr>
                                
                            
                        
                                )
                        }) } 

                </tbody>
            </table>
        </div>
          
    )
      
              
}

export default Hidden;