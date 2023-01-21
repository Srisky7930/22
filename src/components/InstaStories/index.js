import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ReactSlick from '../ReactSlick'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class InstaStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    usersStories: [],
  }

  componentDidMount() {
    this.getStoriesData()
  }

  getStories = data => ({
    storyUrl: data.story_url,
    userId: data.user_id,
    userName: data.user_name,
  })

  getStoriesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const userStoriesApi = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userStoriesApi, options)
    const data = await response.json()
    const storiesData = data.users_stories
    const usersStory = storiesData.map(each => this.getStories(each))
    this.setState({
      usersStories: usersStory,
      apiStatus: apiStatusConstants.success,
    })
  }

  getSuccessView = () => {
    const {usersStories} = this.state
    return (
      <ul className="stories-list">
        <ReactSlick eachItem={usersStories} key={usersStories.userId} />
      </ul>
    )
  }

  getLoaderView = () => (
    <div className="loader-container-stories" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  onClickTryButton = () => {
    this.getStoriesData()
  }

  getFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1674219176/alert-triangle_1_xjx2vo.png"
        alt="failure view"
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

  renderStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccessView()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      case apiStatusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="insta-container">{this.renderStories()}</div>
  }
}

export default InstaStories
