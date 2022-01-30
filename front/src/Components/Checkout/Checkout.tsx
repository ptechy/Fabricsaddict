import React, {  FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer } from  '../../State/Actions/ActionCreators'
import ConfirmDelivery from '../Delivery/ConfirmDelivery'
import { Redirect } from "react-router";
import {  useHistory} from "react-router-dom";
import './Checkout.css'


type Props = {
    Idx : NumberConstructor,
    Redirect: boolean
   };

const Checkout: FunctionComponent<Props> =  (props) =>{

    // form validation rules 
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('le prénom est obligatoire')
          .min(2, 'le prénom contient au moins 2 caractères')
          .max(50, 'le prénom contient au maximum 50 caractères')
          .matches(/^[A-Za-z]+((\s)?((\'|\-.)?([A-Za-z])+))*$/, 'uniquement lettres, tiret, espace ou apostrophe'),
      lastName: Yup.string()
          .required('le nom est obligatoire')
          .min(2, 'le nom contient au moins 2 caractères')
          .max(50, 'le nom contient au maximum 50 caractères')
          .matches(/^[A-Za-z]+((\s)?((\'|\-.)?([A-Za-z])+))*$/, 'uniquement lettres, tiret, espace ou apostrophe'),
      email: Yup.string()
          .required('l\'email est obligatoire')
          .email('l\'email est invalide'),
      address: Yup.string()
          .required('l\'adresse est obligatoire')
          .min(2, 'l\'adresse doit contenir au moins 2 caractères')
          .max(50, 'le nom contient au maximum 50 caractères'),   
      zipCode: Yup.string()
          .required('le code postal est obligatoire')
          .matches(/^(?:[0-8]\d|9[0-8])\d{3}$/, "le code postale doit contenir 5 chiffres"),       
      city: Yup.string()
          .required('la ville est obligatoire')
          .min(2, 'la ville doit contenir au moins 2 caractères')
          .max(50, 'la ville contient au maximum 50 caractères')    
          .matches(/^[A-Za-z]+((\s)?((\'|\-.)?([A-Za-z])+))*$/, "uniquement lettres, tiret, espace ou apostrophe")
    
  });

    const history = useHistory();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const dispatch = useDispatch()
    const isValid = true;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
    
    const onSubmit = (item: any) => {         
      dispatch(addCustomer(item))
      history.push("/ConfirmDelivery")
  }


    return (
        <>

            <section className="section-content padding-y" style={{ margin: '20px auto', maxWidth: '720px' }}>
                <div className="jumbotron text-center">
                      <h5 className="display-8">Mercide renseigner votre adresse de livraison</h5>
                      <br/>
                </div>
                <div className="container" >

                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prénom"
                                    {...register('firstName')}                                    
                                    defaultValue="" />
                                  <p className="invalid-field" >{errors.firstName?.message}</p>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nom"                             
                                    {...register('lastName')}
                                    defaultValue="" />
                                  <p className="invalid-field">{errors.lastName?.message}</p>
                                </div>
                              </div>
                              <br />
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                  {...register('email')}  />
                                <p className="invalid-field" >{errors.email?.message}</p>
                              </div>
                              <br/>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Addresse"
                                  {...register('address')}
                                  defaultValue=""                />
                              </div>
                              <p className="invalid-field" >{errors.address?.message}</p>
                              <br/>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Code postal"
                                   {...register('zipCode')}
                                    defaultValue=""  />
                                </div>
                                <p className="invalid-field" >{errors.zipCode?.message}</p>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pays"
                                    {...register('city')}
                                    defaultValue=""         
                                  />
                                </div>
                                <p className="invalid-field" >{errors.city?.message}</p>
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