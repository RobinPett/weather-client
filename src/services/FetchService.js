/**
 * Fetches data from Game API
 */

export class FetchService {
  #baseUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl
  }

  /**
   * Fetches data from API
   * @param {string} url - The API endpoint to fetch data from.
   * @returns {Promise<Object>} - The data fetched from the API.
   */
  async fetchData(route) {
    const response = await fetch(this.#baseUrl + route)
    if (!response.ok) {
      throw new Error('Failed to fetch data: ' + response.statusText)
    }
    console.log('Fetching data from:', this.#baseUrl + route)
    console.log('Response:', response)
    return await response.json()
  }

  getTemperatureAndHumidity(date) {
    const formattedDate = date.toISOString().split('T')[0] // Format date to YYYY-MM-DD
    return this.fetchData(`/measurements?from=${formattedDate}`)
  }
}