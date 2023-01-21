import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1673234889/Layer_1_tt0pnf.png"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading"> PAGE NOT FOUND </h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <div>
      <button type="button" className="home-button">
        <Link to="/" className="link-item">
          Home Page
        </Link>
      </button>
    </div>
  </div>
)

export default NotFound
