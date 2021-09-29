import TextileModel from '../Models/textile'
var randomSentence = require('random-sentence');
 
const categoryEnum =    [{"category":'Coton', "repo":'Coton' }, 
                         {"category":'Coupons de Créateur', "repo":'CouponsDeCreateur'},
                         {"category":'Lin', "repo":'Lin'},
                         {"category":'Taffetas et Soies', "repo":'TaffetasEtSoies'}, 
                         {"category":'Simili cuir', "repo":'SimiliCuir'}, 
                         {"category":'Tissus en lot', "repo":'TissusEnLot'}, 
                         {"category":'Mercerie', "repo":'Mercerie'}, 
                         {"category":'Lainage', "repo":'Lainage'}, 
                         {"category":'Velours', "repo":'Velours'}, 
                         {"category":'Dentelle', "repo":'Dentelle'}]

const getWrap = ( status,  msg, json ) =>{
 return ({  status: status,
            results: json.length,
            message: msg,
            data: json})
} 

const getDecimal = ()=>{
  return  ((Math.random() * 8 + 1 + Math.random())*7).toFixed(2) 
}


const getCategoryByIndex = (value) => {
  return  categoryEnum.Map((item, idx) => ({"index": idx,"category": item}))
                      .filter(z=>  value.toLowerCase() !== item.toLowerCase())
}

const record =  (data) =>{
      data.map((element, idx) => {
            const foot = (idx % 2) ? "m" : "coupon"
            const pr = getDecimal().toString()
            const qty =  (idx % 2) ? idx:  idx*3
            const doc = {   category: element.category,
                            title: randomSentence({words: 5}),
                            description: randomSentence({words: 20}),
                            price: pr,
                            quantity:qty,
                            footage: foot,
                            img: "azerty",
                            repo: element.category }
            const fab = new TextileModel(doc)
            fab.save()
      });  
}

export const addDefault = (req, res) => {
  try {  
    record( categoryEnum)      
    res.status(200).json({"status":"ok"})   
  } catch (error) {
      res.status(404).json( error)
  }
}



 export const addFabrics = async (req, res) => {
  try {    

      const str = JSON.stringify(req.body)
      const data =JSON.parse(str)          

      const doc =  {
                    footage: data.footage,
                    category: data.category,
                    title: data.title,
                    description: data.description,
                    price:data.price,
                    repo: data.repo,
                    img: data.image
                }

       console.log(doc)
      const fabrics = new TextileModel(doc)
      await fabrics.save()
      res.status(200).json( getWrap(200, "add fabrics", fabrics))
  } catch (error) {
      res.status(404).json( error)
  }
}



 export const getTitles = async (req, res) => {
  try {
      res.status(200).send(categoryEnum)
  } catch (error) {
    res.status(404).send(error)
  }
}


export const getFabrics = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({}).sort({date:-1}).limit(50)
    res.status(200).send( getWrap(200, "get fabrics", fabrics) )
  } catch (error) {
    res.status(404).send(error)
  }
}

export const getActiveProducts = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({up:true}).limit(50)
    res.status(200).send( getWrap(200, "get active fabrics", fabrics) )
  } catch (error) {
    res.status(404).send(error)
  }
}

export const getHiddenProducts = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({up:false}).limit(50)
    res.status(200).send( getWrap(200, "get hidden fabrics", fabrics) )
  } catch (error) {
    res.status(404).send(error)
  }
}

export const getFabricsByCategory = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({repo:req.params.name})
    res.status(200).send( getWrap(200, "get fabrics by category", fabrics))
  } catch (error) {
    res.status(404).send(error)
  }

}

export const getFabric = async (req, res) => {
  try {
    const fabrics = await TextileModel.find({ _id: req.params.id }).limit(1)
    res.send( getWrap(200, "get fabrics by id", fabrics))   
  } catch (error) {

    res.status(404).send(error)
  }

}

export const deleteFabric = async (req, res) => {
  try {
    console.log("delete id: " + req.params.id)
    const fabrics = await TextileModel.findByIdAndDelete(req.params.id)
    if (!fabrics) 
      res.status(404).send('no element found')

    res.status(200).send(getWrap(200, "elements deleted", {}))  
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

export const updateFabrics = async (req, res) => {
  try {

    console.log("id: " + req.params.id)
    console.log("body: " + JSON.stringify(req.body))
      const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, req.body)
      await fabrics.save()
      res.send(getWrap(200, "update fabric", fabrics))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}


  export const activateProduct = async (req, res) => {
    try {
  
      console.log("activation: " + req.params.id)
      console.log("body: " + JSON.stringify(req.body))
        const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, {up: true})
        await fabrics.save()
        res.send(getWrap(200, "activate product", fabrics))
    } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }
  }

  export const hideProduct = async (req, res) => {
    try {
  
      console.log("hide: " + req.params.id)
      console.log("body: " + JSON.stringify(req.body))
        const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, {up: false})
        await fabrics.save()
        res.send(getWrap(200, "hide prouct", fabrics))
    } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }
  }

