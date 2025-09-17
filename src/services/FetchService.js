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
    const { from, to } = date
    return this.fetchData(`${this.#baseUrl}/measurements?from=${from}&to=${to}`)
  }

  async getSMHIData(date) {
    let data
    let archivedData

    console.log('Date from: ', date.from, 'Date to: ', date.to)

    const currentDate = new Date().toISOString().split('T')[0]

    console.log('Current date:', currentDate)
    console.log('Requested date:', date)

    if (date.from === currentDate || date.to === currentDate) {
      console.log('Fetching LATEST SMHI data')
      data = await this.fetchData(this.#smhiUrl)
    }

    console.log('Fetching ARCHIVED SMHI data')
    archivedData = await this.fetchData(this.#smhiArchiveUrl)

    console.log('SMHI data:', data)
    console.log('SMHI archived data:', archivedData)

    const combinedSmhiData = {}

    if (data && archivedData) {
      // Check if both data exist with value arrays
      if (Array.isArray(data.value) && Array.isArray(archivedData.value)) {
        console.log('Combining SMHI data and archived data')
        combinedSmhiData.value = [...data.value, ...archivedData.value]
      } else { console.log('One of the SMHI data sets does not have a value array') }
    }

    console.log('Combined SMHI data:', combinedSmhiData)

    // Filter based on date range and entire days
    const fromDate = new Date(date.from + 'T00:00:00Z').getTime()
    const toDate = new Date(date.to + 'T23:59:59Z').getTime()

    console.log('Filtering SMHI data from:', fromDate, 'to:', toDate)

    combinedSmhiData.value = combinedSmhiData.value.filter(item =>
      item.date >= fromDate && item.date <= toDate
    )


    return combinedSmhiData
  }
}