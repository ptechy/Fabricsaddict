import mongoose from 'mongoose'


const { Schema }        = mongoose
const footageEnum       = ['m', 'coupon']
const decimalValidation = (value) => parseFloat(value) > 0.00

const textileSchema = new Schema({
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

const TextileModel = mongoose.model('textile', textileSchema)


export default TextileModel
