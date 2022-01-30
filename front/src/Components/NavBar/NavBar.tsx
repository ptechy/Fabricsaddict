import React, { Fragment, FunctionComponent } from 'react';
import {  Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import {  useSelector,  } from 'react-redux'
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
                <nav className="navbar navbar-light ">
                    <div className="container">
                        <Link to="/" className="navbar-brands" onClick={() => props.Filtered(false)}>
                        <img src="img/logo3.png" alt="FabricsAddict" className="img-fluid"  /> 
                        </Link> 
                    </div>
                </nav>         
            </div>
            <div className="col-sm-8">
                <nav className="navbar navbar-light containernav">
                    <div className="container">
                        <Link to="/" className="navbar-brands" onClick={() => props.Filtered(false)} >
                            <img src="img/home.svg" alt="Accueil" width="24" height="24"   />  
                            <span className="navbarTitle" >NOS TISSUS</span>
                                                   
                        </Link>
                        <Link to="/Company" className="navbar-brands" onClick={() => props.Filtered(false)} >
                            <img src="img/check-square.svg" alt="Accueil" width="24" height="24"   />  
                            <span className="navbarTitle" >QUI SOMMES NOUS ?</span>                       
                        </Link>
                        <Link to="/Contact" className="navbar-brands">
                        <img src="img/mail.svg" alt="Email" width="24" height="24" />
                        <span className="navbarTitle" >NOUS CONTACTER</span>
                        </Link>
                        <Link to="/Cart" className="navbar-brands" >
                            <img src="img/basket.svg" alt="Email" width="24" height="24" />
                            <span className="navbarTitle" >PANIER</span>
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