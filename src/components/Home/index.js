import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import Posts from '../Posts'

import InstaStories from '../InstaStories'
import InstaPosts from '../InstaPosts'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchResults: {},
    searchInput: '',
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const apiSearchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiSearchUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const searchItems = data.posts
      const searchResults = searchItems.map(each => this.getProfilePosts(each))
      this.setState({
        searchResults,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfilePosts = data => ({
    profilePic: data.profile_pic,
    userName: data.user_name,
    userId: data.user_id,
    postId: data.post_id,
    likesCount: data.likes_count,
    comments: data.comments.map(each => ({
      comment: each.comment,
      userId: each.user_id,
      userName: each.user_name,
    })),
    createdAt: data.created_at,
    postDetails: data.post_details,
  })

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput,
    })
  }

  onClickSearchButton = () => {
    this.getSearchResults()
  }

  getSearchSuccessView = () => {
    const {searchResults} = this.state
    const showResults = searchResults.length > 0
    return (
      <div>
        {showResults ? (
          <div className="home-container">
            <h1 className="search-heading"> Search Results </h1>
            <ul className="home-feeds-list">
              {searchResults.map(each => (
                <Posts eachFeed={each} key={each.user_id} />
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <img
              src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1673337083/Group_1_qffjb9.png"
              alt="search not found"
              className="search-not-found-image"
            />
            <p className="search-not-found-heading"> Search not found </p>
            <p className="search-not-found-para">
              Try different keywords or search again
            </p>
          </div>
        )}
      </div>
    )
  }

  getSearchLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryButton = () => {
    this.getSearchResults()
  }

  getSearchFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1673234871/Group_7522_yxgexf.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-msg"> Something went wrong. Please try again </p>
      <button
        type="button"
        className="try-button"
        onClick={this.onClickTryButton}
      >
        Try again
      </button>
    </div>
  )

  renderSearchDataPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSearchSuccessView()
      case apiStatusConstants.inProgress:
        return this.getSearchLoaderView()
      case apiStatusConstants.failure:
        return this.getSearchFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const showSearchPage = searchInput === ''

    return (
      <>
        <Header
          onChangeSearchInput={this.onChangeSearchInput}
          onClickSearchButton={this.onClickSearchButton}
        />

        <div>
          {showSearchPage ? (
            <div className="home-main-container">
              <InstaStories />
              <InstaPosts />
            </div>
          ) : (
            <div className="home-main-container">
              {this.renderSearchDataPage()}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Home
