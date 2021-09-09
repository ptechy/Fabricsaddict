import React, {  FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Redirect } from "react-router";
import {  useHistory} from "react-router-dom";

type Props = {
    Idx : NumberConstructor,
    Redirect: boolean
   };
 
 
 const Upload: FunctionComponent =  () =>{
  
    // form validation rules 
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('le prénom est obligatoire')
          .min(2, 'le prénom doit contenir au moins 2 caractères')
          .max(20, 'le prénom contient au maximum 20 caractères'),
      lastName: Yup.string()
          .required('le nom est obligatoire')
          .min(2, 'le nom doit contenir au moins 2 caractères')
          .max(20, 'le nom contient au maximum 20 caractères'),
      email: Yup.string()
          .required('l\'email est obligatoire')
          .email('l\'email est invalid'),
      address: Yup.string()
          .required('l\'adresse est obligatoire')
          .min(2, 'l\'adresse doit contenir au moins 2 caractères')
          .max(50, 'le nom contient au maximum 50 caractères'),    
      zipCode: Yup.number()
          .required('le code postal est obligatoire'),      
      city: Yup.string()
          .required('la ville est obligatoire')
          .min(2, 'la ville doit contenir au moins 2 caractères')
          .max(50, 'la ville contient au maximum 50 caractères')    
    
  });

    const history = useHistory();
    const formOptions = { resolver: yupResolver(validationSchema) };

    const isValid = true;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
    
    const onSubmit = (item: any) => {         

      history.push("/Upload")

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
                                   <p >{errors.firstName?.message}</p>
                                </div>

                                <div className="col">
                                <p >Category</p>
                                  <input
                                    type="text"
                                    className="form-control"
                           
                                    {...register('category')}
                                    defaultValue="" 
                                  />
                                  <p>{errors.lastName?.message}</p>
                                </div>
                              </div>

  
                              <div className="form-group">
                              <p >Title</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('title')}   
                                />
                                <p >{errors.email?.message}</p>
                              </div>
     
                              <div className="form-group">
                              <p >Description</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('description')}
                                  defaultValue=""                />
                              </div>
                              <p >{errors.address?.message}</p>


                              <div className="col">
                                <p >Footage</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                   {...register('footage')}
                                    defaultValue=""  />
                                </div>
                                <p >{errors.zipCode?.message}</p>
                                <div className="col">
                                <p >Price</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    {...register('price')}
                                    defaultValue=""         
                                  />
                                <p >{errors.city?.message}</p>
                              </div>
                             
                              <input type="submit" />

                  </form>
                        
                </div> 
            </section>
        </>
    )
  }


export default Upload