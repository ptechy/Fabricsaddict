import React, { FunctionComponent} from 'react';
import Product from '../../Models/Products/Product';
import Category from '../../Models/Fabric/Category'
import Card from '../Card/Card';

type Props = {
    CustomProducts: Product[]
    Categories: Category[]
   };

const House: FunctionComponent<Props> =  ({CustomProducts, Categories}) =>{
    return (
        <div className="row">
            {
                CustomProducts.map( (val:Product, index:number) => <Card Tissu={val} Idx={index} key={index} Categories={Categories} /> )
            }
        </div>
    )
}

export default House;