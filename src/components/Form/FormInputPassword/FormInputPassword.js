import React, { Component } from "react";
import { Form } from "react-bootstrap";

import "./FormInputPassword.scss";

class FormInputPassword extends Component {
  state = {
    isPasswordShown: false,
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  render() {
    const { isPasswordShown } = this.state;
    return (
      <Form.Group>
        <Form.Label>{this.props.children}</Form.Label>
        <Form.Control
          name={this.props.name}
          type={isPasswordShown ? "text" : "password"}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          required
        />
        <i
          className={`fa ${
            isPasswordShown ? "fa-eye-slash" : "fa-eye"
          } password-icon`}
          onClick={this.togglePasswordVisiblity}
        ></i>
      </Form.Group>
    );
  }
}

export default FormInputPassword;
