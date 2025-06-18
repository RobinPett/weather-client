import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/navigation/Home.js'
import Navbar from './components/navigation/Navbar.js'
import NotFound from './components/info/NotFound.js'
import { Toaster } from 'sonner'
import Footer from './components/navigation/Footer.js'
import ScrollToTop from './components/navigation/ScrollToTop.js'
import Platforms from './components/navigation/Platforms.js'
import Genres from './components/navigation/Genres.js'
import RatingsVsGenre from './components/navigation/RatingsVsGenres.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <ScrollToTop>
            <Routes>
              <Route path='/genres' element={<Genres />}></Route>
              <Route path='/platforms' element={<Platforms />}></Route>
              <Route path='/ratings-vs-genres' element={<RatingsVsGenre />}></Route>
              <Route path='/' element={<Home />}></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </ScrollToTop>
        </div>
        <Footer />
        <Toaster closeButton richColors position='top-center' expand={true} />
      </div>
    </Router>
  )
}

export default App;
