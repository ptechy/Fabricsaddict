import axios from 'axios'
import { isTemplateExpression } from 'typescript'
import Category from '../Models/Fabrics/Category'
import Tissu from '../Models/Fabrics/Tissu'

const base_url = 'http://localhost:4000/api/v1'

export  const  getCategories = async () :Promise<Category[]>=>{
    const url = `${base_url}/categories`

    const tt  = await axios.get(url)
                           .then(response=> response.data)
                           .catch(error => console.log(`Error: ${error}`))
    return tt
}


export const  getProductsByCategory = async (category:string|null) => {

    const url    = `${base_url}/fabrics`

    const result = await axios.get(url)
                              .then(response=> response.data)
                              .catch(error => console.log(`Error: ${error}`))
}