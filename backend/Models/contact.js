import mongoose from 'mongoose'

const { Schema }      = mongoose
const contactSchema   = new Schema({
  email: { type: String, required: true, trim: true, lowercase: false, required: true },
  message: { type: String, required: true, trim: true, lowercase: false, required: true },
  date: { type: String, required: true },
  archived: { type: Boolean, required: false, default: false }
})

const ContactModel = mongoose.model('contact', contactSchema)

export default ContactModel
