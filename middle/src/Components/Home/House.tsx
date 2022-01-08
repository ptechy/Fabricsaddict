import React, { FunctionComponent} from 'react';
import IProduct from '../../Models/Products/Product';
import Category from '../../Models/Fabric/Category'
import Card from '../Card/Card';

type Props = {
    CustomProducts: IProduct[]
    Categories: Category[]
   };

const House: FunctionComponent<Props> =  ({CustomProducts, Categories}) =>{
    return (
        <div className="row">
            {
                CustomProducts.map( (val:IProduct, index:number) => <Card Tissu={val} Idx={index} key={index} Categories={Categories} /> )
            }
        </div>
    )
}

export default House;