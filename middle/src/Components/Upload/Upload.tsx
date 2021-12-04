import React, {  FunctionComponent,useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useHistory} from "react-router-dom";
import axios from 'axios'
import env from "react-dotenv"
import Category from '../../Models/Fabric/Category'

type Props = {
  Categories: Category[]
};

 
 const Upload: FunctionComponent<Props> =  (props) =>{
  
     const defaultVal =`${ props.Categories[0]}-${ props.Categories[0]}`

    // form validation rules 
    const validationSchema = Yup.object().shape({ })

    const history          = useHistory();
    const formOptions      = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState: { errors }} = useForm(formOptions)  
    
    const root_url         = `${env.SERVER_ADDR}:${env.API_PORT}`
    const base_api         = `${root_url}/${env.API_BASE_URL}`
    const order_url        = `${base_api}/fabrics`

    const [repoCat, setRepoCat] = useState(defaultVal)
    const [category, setCategory] = useState('Coton')
    const [repo, setRepo]         = useState('Coton')
    const [footage, setFootage]   = useState('m')
  

    const handleRepo = (item:string) =>{
      const data =  item.split('-')
      console.log("data:" + JSON.stringify(data))      
      setRepo(data[0])
      setCategory(data[1])
      setRepoCat(item)
    }

    const doUpload = async (items) => {
      await  axios.post(order_url,items)
                  .then((res) => { console.log(res.data)})
                  .catch((error) => { console.log(error)  });

    }


    const onSubmit = (item: any) => {      
     
      const data =  {...item,...{ "category": category}, ...{ "repo": repo}, ...{"footage":footage} } 
      console.log("data:" + JSON.stringify(item))      
      doUpload(data)
      history.push("/main")

    }






    return (
        <>
            <section className="section-content padding-y" style={{ margin: '50px auto', maxWidth: '720px' }}>
                <div className="container" >
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                                <div className="col">
                                <p >Image</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                     {...register('image')}                                    
                                    defaultValue="" 
                                  />
                                   <p >{errors.image?.message}</p>
                                </div>

                                <div className="col">
                                <p >Category</p>
                                  <select className="bootstrap-select" value={repoCat} onChange={event => handleRepo(event.target.value)}  >
                                      { props.Categories.map((item:Category, index:number) =>{
                                        const val = `${item.repo}-${item.category}`
                                        return   <option value={val}  key={index} >{item.repo}</option>
                                      }) } 
                                  </select>
                                  
                                </div>
                              </div>

  
                              <div className="form-group">
                              <p >Title</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('title')}   
                                />
                                <p >{errors.title?.message}</p>
                              </div>
     
                              <div className="form-group">
                              <p >Description</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register('description')}
                                  defaultValue=""                />
                              </div>
                              <p >{errors.description?.message}</p>


                              <div className="col">
                                <p >Footage</p>                                                    
                                  <select className="bootstrap-select" value={footage}  onChange={event => setFootage(event.target.value)} >
                                      <option value="m" >m</option>
                                      <option value="coupon">coupon</option>
                                  </select>

                              </div>

                              <div className="col">
                                <p >Price</p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    {...register('price')}
                                    defaultValue=""         
                                  />
                                <p >{errors.price?.message}</p>
                              </div>                             
                              <input type="submit" />
                  </form>
                        
                </div> 
            </section>
        </>
    )
  }


export default Upload