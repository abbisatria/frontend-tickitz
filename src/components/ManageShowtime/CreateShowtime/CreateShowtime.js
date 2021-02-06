import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import {cinemaLocation} from '../../../redux/actions/showtime'

import FormInputLocation from '../../Form/FormInputLocation/FormInputLocation'
import FormInputTime from '../../Form/FormInputTime/FormInputTime'
import Button from '../../Button/Button'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Select from 'react-select'
import moment from 'moment'

class CreateShowtime extends Component {
  state = {
    time: '',
    selectTime: [],
    selectCinema: [],
    cinema: [],
    location: ''
  }

  options = [
    {label: 'Avengers', value: 1 },
    {label: 'Start Up', value: 2 },
    {label: 'The Lion King', value: 3 },
    {label: 'Alladin', value: 4 },
    {label: 'Spiderman', value: 5 },
    {label: 'aBC', value: 6 },
    {label: 'Start', value: 7 },
    {label: 'King', value: 8 },
    {label: 'Adin', value: 9 },
    {label: 'Spiman', value: 10 },
  ]

  selectedTime = (id) => {
    const { selectTime } = this.state
      selectTime.push(id)
      this.setState({
        selectTime: selectTime
      })
  }

  selectedCinema = (id) => {
    const { selectCinema } = this.state;
    let newArray = [];
    if (selectCinema.indexOf(id) === -1) {
      selectCinema.push(id);
      newArray = selectCinema;
    } else {
      newArray = selectCinema.filter((item) => item !== id);
    }
    this.setState({
      selectCinema: newArray,
    });
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value }, async () => {
      if(this.state.location !== '') {
        const { location } = this.state
        await this.props.cinemaLocation(location)
      }
    });
  };

  render() {
    return (
      <>
      <Form>
      <h1>Create Showtime</h1>
        <Row>
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Movie</Form.Label>
              {Object.keys(this.options).length > 0 && <Select options={this.options} placeholder="Select your movie" />}
            </Form.Group>
          </Col>
          <Col md={6}>
            <FormInputText
                type="date"
              >
                Showtime Date
            </FormInputText>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormInputLocation data={this.changeText} />
            <Row>
              <Col md={12}>
                <Row>
                  {this.state.location !== '' && this.props.showtime.results.map((item, index) => {
                    return (
                      <Col md={4} xs={4} key={String(index)}>
                        <label>
                          <input type="checkbox" name="cinema" onClick={() => this.selectedCinema(item.id)} />
                          <div className="cinema">
                            <img src={`http://localhost:5000/uploads/cinemas/${item.image}`} alt={item.name} />
                          </div>
                        </label>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <FormInputTime name="time" onChange={(event) => this.changeText(event)} />
            <Row>
            <Col md={12}>
              <Row>
                <Col md={3} xs={3}>
                  <Button className="outline-primary px-4" onClick={() => this.selectedTime(this.state.time)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </Button>
                </Col>
                {this.state.selectTime && this.state.selectTime.map((item, index) => {
                  return(
                    <Col md={3} xs={3} key={String(index)}>
                      <p>{moment(item, "HH:mm:ss").format("hh:mm A")}</p>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
          </Col>
        </Row>
        <Button className="btn btn-primary">Save</Button>
      </Form>
      </>
    )
  }
}

const mapStateToProps = state =>({
  showtime: state.showtime
})

const mapDispatchToProps = {cinemaLocation}

export default connect(mapStateToProps, mapDispatchToProps)(CreateShowtime)
