const Dev = require("../models/Dev")

const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {
  async index(request, response)  {
    const { latitude, longitude, techs } = request.query

    try {
      const techsArray = parseStringAsArray(techs)

      const devs = await Dev.find({ 
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        }
      })

      return response.json({ devs })
    } catch (error) {
      return response.json({ message: "Não foi possível coletar os devs" })
    }
  }
}