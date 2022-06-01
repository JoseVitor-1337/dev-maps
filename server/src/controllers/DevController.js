const axios = require("axios")
const Dev = require("../models/Dev")

const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
  async store(request, response)  {
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ github_username})
  
    try {
      if (dev) throw Error(`Dev ${dev.github_username} já foi cadastrado`)

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

      console.log(`apiResponse`, apiResponse)
  
      const { name = login, avatar_url, bio = "" } = apiResponse.data
  
      const techsArray = parseStringAsArray(techs)
      
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      }
  
      dev = await Dev.create({ github_username, name, avatar_url, bio, techs: techsArray, location })
  
      return response.json(dev)
  
    } catch (error) {
      return response.json({ message: error.message || "Usuário do github não encontrado" })
  
    }
  },

  async update(request, response)  {
    const { devId } = request.params
    const { name, avatar_url, bio, techs } = request.body

    try {
      let dev = await Dev.findById(devId)

      if (!dev) throw Error("Não existe nenhum dev com este ID")

      const techsArray = parseStringAsArray(techs)
   
      newDev = await Dev.findByIdAndUpdate(devId, { name, avatar_url, bio, techs: techsArray }, { new: true})
  
      return response.json(newDev)
  
    } catch (error) {
      return response.json({ message: error.message || "Usuário não encontrado" })
  
    }
  },

  async destroy(request, response)  {
    const { devId } = request.params

    try {
      let dev = await Dev.findById(devId)

      if (!dev) throw Error("Não existe nenhum dev com este ID")
   
      await Dev.findByIdAndDelete(devId)
  
      return response.json({ message: `${dev.name} foi removido do banco de dados.`})
  
    } catch (error) {
      return response.json({ message: error.message || "Usuário não encontrado" })
  
    }
  },

  async index(request, response)  {

    try {
      const devs = await Dev.find()
      
      return response.json(devs)
  
    } catch (error) {
      return response.json({ message: "Não foi possível coletar os devs" })
    }
  }
}