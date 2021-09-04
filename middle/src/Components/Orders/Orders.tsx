import React, {  FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useHistory} from "react-router-dom";
import Product from '../../Models/Products/Product'


type Props = {
  Item: Product,
    Idx : number
 };
const Checkout: FunctionComponent<Props> =  (props) =>{

    // form validation rules 
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('le prénom est obligatoire')
          .min(2, 'le prénom doit contenir au moins 2 caractères')
          .max(20, 'le prénom contient au maximum 20 caractères'),
   
  });
  
  let imgStyle    = { width: 250+'px', height:400 + 'px', margin: 3 + 'px'  };
  let imgPath     = process.env.PUBLIC_URL + '/img/' + props.Item.repo + '/' + 'tissu.jpg';
    const history = useHistory();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
    
    const onSubmit = (item: any) => {         
    
      history.push("/ConfirmDelivery")

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