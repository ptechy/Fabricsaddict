import { connect } from 'react-redux'
import App  from '../App'
import ProductState from '../Models/Products/ProductState'
import {  saveCart } from '../State/Actions/ActionCreators'
import { Dispatch } from 'redux';


const mapStateToProps = (state:ProductState) => { 
    return { items: state }
}

const mapDispatchToProps = (dispatch: Dispatch)  => { 
    return {
       saveLocalStorage: (items: ProductState) =>  dispatch(saveCart(items))
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)