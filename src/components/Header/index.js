import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearch: false,
  }

  onClickSearchButton = () => {
    const {onClickSearchButton} = this.props
    onClickSearchButton()
  }

  onClickMenuButton = () => {
    this.setState({
      showMenu: true,
    })
  }

  onClickCloseButton = () => {
    this.setState({
      showMenu: false,
    })
  }

  onClickSearch = () => {
    this.setState({
      showSearch: true,
    })
  }

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(event.target.value)
  }

  render() {
    const {showMenu, showSearch} = this.state
    return (
      <>
        <nav className="navbar">
          <ul className="website-logo-container">
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1672733292/Standard_Collection_8_hkeehs.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
            <li>
              <h1 className="logo-heading"> Insta Share</h1>
            </li>
          </ul>
          <button
            type="button"
            className="menu-button"
            onClick={this.onClickMenuButton}
          >
            <GiHamburgerMenu className="menu" />
          </button>

          <ul className="link-list-items">
            <div className="button-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="button-logo"
                onClick={this.onClickSearchButton}
              >
                <FaSearch alt="searchIcon" />
              </button>
            </div>

            <Link to="/" className="link-item">
              <li>
                <p> Home </p>
              </li>
            </Link>

            <Link to="/my-profile" className="link-item">
              <li>
                <p> Profile</p>
              </li>
            </Link>

            <li>
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogoutButton}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {showMenu && (
          <div>
            <ul className="small-link-items">
              <Link to="/" className="link-item">
                <li>
                  <p> Home </p>
                </li>
              </Link>

              <li>
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearch}
                >
                  Search
                </button>
              </li>

              <Link to="/my-profile" className="link-item">
                <li>
                  <p> Profile </p>
                </li>
              </Link>

              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogoutButton}
                >
                  Logout
                </button>
              </li>

              <button
                type="button"
                className="close-button"
                onClick={this.onClickCloseButton}
              >
                <AiFillCloseCircle className="close-logo" />
              </button>
            </ul>
            {showSearch && (
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search Caption"
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="button-logo"
                  onClick={this.onClickSearchButton}
                >
                  <FaSearch />
                </button>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
