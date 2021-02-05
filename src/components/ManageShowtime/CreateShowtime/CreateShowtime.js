import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import ebvId from '../../../assets/images/ebv_id.png'
import cineOne21 from '../../../assets/images/CineOne21.png'
import hiflix from '../../../assets/images/hiflix.png'
import FormInputLocation from '../../Form/FormInputLocation/FormInputLocation'
import FormInputTime from '../../Form/FormInputTime/FormInputTime'
import Button from '../../Button/Button'
import FormInputText from '../../Form/FormInputText/FormInputText'

export default class CreateShowtime extends Component {
  render() {
    return (
      <>
      <Form>
      <h1>Create Showtime</h1>
        <Row>
          <Col md={6}>
            <FormInputText
                type="text"
                placeholder="Write your name movie"
              >
                Movie
            </FormInputText>
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
            <FormInputLocation />
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <FormInputTime />
            <Row>
            <Col md={12}>
              <Row>
                <Col md={3} xs={3}>
                  <Button className="outline-primary px-4">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </Button>
                </Col>
                <Col md={3} xs={3}>
                  <p>08:30am</p>
                </Col>
                <Col md={3} xs={3}>
                  <p>08:30am</p>
                </Col>
                <Col md={3} xs={3}>
                  <p>08:30am</p>
                </Col>
                <Col md={3} xs={3}>
                  <p>08:30am</p>
                </Col>
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
