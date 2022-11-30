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

        
          <div  style={{ margin: '60px auto', maxWidth: '720px' }}>


          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
            <h5 className="display8">Vous pouvez nous contacter par ce formulaire</h5>
              <br/>
              <div className="input-group mb-3">
                <span className="input-group-text backBox" id="basic-addon1">Adresse mail</span>

                <input type="text"
                       className="form-control"
                       placeholder="Email"
                       {...register('email')}  
                       onClick={()=>{  setConfirm("")}}                                 
                       size={60} />
                   
             
              </div>
              <p className="invalid-field" >{errors.email?.message}</p>       
              <br/>
              <br/>
              <label  className="form-label colorBox">Prenez le temps de relire votre message vous ne pourrez plus le modifier par la suite</label>
              <div className="input-group  mb-3">
                <span className="input-group-text backBox">Message</span>
                <textarea
                                    id="msg"
                                    name="message"
                                    onClick={()=>{  setConfirm("")}}  
                                    {...register('message')}
                                    rows={7}
                                    cols={90}
                                  
                                  />     
                 
              </div>
              <p className="invalid-field" >{errors.message?.message}</p>  
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <ClientCaptcha captchaCode={code =>setCaptchaCode(code)}    backgroundColor={"#e9ecef" }/>
                  </span>
                <input
                                    type="text"
                                    className="form-control"
                                    {...register('captcha')}
                                    name="captcha"
                                    placeholder="Insérer ici le code ci-contre"
                                    onClick={()=>{  setConfirmError("")}}  
                                    size={20} />         

              </div>
              <p className="invalid-field" >{errors.captcha?.message}</p>
              <p className="invalid-field" >{confirmError}</p>   
              <p className="ok-field" >{confirm}</p>

            </div>

            <button type="submit" className="btn btn-outline-success">Submit</button>
          </form>
          </div>
          
          


        </>
    )

}

export default Contact