import TextileModel from '../Models/textile'

const categoryEnum =    [{"category":'Coton', "repo":'Coton' }, 
                         {"category":'Coupons de Créateur', "repo":'CouponsDeCreateur'},
                         {"category":'Lin', "repo":'Lin'},
                         {"category":'Taffetas et Soies', "repo":'TaffetasEtSoies'}, 
                         {"category":'Simili cuir', "repo":'SimiliCuir'}, 
                         {"category":'Tissus en lot', "repo":'TissusEnLot'}, 
                         {"category":'Mercerie', "repo":'Mercerie'}, 
                         {"category":'Lainage', "repo":'Lainage'}, 
                         {"category":'Velours', "repo":'Velours'}, 
                         {"category":'Dentelle', "repo":'Dentelle'},
                         {"category":'Wax', "repo":'Wax'}]

const getWrap = ( status,  msg, json ) =>{
 return ({  status: status,
            results: json.length,
            message: msg,
            data: json})
} 


 export const addFabrics = async (req, res) => {
  try {    

      const str  = JSON.stringify(req.body)
      const data = JSON.parse(str)          

      const doc =  {
        footage: data.footage,
        category: data.category,
        title: data.title,
        description: data.description,
        price:data.price,
        repo: data.repo,
        img: data.image
      }

      const fabrics = new TextileModel(doc)
      await fabrics.save()
      res.status(200)
  } catch (error) {
    //  res.status(404).json( error)
  }
}

export const getFabrics = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({up:true}).sort({date:-1}).limit(50)
    res.status(200).send( getWrap(200, "get fabrics", fabrics) )
  } catch (error) {
  //  res.status(404).send(error)
  }
}

export const getActiveProducts = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({up:true}).sort({date:-1}).limit(50)
    res.status(200).send( getWrap(200, "get active fabrics", fabrics) )
  } catch (error) {
  //  res.status(404).send(error)
  }
}

export const getHiddenProducts = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({up:false}).limit(50)
    res.status(200).send( getWrap(200, "get hidden fabrics", fabrics) )
  } catch (error) {
  //  res.status(404).send(error)
  }
}

export const getFabricsByCategory = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({repo:req.params.name})
    res.status(200).send( getWrap(200, "get fabrics by category", fabrics))
  } catch (error) {
 //   res.status(404).send(error)
  }

}

export const getFabric = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({ _id: req.params.id }).limit(1)
    res.send( getWrap(200, "get fabrics by id", fabrics))   
  } catch (error) {
  //  res.status(404).send(error)
  }
}

export const deleteFabric = async (req, res) => {
  try {
    const fabrics = await TextileModel.findByIdAndDelete(req.params.id)
    res.status(200)
  } catch (error) {
   //    res.status(404).send(error)
  }
}

export const updateFabrics = async (req, res) => {
  try {
      const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, req.body)
      await fabrics.save()
      res.status(200)
  } catch (error) {
    //res.status(404).send(error)
  }
}


  export const activateProduct = async (req, res) => {
    try {  
        const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, {up: true})
        await fabrics.save()
        res.status(200)
    } catch (error) {
     // res.status(404).send(error)
    }
  }

  export const hideProduct = async (req, res) => {
    try {  
        const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, {up: false})
        await fabrics.save()
        res.status(200)
    } catch (error) {
  //    res.status(404).send(error)
    }
  }

  export const getTitles = async (req, res) => {
    try {
        res.status(200).send(categoryEnum)
    } catch (error) {
    //  res.status(404).send(error)
    }
  }

