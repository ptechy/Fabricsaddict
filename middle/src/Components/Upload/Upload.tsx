import React, {  FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Redirect } from "react-router";
import {  useHistory} from "react-router-dom";
import axios from 'axios'
import env from "react-dotenv"


 
 
 const Upload: FunctionComponent =  () =>{
  
    // form validation rules 
    const validationSchema = Yup.object().shape({
   
  });

    const history = useHistory();
    const formOptions = { resolver: yupResolver(validationSchema) };

    const isValid = true;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
    
    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const order_url        = `${base_api}/fabrics`

    const doUpload = async (items) => {
      await  axios.post(order_url,items)
          .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

  }


    const onSubmit = (item: any) => {   
      console.log("upload:" + JSON.stringify(item))      
      doUpload(item)
      history.push("/main")

    }






    return (
        <>
            <section className="section-content padding-y" style={{ margin: '50px auto', maxWidth: '720px' }}>
                <div className="container" >
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                                <div className="col">
                                <p >Image</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                     {...register('image')}                                    
                                    defaultValue="" 
                                  />
                                   <p >{errors.image?.message}</p>
                                </div>

                                <div className="col">
                                <p >Category</p>
                                  <input
                                    type="text"
                                    className="form-control"
                           
                                    {...register('category')}
                                    defaultValue="" 
                                  />
                                  <p>{errors.category?.message}</p>
                                </div>
                              </div>

  
                              <div className="form-group">
                              <p >Title</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('title')}   
                                />
                                <p >{errors.title?.message}</p>
                              </div>
     
                              <div className="form-group">
                              <p >Description</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('description')}
                                  defaultValue=""                />
                              </div>
                              <p >{errors.description?.message}</p>


                              <div className="col">
                                <p >Footage</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                   {...register('footage')}
                                    defaultValue=""  />
                                </div>
                                <p >{errors.footage?.message}</p>
                                <div className="col">
                                <p >Price</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    {...register('price')}
                                    defaultValue=""         
                                  />
                                <p >{errors.price?.message}</p>
                              </div>
                             
                              <input type="submit" />

                  </form>
                        
                </div> 
            </section>
        </>
    )
  }


export default Upload