import mongoose from 'mongoose'

const { Schema }    = mongoose
const footageEnum   = ['m', 'coupon']


const nameRegex = /^[ a-zA-Z\-/']+$/
const addressRegex = /[A-Za-z0-9'\.\-\s\,]/
const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const zipCodeRegex = /[0-9]{5}/


const nameValidation    = (value) => value.length > 1 && value.length <= 60
const addressValidation = (value) => value.length > 5 && value.length <= 150
const zipCodeValidation = (value) => value.length > 4
const validateEmail     = (value) => {
                              const regex = emailRegex
                              return regex.test(value)
                          }




const customerSchema = new Schema({
  firstName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'first name is incorrect' }, match: nameRegex },
  lastName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'last name is incorrect' }, match: nameRegex },
  email: { type: String, required: true, trim: true, lowercase: true, validate: { validator: validateEmail, message: 'email is incorrect' } },
  address: { type: String, required: true, trim: true, lowercase: true, validate: { validator: addressValidation, message: 'address is incorrect' } },
  city: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'city is incorrect' } },
  country: { type: String, required: false, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'country is incorrect' }, default: 'France' },
  zipCode: { type: String, required: true, trim: true, lowercase: true, validate: { validator: zipCodeValidation, message: 'zipCode is incorrect' } }
})

const productSchema = new Schema({
  category: { type: String, enum: [], required: true, trim: true, lowercase: false },
  title: { type: String, required: true, trim: true, lowercase: false },
  description: { type: String, required: true, trim: true, lowercase: false },
  price: { type: String, required: true },
  quantity: { type: Number, required: true, minLength: 0, maxLength: 10000 },
  footage: { type: String, enum: footageEnum, required: false, trim: true, lowercase: true, default: 'm' },
  img: { type: String, required: false, trim: true, lowercase: false },
  repo: { type: String, required: false, trim: true },
  date: { type: Date, required: false, default: Date.now }
})

const orderSchema = new Schema({
  customers:[customerSchema],
  products: [productSchema],
  hidden: { type: Boolean, required: false, default: false }
})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel
