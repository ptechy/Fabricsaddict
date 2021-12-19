import React, { FunctionComponent, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Contact from './Contact'
import axios from 'axios'
import env from "react-dotenv"
import './Contacts.css'



const Contacts: FunctionComponent =  () =>{

  const root_url            = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api            = `${root_url}/${env.API_BASE_URL}`
  const contacts_url        = `${base_api}/contacts`


  const [contacts, setContacts]   = useState<any[]>([])


  // loading titles and products only on page refresh
  useEffect( () => {

    //get product list in central area
    const loadOrders = async () => {
      await  axios.get(contacts_url)
      .then( result => setContacts(result.data.data) )         
      .catch(error => `Error:${error}`)
      }

      loadOrders()

  }, []);

    return (

      <div>
               <br />
        <span className="fs-1 primary>"> nombre de mails : {contacts.length}</span>
        <br />
        <br />
      { contacts.map( (contact:any, index:number) => {            
        return <Contact Item={contact} Key={index} />
      })}

    </div>)
   
      
    
}

export default Contacts;