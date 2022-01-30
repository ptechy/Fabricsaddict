import React, { ReactNode, useRef,useState, FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from "redux";
import {resetCart} from '../../State/Actions/ActionCreators'
import ProductState from "../../Models/Products/ProductState";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Product from "../../Models/Products/Product";


const Delivery: FunctionComponent =  () =>{

  const location = useLocation();

  useEffect(() => {

     console.log(JSON.stringify(location.state))
  }, [location]);

  const items:ProductState = location.state as ProductState

    return (
        <>

          <div  style={{ margin: '20px auto'}}>




                <div className="jumbotron text-center">
                  <h1 className="display8">Merci pour votre commande</h1>
                  <hr />
          
                  <p className="lead">
                    <strong>votre commande est en préparation</strong>   
                  </p>
                  <p className="lead">
                    <strong>nous vous livrerons avec les information suivantes :</strong>   
                  </p>
                  <br />
                  
                  <div className="container">
                        <div className="row">
                          <div className="col-sm-3">
                                <div className="row">
                                    <ul className="list-group">
                                      <li className="list-group-item">Adresse de livraison</li>
                          
                                      <li className="list-group-item">
                                        <ul className="list-group flex">
                                          <li className="text-left">{items.customers[0].firstName} {items.customers[0].lastName}</li>
                                        </ul>
                                        <ul className="list-group flex">
                                          <li className="text-left">{items.customers[0].address}</li>
                                        </ul>
                                        <ul className="list-group flex">
                                          <li className="text-left">{items.customers[0].zipCode}, {items.customers[0].city}</li>
                                        </ul>
                                      </li>                                       
                                    </ul>
                                </div>
                          </div>

                          <div className="col">
                                  <table  className="table">
                                    <tbody>
                                    <tr>
                                      <th className="cartTable">Référence</th>
                                      <th className="cartTable">Prix</th>
                                      <th className="cartTable">Quantité</th>
                                      <th className="cartTable">Total</th>
                                    </tr>
                                      {items.products.map((item : Product, index: number) => {
                                        return(
                                          <tr  >
                                          <td>{item.title}</td>
                                          <td>{item.price} €</td>      
                                          <td>{item.quantity}</td>
                                          <td>{(item.quantity *  item.price).toFixed(2)} € </td>                                
                                          </tr> )
                                      })}
                                    </tbody>
                                  </table>
                          </div>


                          <div className="col-sm-3">
                                <div className="row">
                                    <ul className="list-group">
                                      <li className="list-group-item">Commande</li>
                          
                                      <li className="list-group-item">
                                        <ul className="list-group flex">
                                          <li className="text-left">Prix</li>
                                          <li className="text-right">{items.totalBeforeFees} €</li>
                                        </ul>
                                        <ul className="list-group flex">
                                          <li className="text-left">Frais d'expedition</li>
                                          <li className="text-right">{items.fees} €</li>
                                        </ul>
                                      </li>     
                                      <li className="list-group-item ">
                                        <ul className="list-group flex">
                                          <li className="text-left">Total</li>
                                          <li className="text-right">{items.total} €</li>
                                        </ul>
                                      </li>
                                    </ul>
                                </div>
                          </div>

                        </div>
                  </div>


                  
                  <br /> <br />
                      <Link className="btn btn-warning btn-lg" to="/" >
                        Retour à la page d'accueil
                      </Link>
                </div>  
                </div>

        </>
    )

}

export default Delivery