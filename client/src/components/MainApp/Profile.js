import React from "react";
import classnames from "classnames";

import {
    NavItem,
    NavLink,
    Nav,
    Button
  } from "reactstrap";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circledNavPills: 2
        };
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();

        if (index == 1) {
            this.props.changeLanguage("en");
        } else if (index == 2) {
            this.props.changeLanguage("ua");
        }

        this.setState({
            [state]: index
        })
    };

    render() {
        return (
            <div>
                <h1 className="display-1">{this.props.first_name + " " + this.props.last_name}</h1>
                <h1 className="display-3">{this.props.user_type === "student" ? this.props.strings.student : this.props.strings.teacher}</h1>
                <h1 className="display-4">{this.props.email}</h1>

                <br/>
                <br/>
                <Button
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={() => this.props.logout()}
                >
                    {this.props.strings.logout}
                </Button>
                <br/>
                <br/>
                <Nav className="nav-pills-circle" id="tabs_2" pills role="tablist">
                    <NavItem>
                        <NavLink
                        aria-selected={this.state.circledNavPills === 1}
                        className={classnames("rounded-circle", {
                            active: this.state.circledNavPills === 1
                        })}
                        onClick={e => this.toggleNavs(e, "circledNavPills", 1)}
                        role="tab"
                        >
                        <span className="nav-link-icon d-block">
                            <img
                            alt="..."
                            src={require("../../assets/img/icons/flags/en.png")}
                            width="30px"
                            />
                        </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        aria-selected={this.state.circledNavPills === 2}
                        className={classnames("rounded-circle", {
                            active: this.state.circledNavPills === 2
                        })}
                        onClick={e => this.toggleNavs(e, "circledNavPills", 2)}
                        role="tab"
                        >
                        <span className="nav-link-icon d-block">
                            <img
                                alt="..."
                                src={require("../../assets/img/icons/flags/ua.png")}
                                width="30px"
                            />
                        </span>
                        </NavLink>
                    </NavItem>
                    </Nav>

            </div>
        );
    }
}

export default Profile;