import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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
            <div className="col-sm-6">
                <nav className="navbar navbar-light bg-white">
                    <div className="container-fluid">
                        <form className="d-flex">
                        <input className="form-control me-2" 
                                type="search" 
                                aria-label="Recherche"
                                defaultValue = ""
                                onChange={(e)=>{ props.FilteredResults(props.CustomItems, e.target.value)}} />
                        <button className="btn btn-outline-success"  >Recherche</button>
                        </form>
                    </div>
                </nav>
            </div>
            <div className="col-sm">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/main" className="navbar-brand">
                            <img src="img/home.svg" alt="Accueil" width="24" height="24" />
                        </Link>
                        <Link to="/" className="navbar-brand">
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