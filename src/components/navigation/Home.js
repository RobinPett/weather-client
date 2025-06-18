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
            <h1 className='hero-text'>Game</h1>
            <h1 className='hero-text'>Visualizer</h1>
          </div>
          <h1><b>Welcome to the Game Visualizer!</b></h1>
          <p className="home-text">
            This project aims to give an overview of popular genres and platforms for video games between <b>1970 - 2022.</b>
            <br />
            The dataset stores over 400,000 games with the following data:
          </p>
          <ul className='dataset-attributes'>
            <li>Title</li>
            <li>Release year</li>
            <li>Developers</li>
            <li>Genres</li>
            <li>Platforms</li>
            <li>Rating</li>
          </ul>
          <p className="home-text">
            With the dataset I can visualize how each year has impacted the types of games on the market.
          </p>
          <ul className='dataset-attributes'>
            <li>Which genres were popular?</li>
            <li>Which platforms has dominated?</li>
            <li>How does genres and esrb-ratings correlate?</li>
          </ul>

          <p className="home-text">
            The webapplication visualizes this information with:
          </p>

          <ul className='dataset-attributes'>
            <li>Bar graph - Popular genres</li>
            <li>Pie chart - Dominant platforms</li>
            <li>Heatmap - Frequency of genres and ratings</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Home