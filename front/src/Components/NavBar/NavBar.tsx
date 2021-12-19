import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import './NavBar.css';
import { relativeTimeRounding } from 'moment';

type Props = {
    CustomItems: Product[],
    Filtered: (value:boolean)=> void
};
   


const NavBar: FunctionComponent<Props> =  (props) =>{

    const items: Product[] = useSelector(
        (state: ProductState) => state.products
      );

    return (
        <Fragment>
        <div className="row fluid">
            <div className="col-sm-4">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand" onClick={() => props.Filtered(false)}>
                        <img src="img/logo3.png" alt="FabricsAddict" className="img-fluid"  /> 
                        </Link> 
                    </div>
                </nav>         
            </div>
            <div className="col-sm-8">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand" onClick={() => props.Filtered(false)} >
                            <img src="img/home.svg" alt="Accueil" width="24" height="24"   />
                        </Link>
                        <Link to="/Contact" className="navbar-brand">
                            <img src="img/mail.svg" alt="Email" width="24" height="24" />
                        </Link>
                        <Link to="/Cart" className="navbar-brand" >
                            <img src="img/basket.svg" alt="Panier" width="24" height="24"/>
                            <span className="badge rounded-pill bg-warning">{items.length > 0 && items.length}</span>
                        </Link>
                    </div>
                </nav>
            </div>
            
           
           
        </div>

    </Fragment>
    )
}

export default NavBar;