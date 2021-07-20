
import {ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, RESET_CART } from "./actionTypes"
import Product from '../../Models/Products/Product'


/*
 * action creators
 */

export const addToCart = (item:Product, qty:number)=> {
    const product = {...item, ...{quantity: qty }}
    return {
        type: ADD_TO_CART, 
        payload : product
    }
 }


 export const updateCart = (item:Product) => {
     return {
         type : UPDATE_CART, 
         payload : item
     }
 }

 
export const removeFromCart = (item:Product) =>{
     return {
         type: REMOVE_FROM_CART, 
         payload: item
     }
 }

 
export const saveCart = (items:Product[]) =>{
     return {
         type: SAVE_CART, 
         payload: items
     }
 }


 export const resetCart = () => {
    return {
        type: RESET_CART, 
        payload: []
    }
}