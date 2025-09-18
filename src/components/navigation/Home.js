/**
 * Home page.
 * 
 * @returns {JSX.Element} - The Home component.
 */
const Home = () => {
  return (
    <div className="home">
      <main>
        <div className="home-hero">
          <div className="hero-text-container">
            <h1 className='hero-text'>Visby</h1>
            <h1 className='hero-text'>Weather</h1>
            <button className="button text-4xl mb-7 mt-7" onClick={() => window.location.href = '/measurements'}>View Data</button>
          </div>
          <h1><b>Welcome to the Visby Weather App!</b></h1>
          <p className="home-text">
            This project aims to give an overview of weather data in Visby based on sensor data and data from SMHI.
            Temperature and Humidity is collected from a DHT22 sensor connected to a Raspberry Pi Pico W microcontroller.
            Temperature data is also fetched from SMHI's open API.
          </p>
          <br />
          <p className="home-text">
            With the dataset I can visualize how temperature and humidity has varied over time and compare indoor and outdoor temperature.
            The data is visualized with a line chart showing temperature and humidity over time.
          </p>
        </div>
        <div className="home-image-container">
          <img className="home-image" src="https://www.bga.se/upload/Prints/utan-ram/VISBY-chalkboard_4796.jpg" alt="Visby" />
        </div>
      </main>
    </div>
  )
}

export default Home