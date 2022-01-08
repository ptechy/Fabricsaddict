import { connect } from 'react-redux'
import App  from '../App'
import IProductState from '../Models/Products/ProductState'
import {  saveCart } from '../State/Actions/ActionCreators'
import { Dispatch } from 'redux';


const mapStateToProps = (state:IProductState) => { 
    return { items: state }
}

const mapDispatchToProps = (dispatch: Dispatch)  => { 
    return {
       saveLocalStorage: (items: IProductState) =>  dispatch(saveCart(items))
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)