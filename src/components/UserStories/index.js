import './index.css'

const UserStories = props => {
  const {eachItem} = props
  const {image} = eachItem
  return (
    <li className="stories-items">
      <img src={image} alt="user story" className="stories-image" />
    </li>
  )
}
export default UserStories
