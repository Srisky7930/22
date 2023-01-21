import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

class Posts extends Component {
  state = {
    isLiked: true,
    likesStatus: false,
    counter: 0,
  }

  componentDidMount() {
    this.getPostDetails()
  }

  getPostDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {eachFeed} = this.props
    const {postId} = eachFeed
    const {likesStatus} = this.state
    console.log(postId)
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify({like_status: likesStatus}),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  onDisLikeButton = () => {
    this.setState({
      isLiked: false,
    })
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }))
    this.setState(
      {
        likesStatus: false,
      },
      this.getPostDetails,
    )
  }

  onLikeButton = () => {
    this.setState({
      isLiked: true,
    })
    this.setState(prevState => ({
      counter: prevState.counter - 1,
    }))
    this.setState(
      {
        likesStatus: true,
      },
      this.getPostDetails,
    )
  }

  render() {
    const {eachFeed} = this.props
    const {
      profilePic,
      userName,
      userId,

      likesCount,
      createdAt,
      comments,
      postDetails,
    } = eachFeed
    const imageUrl = postDetails.image_url
    const captions = postDetails.caption
    const {isLiked} = this.state
    const {counter} = this.state
    const updateCount = likesCount + counter

    return (
      <li className="feeds-list">
        <div className="profile-pic-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-pic"
          />
          <Link to={`/users/${userId}`} className="user-profile-link">
            <h1 className="profile-pic-username"> {userName} </h1>
          </Link>
        </div>
        <div>
          <img src={imageUrl} alt="post" className="feeds-post-image" />
        </div>
        <div className="like-share-container">
          {isLiked ? (
            <button
              type="button"
              className="like-button"
              onClick={this.onDisLikeButton}
            >
              <BsHeart />
            </button>
          ) : (
            <button
              type="button"
              className="like-button"
              onClick={this.onLikeButton}
            >
              <FcLike />
            </button>
          )}
          <button type="button" className="like-button">
            <FaRegComment />
          </button>
          <button type="button" className="like-button">
            <BiShareAlt />
          </button>
        </div>
        <div className="like-share-container">
          <p className="likes-count"> {updateCount} likes </p>
          <p className="captions"> {captions} </p>
          <ul className="comments-list">
            {comments.map(each => (
              <li key={each.userId}>
                <p className="comment">
                  <span className="comment-name"> {each.userName} </span>
                  {each.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created"> {createdAt} </p>
        </div>
      </li>
    )
  }
}

export default Posts
