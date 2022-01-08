import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import env from "react-dotenv"
import axios from 'axios'

import ClientCaptcha from "react-client-captcha";
import './Contact.css'

const Contact: FunctionComponent =  () =>{

  const root_url              = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api              = `${root_url}/${env.API_BASE_URL}`
  const commit_msg_url        = `${base_api}/contact`

  const addContact = async (item) => {
    await  axios.post(commit_msg_url,item)
        .then((res) => {
          console.log(res.data)
      }).catch((error) => {
          console.log(error)
      }); 
  }


  const [captchaCode, setCaptchaCode] = useState("");

    // form validation rules 
    const validationSchema = Yup.object().shape({
      email: Yup.string()
          .required('l\'email est obligatoire')
          .email('l\'email est invalide'),
      message: Yup.string()
          .required('le message est obligatoire')
          .min(50, 'le message doit contenir au moins 50 caractères')
          .max(1000, 'le nom contient au maximum 1000 caractères'),
      captcha: Yup.string()
          .required('recopier le mot ci-dessous')
         
    });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm(formOptions);   
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const onSubmit = (item: any) => {   
      
      
      if(item.captcha  === captchaCode){
        setConfirm("messsage envoyé")
        addContact(item)
        reset({ captcha: "" , email:"", message: "" })
      } else{
        setConfirmError("le champs de validation est erroné")
      }
  }
     

    return (
        <>
            <section className="section-content padding-y" style={{ margin: '100px auto', maxWidth: '720px' }}>
                <div className="container" >

                  <form onSubmit={handleSubmit(onSubmit)}>

                              
                              <p className="message-head" >Vous pouvez nous contacter par ce formulaire, nous vous repondrons dans les plus brefs delais</p>
                              <br/>
                              <br/>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                   {...register('email')}  
                                   onClick={()=>{  setConfirm("")}}                                 
                                    size={20} />
                                </div>
                                <p className="invalid-field" >{errors.email?.message}</p>
                                <br /> 
                                <br /> 
                                <br /> 
                                <p className="message-field" >Prenez le temps de relire votre message vous ne pourrez pas le modifier par la suite</p>
                                <div className="col">
                                    <textarea
                                    id="msg"
                                    name="message"
                                    onClick={()=>{  setConfirm("")}}  
                                    {...register('message')}
                                                                       rows={10}
                                    cols={73}
                                  
                                  />                                 
                                </div>
                                <p className="invalid-field" >{errors.message?.message}</p>
                              </div>
                              <div className="col">    
                              <input
                                    type="text"
                                    className="form-control"
                                    {...register('captcha')}
                                    name="captcha"
                                    placeholder="inséré ici le code ci-dessous"
                                    onClick={()=>{  setConfirmError("")}}  
                                    size={20} /> 
                                     <p className="invalid-field" >{errors.captcha?.message}</p>
                                     <p className="invalid-field" >{confirmError}</p>
                                     <br />                              
                               <ClientCaptcha captchaCode={code =>setCaptchaCode(code)} />
                               <p className="ok-field" >{confirm}</p>
                              </div>                              
                              <br />                             
                              <input type="submit" />


                  </form>
                        
                </div> 
            </section>



        </>
    )

}

export default Contact