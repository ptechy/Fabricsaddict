import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import IProduct from '../../Models/Products/Product'
import IProductState from '../../Models/Products/ProductState'
import './NavBar.css';

type Props = {
    CustomItems: IProduct[],
    FilteredResults:  (customItems:IProduct[], input:string)=> void 
    Filtered: boolean
};
   


const NavBar: FunctionComponent<Props> =  (props) =>{



    return (
        <Fragment>
        <div className="row fluid">
            <div className="col-sm-2">
            <Link to="/" >
                <img src="img/logo.png" alt="FabricsAddict" className="img-fluid"/>
            </Link>
              
            </div>
            <div className="col-sm-8">
                <nav className="navbar navbar-light bg-white">
                <Link to="/Orders" className="navbar-brand">Orders</Link>
                <Link to="/Archives" className="navbar-brand">Archives</Link>
                <Link to="/Upload" className="navbar-brand">Upload</Link>
                <Link to="/Contacts" className="navbar-brand">Contacts</Link>
                <Link to="/Hidden" className="navbar-brand">Hidden</Link>
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