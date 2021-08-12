
import {ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, SAVE_CART, RESET_CART, ADD_CUSTOMER, UPDATE_CUSTOMER } from "./actionTypes"
import Product from '../../Models/Products/Product'
import Customer from '../../Models/Customer/Customer'
import ProductState from "../../Models/Products/ProductState"


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

 
export const saveCart = (items:ProductState) =>{
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


export const addCustomer = (item:Customer) => {
    return {
        type: ADD_CUSTOMER, 
        payload: item
    }
}



export const updateCustomer = (item:Customer) => {
    return {
        type: UPDATE_CUSTOMER, 
        payload: item
    }
}