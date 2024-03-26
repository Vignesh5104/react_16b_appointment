// Write your code here

import './index.css'

const starUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const starredUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {appointmentDetails, updateStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const callUpdateStarred = () => {
    updateStarred(id)
  }

  const starImgUrl = isStarred ? starredUrl : starUrl

  return (
    <li className="each-appointment">
      <div className="text-con">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button type="button" data-testid="star" onClick={callUpdateStarred}>
        <img className="star-img" src={starImgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
