import './index.css'

const UserPosts = props => {
  const {eachItem} = props
  const {image} = eachItem
  return (
    <li className="posts-items">
      <img src={image} alt="user post" className="posts-image" />
    </li>
  )
}
export default UserPosts
