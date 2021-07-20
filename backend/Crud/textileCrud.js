import TextileModel from '../Models/textile'
var randomSentence = require('random-sentence');
 
const categoryEnum =    [{"category":'Lin', "repo":'lin' }, 
                         {"category":'Crèpe', "repo":'crepe'},
                         {"category":'Voile', "repo":'voile'},
                         {"category":'Satin', "repo":'satin'}, 
                         {"category":'Soie', "repo":'soie'}, 
                         {"category":'Dentelle', "repo":'dentelle'}, 
                         {"category":'Jacquard', "repo":'jacquard'}, 
                         {"category":'Lainage', "repo":'lainage'}, 
                         {"category":'Simili Cuir', "repo":'similiCuir'}, 
                         {"category":'Velours', "repo":'velours'}]

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
                            repo: element.repo }
            const fab = new TextileModel(doc)
            console.log(fab)
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
      const categoryIdx = getCategoryByIndex(req.body.category).index
      const doc = {...req.body, index: categoryIdx}
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
    const fabrics = await TextileModel.find({}).limit(50)
    res.status(200).send( getWrap(200, "get fabrics", fabrics) )
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



export const deleteFabrics = async (req, res) => {
  try {
    const fabrics = await TextileModel.findByIdAndDelete(req.params.id)
    if (!fabrics) 
      res.status(404).send('no element found')

    res.status(200).send(getWrap(200, "elements deleted", {}))  
  } catch (error) {
    res.status(404).send(error)
  }
}

export const updateFabrics = async (req, res) => {
  try {
      const fabrics = await TextileModel.findByIdAndUpdate(req.params.id, req.body)
      await fabrics.save()
      res.send(getWrap(200, "update fabric", fabrics))
  } catch (error) {
    res.status(404).send(error)
  }

}
