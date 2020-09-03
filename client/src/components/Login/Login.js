import React from "react";
import classnames from "classnames";
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            navPills: "student",
            password: "",
            email: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }
    
    handleSubmit(event) {
        fetch("http://localhost:5000/api/users/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                user_type: this.state.navPills
            })
        }).then(response => response.text()).then(result => {
            this.props.onAuth(result);
            console.log(result);
            this.props.history.push("/");
        }).catch(error => console.log(error));

        event.preventDefault();
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    
    render() {
        return (
        <>
            <main ref="main">
            <section className="section section-shaped section-lg">
                <div className="shape shape-style-1 bg-gradient-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                </div>
                <Container className="pt-lg-7">
                <Row className="justify-content-center">
                    <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                            <small>Sign In as</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Nav
                                className="nav-fill flex-column flex-sm-row"
                                id="tabs-text"
                                pills
                                role="tablist"
                            >
                            <NavItem>
                                <NavLink
                                aria-selected={this.state.navPills === "student"}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.navPills === "student"
                                })}
                                onClick={e => this.toggleNavs(e, "navPills", "student")}
                                href="#pablo"
                                role="tab"
                                >
                                Student
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                aria-selected={this.state.navPills === "teacher"}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.navPills === "teacher"
                                })}
                                onClick={e => this.toggleNavs(e, "navPills", "teacher")}
                                href="#pablo"
                                role="tab"
                                >
                                Teacher
                                </NavLink>
                            </NavItem>
                            </Nav>
                        </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-email-83" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                placeholder="Password"
                                type="password"
                                autoComplete="off"
                                name="password" value={this.state.password} onChange={this.handleChange}
                                />
                            </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="submit"
                                onClick={ e => this.handleSubmit(e) } 
                            >
                                Sign in
                            </Button>
                            </div>
                        </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                        </Col>
                        <Col className="text-right" xs="6">
                            <Link to="/register" className="text-light"><small>Create new account</small></Link>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                </Container>
            </section>
            </main>
        </>
        );
    }
}

export default withRouter(Login);
