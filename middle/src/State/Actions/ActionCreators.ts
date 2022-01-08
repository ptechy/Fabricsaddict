
import {ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, RESET_CART, ADD_CUSTOMER, UPDATE_CUSTOMER } from "./actionTypes"
import IProduct from '../../Models/Products/Product'
import ICustomer from '../../Models/Customer/Customer'
import IProductState from "../../Models/Products/ProductState"


/*
 * action creators
 */

export const addToCart = (item:IProduct, qty:number)=> {
    const product = {...item, ...{quantity: qty }}
    return {
        type: ADD_TO_CART, 
        payload : product
    }
 }


 export const updateCart = (item:IProduct) => {
     return {
         type : UPDATE_CART, 
         payload : item
     }
 }

 
export const removeFromCart = (item:IProduct) =>{
     return {
         type: REMOVE_FROM_CART, 
         payload: item
     }
 }

 
export const saveCart = (items:IProductState) =>{
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


export const addCustomer = (item:ICustomer) => {
    return {
        type: ADD_CUSTOMER, 
        payload: item
    }
}



export const updateCustomer = (item:ICustomer) => {
    return {
        type: UPDATE_CUSTOMER, 
        payload: item
    }
}