import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import NavsStudent from "./NavsStudent";
import NavsTeacher from "./NavsTeacher";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, isFetching: true, error: null };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "auth-token": this.props.auth_token
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          auth_token: this.props.auth_token,
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
          user_type: response.user_type,
          id: response.id,
          isFetching: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isFetching: false, error });
      });
  }

  render() {
    const { isFetching, error } = this.state;
    if (isFetching) return <div>...Loading</div>;

    if (error) return <div>{`Error: ${error.message}`}</div>;
    console.log(this.state.auth_token);
    return (
      <div className="App" style={{ width: "95vw", paddingLeft: "2.5vw" }}>
        {this.state.user_type === "student" ? (
          <NavsStudent
            email={this.state.email}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            auth_token={this.state.auth_token}
            id={this.state.id}
            user_type={this.state.user_type}
            strings={this.props.strings}
            changeLanguage={this.props.changeLanguage}
            logout={this.props.logout}
          />
        ) : (
          <NavsTeacher
            email={this.state.email}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            auth_token={this.state.auth_token}
            id={this.state.id}
            user_type={this.state.user_type}
            strings={this.props.strings}
            changeLanguage={this.props.changeLanguage}
            logout={this.props.logout}
          />
        )}
      </div>
    );
  }
}

export default MainApp;
