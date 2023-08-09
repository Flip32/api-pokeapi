/**
 * @swagger
 * /cached:
 *   get:
 *     summary: Get cached pokemons
 *     description: Get an array of cached pokemons. You can optionally filter by genIDs.
 *     parameters:
 *       - in: query
 *         name: genIDs
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *             minimum: 1
 *             maximum: 9
 *         style: form
 *         explode: true
 *         description: Array of genIDs (1-9) to filter pokemons.
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */

/**
 * @swagger
 * /pokemons/{genID}:
 *   get:
 *     summary: Get pokemons from pokeapi
 *     description: This endpiont will get a Generation pokemons, one by one on pokeapi, and return an array.
 *     parameters:
 *       - in: path
 *         name: genID
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 9
 *         description: Generation ID (1-9) to filter pokemons.
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */


// Definitions
/**
 * @swagger
 * definitions:
 *   Pokemon:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Pokemon ID
 *       name:
 *         type: string
 *         description: Pokemon name
 *       image:
 *         type: string
 *         description: URL of Pokemon's image
 *       weight:
 *         type: integer
 *         description: Pokemon's weight
 *       height:
 *         type: integer
 *         description: Pokemon's height
 *       types:
 *         type: array
 *         items:
 *           type: string
 *         description: Array of Pokemon's types
 *       abilities:
 *         type: array
 *         items:
 *           type: string
 *         description: Array of Pokemon's abilities
 *       evolution:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             order:
 *               type: integer
 *             name:
 *               type: string
 *         description: Array of Pokemon's evolution stages
 */
