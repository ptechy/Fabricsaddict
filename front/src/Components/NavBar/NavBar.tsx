import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Product from '../../Models/Products/Product'
import ProductState from '../../Models/Products/ProductState'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import './NavBar.css';

type Props = {
    CustomItems: Product[],
    FilteredResults:  (customItems:Product[], input:string)=> void 
    Filtered: boolean,
    Reload: ()=> void
};
   


const NavBar: FunctionComponent<Props> =  (props) =>{

    // State to store value from the input field
    const [inputValue, setInputValue] = useState("");
    // Input Field handler
    const handleUserInput = (e)=>{ 
        setInputValue( e.target.value);
        props.FilteredResults(props.CustomItems, e.target.value)
    }

    // Reset Input Field handler
    const resetInputField = () => {
        props.Reload()
        props.FilteredResults(props.CustomItems, "")
        setInputValue("");
       
    };

    const items: Product[] = useSelector(
        (state: ProductState) => state.products
      );

    return (
        <Fragment>
        <div className="row fluid">
            <div className="col-sm-3">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <img src="img/logo.png" alt="FabricsAddict" className="img-fluid"  onClick={resetInputField} />  
                    </div>
                </nav>         
            </div>
            <div className="col-sm-3">
                <nav className="navbar navbar-light">
                    <div className="container">
                    <input className="form-control me-2" 
                                type="search" 
                                aria-label="Recherche"
                                value ={inputValue}
                                onChange={handleUserInput} />
                    </div>
                </nav>
            </div>
            <div className="col-sm-3">
                <nav className="navbar navbar-light">
                    <div className="container">
                      <button className="btn btn-outline-success" onClick={handleUserInput}>Recherche</button>        
                    </div>
                </nav>
            </div>
            <div className="col-sm">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
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