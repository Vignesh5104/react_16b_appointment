// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    inputTitle: '',
    inputDate: '',
    starred: false,
  }

  updateTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  updateDate = event => {
    this.setState({inputDate: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const formattedDate = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title: inputTitle,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  updateStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  updateStarredStatus = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  getStarredAppointments = () => {
    const {appointmentsList, starred} = this.state
    if (starred === true) {
      const filteredList = appointmentsList.filter(
        each => each.isStarred === true,
      )
      return filteredList
    }
    return appointmentsList
  }

  render() {
    const {appointmentsList, inputTitle, inputDate, starred, starredList} =
      this.state

    const filteredList = this.getStarredAppointments()

    const list = starred ? starredList : appointmentsList
    const starredClsName = starred ? 'starred-btn' : ''

    return (
      <div className="bgcon">
        <div className="card">
          <div className="top-con">
            <h1 className="main-head">Add Appointment</h1>
            <div className="form-img-con">
              <img
                className="main-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
              <form onSubmit={this.addAppointment}>
                <label className="label" htmlFor="inp">
                  TITLE
                </label>
                <input
                  onChange={this.updateTitle}
                  value={inputTitle}
                  placeholder="Title"
                  id="inp"
                />
                <label className="label" htmlFor="text">
                  DATE
                </label>
                <input
                  type="date"
                  onChange={this.updateDate}
                  value={inputDate}
                  cols="10"
                  rows="8"
                  placeholder="dd/mm/yyyy"
                  id="text"
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <hr />
          </div>

          <div className="bot-con">
            <div className="starred-con">
              <h1 className="bot-head">Appointments</h1>
              <button
                onClick={this.updateStarredStatus}
                className={`star-btn ${starredClsName}`}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredList.map(each => (
                <AppointmentItem
                  updateStarred={this.updateStarred}
                  appointmentDetails={each}
                  key={each.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
