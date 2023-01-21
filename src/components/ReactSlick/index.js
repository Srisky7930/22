import {Component} from 'react'

import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {eachItem} = this.props
    return (
      <Slider {...settings} className="settings-slicks">
        {eachItem.map(eachLogo => {
          const {userId, userName, storyUrl} = eachLogo
          return (
            <li key={userId}>
              <div className="slick-items">
                <img className="logo-image" src={storyUrl} alt="company logo" />
                <h1 className="name"> {userName} </h1>
              </div>
            </li>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
