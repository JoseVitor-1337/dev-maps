const { Router } = require("express")

const Dev = require("./controllers/DevController")
const Search = require("./controllers/SearchController")

const routes = Router()

routes.post("/devs", Dev.store)
routes.patch("/devs/:devId", Dev.update)
routes.delete("/devs/:devId", Dev.destroy)
routes.get("/devs", Dev.index)

routes.get("/search", Search.index)

module.exports = routes