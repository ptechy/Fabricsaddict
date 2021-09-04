
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

  // load products by category
  const loadProductByCategory = async (repo:String) => {
    await  axios.get(`${categories_url}/${repo}`)
    .then(result => setCustomProducts(result.data.data))          
    .catch(error => `Error:${error}`)
  } 

  // get filtered products
  const loadCategory  = (repo:string) =>{
    loadProductByCategory(repo) 
    setFiltered(false) 
  }

  const filterResults  = (items:Product[], word:string):Product[] =>{
    const products = items.length == 0 || word.length == 0 ? customProducts : customItems
    return   products.filter( (item:Product) => item.title.toLowerCase().indexOf(word.toLowerCase()) >-1 )              
  }

  const setfilteredResults  = (items:Product[], word:string) =>{
      const filteredValues = filterResults(items, word)
      setCustomItems(filteredValues) 
      setFiltered( filteredValues.length > 0 ? true : false)
  }

  // loading titles and products only on page refresh
  useEffect( () => {

    //get product list in central area
    const loadProduct = async () => {
      await  axios.get(fabrics_url)
      .then(result => setCustomProducts(result.data.data))          
      .catch(error => `Error:${error}`)
      }

    //getTitles in left menu
    const loadTitle = async () => {    
      await  axios
      .get(title_url)
      .then(result => setTitles(result.data))
      .catch(error => `Error:${error}`)  
    }
    
    loadTitle()
    loadProduct()

  }, []);


  return (
    <Router>
      <Fragment>
      <div className="container" >
          <NavBar  FilteredResults={setfilteredResults} CustomItems={customItems} Filtered={filtered} />  
          <Route exact path="/" component={() => <Main CustomProducts={filtered ? customItems : customProducts}   
                                                       Titles = {titles}
                                                       LoadCategory={loadCategory} /> } />
                                                       
          <Route path="/main" component={() => <Main CustomProducts={filtered ? customItems : customProducts} 
                                                     Titles = {titles} 
                                                     LoadCategory={loadCategory} /> } />
          <Route path="/cart" component={Cart}/>
          <Route path="/checkout" component={Checkout}/>     
          <Route path="/Delivery" component={Delivery}/>   
          <Route path="/ConfirmDelivery" component={ConfirmDelivery}/>   
          
      </div>
      </Fragment>
    </Router>
  )
}
  
export default App;
