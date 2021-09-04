import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import {  useSelector } from 'react-redux'
import './NavBar.css';

type Props = {
    CustomItems: Product[],
    FilteredResults:  (customItems:Product[], input:string)=> void 
    Filtered: boolean
};
   


const NavBar: FunctionComponent<Props> =  (props) =>{

    const items: Product[] = useSelector(
        (state: ProductState) => state.products
      );

    return (
        <Fragment>
        <div className="row fluid">
            <div className="col-sm-3">
            <Link to="/" >
                <img src="img/logo.png" alt="FabricsAddict" className="img-fluid"/>
            </Link>
              
            </div>
            <div className="col-sm-4">
                <nav className="navbar navbar-light bg-white">
                <Link to="/Categories" className="navbar-brand">
                            Upload
                 </Link>
                <Link to="/Categories" className="navbar-brand">
                            Categories
                 </Link>
                 <Link to="/Orders" className="navbar-brand">
                            Orders
                </Link>
                </nav>
            </div>
            <div className="col-sm">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/main" className="navbar-brand">
                            <img src="img/home.svg" alt="Accueil" width="24" height="24" />
                        </Link>
                     
                    </div>
				</nav>
            </div>
           
        </div>

    </Fragment>
    )
}

export default NavBar;