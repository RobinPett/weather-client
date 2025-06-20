/**
 * Fetches data from Game API
 */

export class FetchService {
  #baseUrl
  #smhiUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl
    this.#smhiUrl = 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/78400/period/latest-day/data.json'
  }

  /**
   * Fetches data from API
   * @param {string} url - The API endpoint to fetch data from.
   * @returns {Promise<Object>} - The data fetched from the API.
   */
  async fetchData(url) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data: ' + response.statusText)
    }
    console.log('Fetching data from:', url)
    console.log('Response:', response)
    return await response.json()
  }

  getTemperatureAndHumidity(date) {
    const {from, to} = date
    return this.fetchData(`${this.#baseUrl}/measurements?from=${from}&to=${to}`)
  }

  async getSMHIData() {
    const response = await fetch(this.#smhiUrl)
    if (!response.ok) {
      throw new Error('Invalid SMHI data format')
    }
    return await response.json()
  }
}