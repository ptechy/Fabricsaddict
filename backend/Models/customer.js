import mongoose from 'mongoose'
const { Schema } = mongoose

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
  login: { type: String, required: true, trim: true, lowercase: true, validate: { validator: credentialValidation, message: 'login is incorrect' }, match: matchRegex },
  password: { type: String, required: true, trim: true, lowercase: true, validate: { validator: credentialValidation, message: 'password is incorrect' } },
  firstName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'first name is incorrect' }, match: matchRegex },
  lastName: { type: String, required: true, trim: true, lowercase: true, validate: { validator: nameValidation, message: 'last name is incorrect' }, match: matchRegex },
  email: { type: String, required: true, trim: true, lowercase: true, validate: { validator: validateEmail, message: 'email is incorrect' } },
  address: { type: String, required: true, trim: true, lowercase: true, validate: { validator: addressValidation, message: 'address is incorrect' } },
  city: { type: String, required: true, trim: true, lowercase: true, validate: { validator: cityValidation, message: 'city is incorrect' }, match: matchRegex },
  country: { type: String, required: true, trim: true, lowercase: true, validate: { validator: cityValidation, message: 'country is incorrect' }, match: matchRegex },
  zipCode: { type: String, required: true, trim: true, lowercase: true, validate: { validator: zipCodeValidation, message: 'zipCode is incorrect' } },
  isActive: { type: Boolean, required: true, default: true }
})

const CustomerModel = mongoose.model('customer', customerSchema)

export default CustomerModel
