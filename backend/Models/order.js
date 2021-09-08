import mongoose from 'mongoose'
const { Schema } = mongoose
const footageEnum       = ['m', 'coupon']

const credentialValidation = (value) => value.length > 6 && value.length <= 20
const nameValidation = (value) => value.length > 1 && value.length <= 50
const addressValidation = (value) => value.length > 1 && value.length <= 150
const cityValidation = (value) => value.length > 1 && value.length <= 50
const zipCodeValidation = (value) => value.length > 3 && value.length <= 20

const matchRegex = /[a-zA-Z]/

const validateEmail = (value) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value)
}



const customerSchema = new Schema({
  firstName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'first name is incorrect' }, match: matchRegex },
  lastName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'last name is incorrect' }, match: matchRegex },
  email: { type: String, required: true, trim: true, lowercase: true, validate: { validator: validateEmail, message: 'email is incorrect' } },
  address: { type: String, required: true, trim: true, lowercase: true, validate: { validator: addressValidation, message: 'address is incorrect' } },
  city: { type: String, required: true, trim: true, lowercase: true, validate: { validator: cityValidation, message: 'city is incorrect' }, match: matchRegex },
  country: { type: String, required: false, trim: true, lowercase: true, validate: { validator: cityValidation, message: 'country is incorrect' }, match: matchRegex,default: 'France' },
  zipCode: { type: String, required: true, trim: true, lowercase: true, validate: { validator: zipCodeValidation, message: 'zipCode is incorrect' } }
})

const productSchema = new Schema({
  category: { type: String, enum: [], required: true, trim: true, lowercase: true },
  title: { type: String, required: true, trim: true, lowercase: true },
  description: { type: String, required: true, trim: true, lowercase: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true, minLength: 0, maxLength: 10000 },
  footage: { type: String, enum: footageEnum, required: false, trim: true, lowercase: true, default: 'm' },
  img: { type: String, required: true, trim: true, lowercase: true },
  repo: { type: String, required: true, trim: true },
  date: { type: Date, required: false, default: Date.now },
  hidden: { type: Boolean, required: false, default: false }
})


const orderSchema = new Schema({
  customers:[customerSchema],
  products: [productSchema]
})



const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel
