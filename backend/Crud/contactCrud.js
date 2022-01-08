import ContactModel from '../Models/contact'
import moment from 'moment'


const getWrap = ( status, msg, json ) =>{
  return ({  
    status: status,
    results: json.length,
    message: msg,
    data: json})
 } 


 export const addContact = async (req, res) => {
  try {    

      const str  = JSON.stringify(req.body)
      const data = JSON.parse(str)          
      const now =  moment().format("DD-MM-YYYY HH:mm:ss") 

      const doc =  {
        email: data.email,
        message: data.message,
        date: now
      }

      const contact = new ContactModel(doc)
      await contact.save()
      res.status(200)

  } catch (error) {
     // res.status(404).json( error)
  }
}


export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({}).sort({date:-1})
    res.status(200).send( getWrap(200, "get contacts", contacts) )
  } catch (error) {
  //  res.status(404).send(error)
  }
}


