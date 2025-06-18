/**
 * Fetches data from Game API
 */

import { gql, request } from 'graphql-request'

// TODO Create a class

/**
 * Fetches data from the GraphQL API.
 *  
 * @param {string} query - The GraphQL query to execute.
 * @return {Promise<Object>} - The response from the API.
 * @throws {Error} - If the request fails.
 */
const graphqlFetch = async (query) => {
  try {
    const response = await request(process.env.REACT_APP_BACKEND_URL, query)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Fetches all games from the API.
 * 
 * @returns {Promise<Object>} - The response from the API.
 * @throws {Error} - If the request fails.
 */
export const getAllGames = async () => {
  const query = gql`
    query {
        games {
            title
            release_year
        }
    }
`
  return await graphqlFetch(query)
}

/**
 * Fetches all genres from the API.
 * 
 * @param {number} year 
 * @returns 
 */
export const getGameGenres = async (year) => {
  const query = gql`
    query {
        games(release_year: ${year}) {
            title
            release_year
            genres {
                name
            }
        }
    }
`
  return await graphqlFetch(query)
}

/**
 * Fetches games by year and genre from the API.
 *
 * @param {number} year 
 * @param {String} genre 
 * @param {number} limit 
 * @param {number} page 
 * @returns 
 */
export const getGamesByYearAndGenre = async (year, genre, limit, page) => {
  const query = gql`
    query {
        games(release_year: ${year}, genre: "${genre}", limit: ${limit}, page: ${page}) {
            id
            title
            release_year
            genres {
                name
            }
        },
        totalGames(release_year: ${year}, genre: "${genre}")
    }
`
  return await graphqlFetch(query)
}

/**
 * Fetches platforms from the API.
 *
 * @param {number} year 
 * @returns 
 */
export const getPlatforms = async (year) => {
  const query = gql`
    query {
        games (release_year: ${year}) {
            platforms {
                name
            }
        }
    }
`
  return await graphqlFetch(query)
}

/**
 * Fetches genres and ratings from the API.
 *
 * @param {number} year 
 * @returns 
 */
export const getGenresAndRatings = async (year) => {
  const query = gql`
    query {
        games(release_year: ${year}) {
            title
            genres {
                name
            }
            rating {
                text
            }
        }
    }
`
  return await graphqlFetch(query)
}

/**
 * Fetches ratings from the API.
 *
 * @returns {Promise<Object>} - The response from the API.
 */
export const getRatings = async () => {
  const query = gql`
        query {
            ratings {
                text
            }
        }
    `
  return await graphqlFetch(query)
}