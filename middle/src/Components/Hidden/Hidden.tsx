
import React, {FunctionComponent, Fragment, useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {  useHistory} from "react-router-dom";
import Product from '../../Models/Products/Product'

import axios from 'axios'
import env from "react-dotenv"
   const Hidden: FunctionComponent =  () =>{

    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const hidden_url      = `${base_api}/hidden`
    const activate_url      = `${base_api}/fabrics/Activate/`
    const history = useHistory();
    const [customProducts, setCustomProducts]     = useState<Product[]>([])


    const activate = async (item:Product) =>{

        const targetUrl =  activate_url + item._id
        console.log("target: " +targetUrl)
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

    console.log("hidden" + customProducts.length)

      return (
       
        <div className="list-group">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Activate</th>
                    </tr>
                </thead>
                 <tbody>
            { customProducts.map((item:Product, index:number) =>{

                let imgPath     = process.env.PUBLIC_URL + '/img/' + item.repo + '/' + item.img

                return(  
                
                    <tr>
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