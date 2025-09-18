/**
 * Fetches data from Game API
 */

export class FetchService {
  #baseUrl
  #smhiUrl
  #smhiArchiveUrl
  #timeZone = 'Europe/Stockholm'

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
    const stockholmMidnight = new Date(new Date(date + 'T00:00:00').toLocaleString('en-US', { timeZone: this.#timeZone }));
    const from = stockholmMidnight.toISOString();
    console.log(`Fetching temperature and humidity data from: ${this.#baseUrl}/measurements?from=${from}`)
    return this.fetchData(`${this.#baseUrl}/measurements?from=${from}`)
  }

  async getSMHIData(date) {
    let data
    const currentDate = new Date().toISOString().split('T')[0]
    const startOfDay = new Date(new Date(date + 'T00:00:00').toLocaleString('en-US', { timeZone: this.#timeZone })).getTime();
    const endOfDay = new Date(new Date(date + 'T23:59:59').toLocaleString('en-US', { timeZone: this.#timeZone })).getTime();

    if (date && date === currentDate) {
      data = await this.fetchData(this.#smhiUrl)
    } else if (date) {
      data = await this.fetchData(this.#smhiArchiveUrl)
    }

    // Filter archived data to match the requested date
    data = data.value.filter(item =>
      item.date >= startOfDay && item.date <= endOfDay
    )

    return data
  }
}