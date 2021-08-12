import { createStore, compose, applyMiddleware, Store } from "redux";
import productReducer from "../Reducers/productReducer";
import reducers from "../Reducers/productReducer";
import ProductState from "../../Models/Products/ProductState";
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from "redux";


//const rootReducer = combineReducers<ProductState>({reducer: productReducer});

//const composeEnhancer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const   configureStore = () : Store<ProductState> => {  
  return createStore(
    reducers,
    composeWithDevTools()
  );
}

export default configureStore