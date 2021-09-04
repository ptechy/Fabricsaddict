import React, {  FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,updateCart, updateCustomer } from  '../../State/Actions/ActionCreators'
//import Delivery from '../Delivery/Delivery'

type Props = {
    Idx : number
   };

const Checkout: FunctionComponent<Props> =  (props) =>{

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
          .max(50, 'la ville contient au maximum 50 caractères'),          
          
          

  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const dispatch = useDispatch()
    const isValid = true;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
    
    const onSubmit = (item: any) => {         
        // display form data on success

        console.log("labas");    
     //   console.log(JSON.stringify(item, null, 4));    
        
        dispatch(updateCustomer(item))


    }



    return (
        <>
            <section className="section-content padding-y" style={{ margin: '100px auto', maxWidth: '720px' }}>
                <div className="container" >

                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    {...register('firstName')}                                    
                                    defaultValue="" 
                                  />
                                   <p >{errors.firstName?.message}</p>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"                             
                                    {...register('lastName')}
                                    defaultValue="" 
                                  />
                                  <p>{errors.lastName?.message}</p>
                                </div>
                              </div>
                              <br />
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email address"
                                  {...register('email')}   
                                />
                                <p >{errors.email?.message}</p>
                              </div>
                              <br/>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Address"
                                  {...register('address')}
                                  defaultValue=""                />
                              </div>
                              <p >{errors.address?.message}</p>
                              <br/>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Postal Code"
                                   {...register('zipCode')}
                                    defaultValue=""  />
                                </div>
                                <p >{errors.zipCode?.message}</p>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    {...register('city')}
                                    defaultValue=""         
                                  />
                                </div>
                                <p >{errors.city?.message}</p>
                              </div>
                              <br />
                             
                              <input type="submit" />

                  </form>
                        
                </div> 
            </section>
        </>
    )

}

export default Checkout