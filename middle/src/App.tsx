
import React, {FunctionComponent, Fragment, useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Home/Main'
import IProduct from './Models/Products/Product'
import Card from './Components/Card/Card'
import Category from './Models/Fabric/Category'
import Orders from './Components/Orders/Orders'
import Upload from './Components/Upload/Upload'
import Hidden from './Components/Hidden/Hidden'
import Archive from './Components/Archive/Archive'
import Contacts from './Components/Contact/Contacts'
import Replied from './Components/Replied/Replied'
import axios from 'axios'
import env from "react-dotenv"


const App:FunctionComponent = () => {
  const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
  const base_api         = `${root_url}/${env.API_BASE_URL}`
  const title_url        = `${base_api}/titles`
  const fabrics_url      = `${base_api}/fabrics/active`
  const categories_url   = `${base_api}/categories`

  const [titles, setTitles]                     = useState<Category[]>([])
  const [customProducts, setCustomProducts]     = useState<IProduct[]>([])
  const [customItems, setCustomItems]           = useState<IProduct[]>([])  // products by category
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

  const filterResults  = (items:IProduct[], word:string):IProduct[] =>{
    const products = items.length == 0 || word.length == 0 ? customProducts : customItems
    return   products.filter( (item:IProduct) => item.title.toLowerCase().indexOf(word.toLowerCase()) >-1 )              
  }

  const setfilteredResults  = (items:IProduct[], word:string) =>{
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
          <Route path="/Card" component={Card}/>
          <Route path="/Orders" component={Orders}/>    
          <Route path="/Upload" component={() => <Upload Categories= {titles} />} />   
          <Route path="/Hidden" component={() => <Hidden Categories= {titles} />} />  
          <Route path="/Archives" component={Archive} />   
          <Route path="/Contacts" component={Contacts}/>       
          <Route path="/Replied" component={Replied}/>       
      </div>
      </Fragment>
    </Router>
  )
}
  
export default App;
