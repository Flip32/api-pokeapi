const axios = require('axios')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

async function getPokemon(id) {
    try {
        const response = await axios.get(baseUrl + '/' + id);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

async function getEvolutions(url) {
    try {
        const responseSpecies = await axios.get(url);
        const species = responseSpecies.data;

        if (!species.evolution_chain) {
            throw new Error('Não foi possível encontrar a cadeia de evolução');
        }

        const response = await axios.get(species.evolution_chain.url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

module.exports = {getPokemon, getEvolutions}
