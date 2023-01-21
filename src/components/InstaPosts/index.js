import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Posts from '../Posts'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class InstaPosts extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homePage: [],
  }

  componentDidMount() {
    this.getPostsData()
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

  getPostsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const homeData = data.posts
      const homePage = homeData.map(each => this.getProfilePosts(each))
      this.setState({
        homePage,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomePage = () => {
    const {homePage} = this.state
    return (
      <div className="home-container">
        <ul className="home-feeds-list">
          {homePage.map(each => (
            <Posts eachFeed={each} key={each.postId} />
          ))}
        </ul>
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickTryButton = () => {
    this.getPostsData()
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

  renderHomeDataPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomePage()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      case apiStatusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-main-container">{this.renderHomeDataPage()}</div>
      </>
    )
  }
}

export default InstaPosts
