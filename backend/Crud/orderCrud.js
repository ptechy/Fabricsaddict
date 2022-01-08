import OrderModel from '../Models/order'
import moment from 'moment'
 
const getWrap = ( status, msg, json ) =>{
  return ({  
    status: status,
    results: json.length,
    message: msg,
    data: json})
} 

export const addOrder = async (req, res) => {
  
      try {  
        const str  = JSON.stringify(req.body)
        const json = JSON.parse(str)         
        const now  =  moment().format("DD-MM-YYYY HH:mm:ss") 

          const reqCustomer = json.customers[0]
          const customer = {
              city: reqCustomer.city,
              zipCode: reqCustomer.zipCode,
              address: reqCustomer.address,
              email: reqCustomer.email,
              lastName: reqCustomer.lastName,
              firstName: reqCustomer.firstName
          }
      
          const products =  json.products.map( data =>{
              return {
                    footage: data.footage,
                    category: data.category,
                    title: data.title,
                    description: data.description,
                    price:data.price,
                    quantity: data.quantity,
                    img: data.img,
                    repo: data.category
              }
          })
      
          const doc = {
            "orderId": json.orderId,
            "customers": [customer],
            "products": products,
            "fees": json.fees,
            "totalBeforeFees": json.totalBeforeFees,
            "total": json.total,
            "date": now        
          }
      
        const order = new OrderModel(doc)
        order.save()
    
        res.status(200).json({"status":"ok"})  
      } catch (error) {
    //      res.status(404).json( error)
      }
}

export const getOrders = async (req, res) => {
    try {
      const orders = await OrderModel.find({}).limit(50)
      res.status(200).send( getWrap(200, "get orders", orders) )
    } catch (error) {
    //  res.status(404).send(error)
    }
}

export const getActivedOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({hidden:false}).limit(50)
    res.status(200).send( getWrap(200, "get active  orders", orders) )
  } catch (error) {
  //  res.status(404).send(error)
  }
}

export const getHiddenOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({hidden:true}).limit(50)
    res.status(200).send( getWrap(200, "get hidden orders", orders) )
  } catch (error) {
 //   res.status(404).send(error)
  }
}

export const hideOrder = async (req, res) => {
  try {
      const orders = await OrderModel.findByIdAndUpdate( { _id: req.params.id }, {hidden: true})
      await orders.save()
      res.send(getWrap(200, "hide order", orders))
  } catch (error) {
 //   res.status(404).send(error)
  }
}

export const activateOrder = async (req, res) => {
  try {
      const orders = await OrderModel.findByIdAndUpdate(req.params.id, {hidden: false})
      await orders.save()
      res.send(getWrap(200, "activate order", orders))
  } catch (error) {
  //  res.status(404).send(error)
  }
}



