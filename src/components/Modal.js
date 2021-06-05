import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="app-username">username</Label>
              <Input
                type="text"
                id="app-username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="app-lastname">lastname</Label>
              <Input
                type="text"
                id="app-lastname"
                name="lastname"
                value={this.state.activeItem.lastname}
                onChange={this.handleChange}
                placeholder="Enter lastname"
              />
            </FormGroup>
            <FormGroup>
              <Label for="app-age">age</Label>
              <Input
                type="text"
                id="app-age"
                name="age"
                value={this.state.activeItem.age}
                onChange={this.handleChange}
                placeholder="Enter age"
              />
            </FormGroup>
            <FormGroup>
              <Label for="app-weight">weight</Label>
              <Input
                type="text"
                id="app-weight"
                name="weight"
                value={this.state.activeItem.weight}
                onChange={this.handleChange}
                placeholder="Enter lastname"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="gender"
                  checked={this.state.activeItem.gender}
                  onChange={this.handleChange}
                />
                Gender
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}