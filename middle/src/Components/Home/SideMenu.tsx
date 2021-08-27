import React, {  FunctionComponent } from 'react';
import Category from '../../Models/Fabric/Category'
    type Props = {
        Titles: Category[],
        LoadCategory: (repo:string)=> void
   };

   const SideMenu: FunctionComponent<Props> =  (props) =>{
      return (
       
        <div className="list-group">
            { props.Titles.map((item:Category, index:number) =>{
                return(  <button type="button" 
                                 className="list-group-item list-group-item-action"
                                 onClick = {() =>{ props.LoadCategory(item.repo)} }
                                 key={index}  >  
                                {item.category}  
                          </button>
                     )
            }) } 
        </div>

    )
}

export default SideMenu;