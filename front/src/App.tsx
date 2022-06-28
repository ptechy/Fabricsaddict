
import React, {FunctionComponent, Fragment, useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Home/Main'
import Product from './Models/Products/Product'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import Category from './Models/Fabric/Category'
import axios from 'axios'
import env from "react-dotenv"
import Delivery from './Components/Delivery/Delivery'
import ConfirmDelivery from './Components/Delivery/ConfirmDelivery'
import Contact from './Components/Contact/Contact'
import Company from './Components/Company/Company'
import './Styles/App.css';


const App:FunctionComponent = () => {
  
  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const title_url        = `${base_api}/titles`
  const fabrics_url      = `${base_api}/fabrics`
  const categories_url   = `${base_api}/categories`

  const [titles, setTitles]                     = useState<Category[]>([])
  const [customProducts, setCustomProducts]     = useState<Product[]>([])
  const [customItems, setCustomItems]           = useState<Product[]>([])  // products by category
  const [filtered , setFiltered]                = useState<boolean>(false) // set if filter is active

  const reload  = () =>{
    loadTitle()
    loadProducts()
  }


  // load products by category
  const loadProductByCategory = async (repo:String) => {
    await  axios.get(`${categories_url}/${repo}`)
    .then(result =>{     
      setCustomProducts(result.data.data)    
      setFiltered(true)
    } )     
    .catch(error => `Error:${error}`)
  } 

  const loadProducts = async () => {
    await  axios.get(fabrics_url)
    .then(result => {
      setCustomItems(result.data.data)
    })          
    .catch(error => `Error:${error}`)
  }


  // get filtered products
  const loadCategory  = (repo:string) =>{
      loadProductByCategory(repo)  
  }

  //getTitles in left menu
  const loadTitle = async () => {    
    await  axios
    .get(title_url)
    .then(result => setTitles(result.data))
    .catch(error => `Error:${error}`)  
  }

  // loading titles and products only on page refresh
  useEffect( () => {
   
    loadTitle()
    loadProducts()

  }, []);


  return (
    <Router>
      <Fragment>
      <div className="container" >
          <NavBar   CustomItems={customItems} Filtered={setFiltered}/>  
          <Route exact path="/" component={() => <Main CustomProducts={filtered ? customProducts  : customItems} 
                                                       Titles = {titles}
                                                       LoadCategory={loadCategory}/> } />
                  
          <Route path="/Cart" component={Cart}/>
          <Route path="/Contact" component={Contact}/>
          <Route path="/Company" component={Company}/>
          <Route path="/checkout" component={Checkout}/>     
          <Route path="/Delivery" component={Delivery}/>   
          <Route path="/ConfirmDelivery" component={ConfirmDelivery}/>   
          
      </div>
      </Fragment>
    </Router>
  )
}
  
export default App;
