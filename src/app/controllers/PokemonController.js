const fs = require('fs')
const {getPokemon, getEvolutions} = require('../services/PokemonService')
const Generations = require('../../utils/generations')

function getEvolutionsFormatted(evolution) {
    const chain = evolution?.chain
    if (!evolution?.chain) {
        return []
    }
    let chainArr = []
    chainArr.push({
        id: (chain.species?.url.split('/')[6]) ? parseInt((chain.species?.url.split('/')[6])) : null,
        order: 1,
        name: chain.species?.name
    })
    if (chain.evolves_to.length > 0) {
        chainArr.push({
            id: chain.evolves_to[0].species?.url.split('/')[6] ? parseInt(chain.evolves_to[0].species?.url.split('/')[6]) : null,
            order: 2,
            name: chain.evolves_to[0].species?.name,
        })
        if (chain.evolves_to[0].evolves_to.length > 0) {
            chainArr.push({
                id: chain.evolves_to[0].evolves_to[0].species?.url.split('/')[6] ? parseInt(chain.evolves_to[0].evolves_to[0].species?.url.split('/')[6]) : null,
                order: 3,
                name: chain.evolves_to[0].evolves_to[0].species?.name,
            })
        }
    }

    return chainArr
}

async function fetchAllPokemons(req, res) {
    try {
        let pokemons = []
        const genID = req.params?.genID
        let ids = Generations[`generation${genID}`]()

        for (let id of ids) {
            const pokemon = await getPokemon(id)
            const evolutions = await getEvolutions(pokemon.species?.url)
            const newPokemon = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites?.other?.home?.front_default ?? "",
                weight: pokemon.weight,
                height: pokemon.height,
                types: pokemon.types?.map(t => t.type.name),
                abilities: pokemon.abilities?.map(a => a.ability?.name),
                evolution: getEvolutionsFormatted(evolutions)
            }
            pokemons.push(newPokemon)
        }

        if (!pokemons) {
            return res.status(404).json({
                error: 'Pokemons não encontrados'
            })
        }

        // Criar um arquivo .json com pokemons
        try {
            // Salvar os dados em um arquivo JSON chamado "pokemons.json"
            fs.writeFileSync(`pokemons_gen${genID}.json`, JSON.stringify(pokemons, null, 2));
            console.log('Arquivo pokemons.json criado com sucesso.');
        } catch (error) {
            console.error('Erro ao criar o arquivo:', error);
            return res.status(500).json({
                error: 'Erro ao criar o arquivo JSON'
            });
        }
        return res.json(pokemons)
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return res.status(500).json({
            error: 'Erro ao buscar dados'
        })
    }
}

async function fetchAllPokemonsCached(req, res) {
    try {
        let genIDs = req.query?.genIDs ? JSON.parse(req.query?.genIDs) : []

        let pokemons = []

        if (!genIDs || genIDs.length === 0) {
            genIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }

        for (let id of genIDs) {
            if (id > 9 || id < 1) return;
            pokemons.push(...(require(`../../../pokemons_gen${id}.json`)))
        }

        return res.json(pokemons)
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return res.status(500).json({
            error: 'Erro ao buscar dados'
        })
    }
}

module.exports = {fetchAllPokemons, fetchAllPokemonsCached}
