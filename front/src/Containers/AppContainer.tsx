import { connect } from 'react-redux'
import App  from '../App'
import Product from '../Models/Products/Product'
import {  saveCart } from '../State/Actions/ActionCreators'
import { Dispatch } from 'redux';


const mapStateToProps = (state:Product[]) => { 
    return { items: state }
}

const mapDispatchToProps = (dispatch: Dispatch)  => { 
    return {
       saveLocalStorage: (items: Product[]) =>  dispatch(saveCart(items))
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)