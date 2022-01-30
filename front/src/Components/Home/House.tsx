import React, { FunctionComponent} from 'react';
import Product from '../../Models/Products/Product';
import Card from '../Card/Card';

type Props = {
    CustomProducts: Product[]
   };

const House: FunctionComponent<Props> =  ({CustomProducts}) =>{
    return (
        
        <div className="row">
            {
                CustomProducts.map( (val:Product, index:number) => <Card Tissu={val} Idx={index} key={index} /> )
            }
        </div>
    )
}

export default House;