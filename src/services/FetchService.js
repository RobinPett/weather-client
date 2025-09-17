/**
 * Fetches data from Game API
 */

export class FetchService {
  #baseUrl
  #smhiUrl
  #smhiArchiveUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl
    this.#smhiUrl = 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/78400/period/latest-day/data.json'
    this.#smhiArchiveUrl = 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/78400/period/latest-months/data.json'
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

  async getSMHIData(date) {
    let data
    
    if (date) {
      console.log('Fetching SMHI data for date range:', date)
      data = await this.fetchData(this.#smhiArchiveUrl)
    } else {
      console.log('Fetching latest SMHI data')
      data = await this.fetchData(this.#smhiUrl)
    }
    
    if (date && date.from && date.to) {
      // Filter based on date range
      const fromDate = new Date(date.from).getTime()
      const toDate = new Date(date.to).getTime()
      data.value = data.value.filter(item =>
        item.date >= fromDate && item.date <= toDate
      )
    }
    return data
  }
}