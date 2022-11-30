import React, { FunctionComponent} from 'react';
import SideMenu from './SideMenu';
import House from './House';
import Product from '../../Models/Products/Product';
import Category from '../../Models/Fabrics/Category'
import './../../Styles/App.css'


type Props = {
    Titles: Category[],
    CustomProducts: Product[],
    LoadCategory: (repo:string)=> void 
   };

const Main: FunctionComponent<Props> =  ({CustomProducts, Titles, LoadCategory}) =>{
    return (
        <>
       
        <div className="row" >
             <div className="col-sm-2"> 
                <SideMenu Titles={Titles} LoadCategory={LoadCategory} />
            </div>             
            <div className="col-sm">
                <House CustomProducts={CustomProducts} />
            </div> 
        </div>
        </>
    )
}


  
  export default Main


