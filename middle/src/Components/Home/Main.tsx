import React, { FunctionComponent} from 'react';
import { connect } from 'react-redux'
import SideMenu from './SideMenu';
import House from './House';
import IProduct from '../../Models/Products/Product';
import Category from '../../Models/Fabric/Category'

type Props = {
    Titles: Category[],
    CustomProducts: IProduct[],
    LoadCategory: (repo:string)=> void 
   };

const Main: FunctionComponent<Props> =  ({CustomProducts, Titles, LoadCategory}) =>{
    return (

        <div className="row">
             <div className="col-sm-2"> 
                <SideMenu Titles={Titles} LoadCategory={LoadCategory} />
            </div>             
            <div className="col-sm">
                <House CustomProducts={CustomProducts} Categories= {Titles}  />
            </div> 
        </div>
    )
}


  
  export default Main


