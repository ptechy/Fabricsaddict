import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import env from "react-dotenv"
import axios from 'axios'

import ClientCaptcha from "react-client-captcha";
import './Company.css'

const Company: FunctionComponent =  () =>{



  const divStyle    = { width: 540+'px'}
     

    return (
        <>

        <div  style={{ margin: '60px auto', maxWidth: '920px' }}>


            <h4 className="display8">Fabrics Addict au service de ses clients </h4>
            <hr />
            <br/>


            <div className="card">
                <div className="card-header">
                  Qualité
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                  Rigueur
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                  Vie privée
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>                        

        </div>



        </>
    )

}

export default Company