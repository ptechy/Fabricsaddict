import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import env from "react-dotenv"
import axios from 'axios'

import ClientCaptcha from "react-client-captcha";
import './Company.css'

const Company: FunctionComponent =  () =>{

     

    return (
        <>

        <div  style={{ margin: '60px auto', maxWidth: '920px' }}>


            <h3 className="display8">Fabrics Addict au service de ses clients </h3>
            <hr />
            <br/>


            <div className="card comp">
                <div className="card-header backBox"><h4>Qualité</h4></div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>

            <div className="card comp">
                <div className="card-header backBox"><h4>Rigueur</h4></div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>

            <div className="card comp">
                <div className="card-header backBox"><h4>Vie privée</h4></div>
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