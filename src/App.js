import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewgender: false,
      appList: [],
      modal: false,
      activeItem: {
        username: "",
        lastname: "",
        age: "",
        weight: "",
        gender: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/apps/")
      .then((res) => this.setState({ appList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/apps/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/apps/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/apps/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { username: "", lastname: "", gender: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displaygender = (status) => {
    if (status) {
      return this.setState({ viewgender: true });
    }

    return this.setState({ viewgender: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displaygender(true)}
          className={this.state.viewgender ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displaygender(false)}
          className={this.state.viewgender ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewgender } = this.state;
    const newItems = this.state.appList.filter(
      (item) => item.gender === viewgender
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`app-username mr-2 ${
            this.state.viewgender ? "gender-app" : ""
          }`}
          username={item.lastname}
        >
          {item.username}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">app app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;