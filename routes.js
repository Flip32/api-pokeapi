const express = require('express')

express().use(express.json())
express().use(express.urlencoded({ extended: true }))

const routes = express.Router()

const PokemonController = require('./src/app/controllers/PokemonController.js')
const VercelBlobController = require('./src/app/controllers/VercelBlobController.js')

routes.get('/pokemons/:genID', PokemonController.fetchAllPokemons)
routes.get('/cached', PokemonController.fetchAllPokemonsCached)
routes.delete('/img/:imageKey(*)', VercelBlobController.deleteImgVercelBlob)
module.exports = routes
