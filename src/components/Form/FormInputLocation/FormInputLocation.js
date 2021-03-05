import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import location from '../../../assets/icon/ic_location.png'
import { connect } from 'react-redux'
import { listLocation } from '../../../redux/actions/cinema'

import './FormInputLocation.scss'

class FormInputLocation extends Component {
  async componentDidMount () {
    await this.props.listLocation()
  }

  render () {
    return (
      <Form.Group>
        <div className="form-outline-location">
          <img src={location} alt="icon-location" />
          <Form.Control as="select" custom className="form-select" name="location" onChange={(event) => this.props.data(event)}>
            <option>Location....</option>
            {this.props.cinema.location !== null &&
              this.props.cinema.location.map((item, index) => {
                return (
                  <React.Fragment key={String(index)}>
                    <option value={item}>{item}</option>
                  </React.Fragment>
                )
              })
            }
          </Form.Control>
        </div>
      </Form.Group>
    )
  }
}

const mapStateToProps = state => ({
  cinema: state.cinema
})

const mapDispatchToProps = { listLocation }

export default connect(mapStateToProps, mapDispatchToProps)(FormInputLocation)
