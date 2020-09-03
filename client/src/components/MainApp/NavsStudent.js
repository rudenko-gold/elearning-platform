import React from "react";
import classnames from "classnames";

// reactstrap components
import {
    Card,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Col,
    Row,
    Modal,
    Input,
    Collapse,
    Form,
    FormGroup,
    CardDeck,
    Label
  } from "reactstrap";

import Profile from "./Profile";

class Lesson extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            solution_url: "",
            defaultModal: false,
            mark: -1
        }

        this.fetchMark = this.fetchMark.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    fetchSentSolution() {
        fetch("http://localhost:5000/api/courses/add_done_task", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },
            body: JSON.stringify({
                lesson_id: this.props.lesson.id,
                solution_url: this.state.solution_url
            })
        }).then(response => response.json()).then(result => {
            console.log(result);
        }).catch(error => console.log(error));
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    componentDidMount() {
        this.fetchMark();
    }

    fetchMark() {
        fetch("http://localhost:5000/api/courses/get_mark", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token,
                'lesson_id': this.props.lesson.id
            }      
            }).then(response => response.json()).then(result => {
                if (result) {
                    console.log(result);
                    console.log("ASDASDASDASD");
                    this.setState({ mark: result.result });
                } else {
                    alert("Somothing went wrong");
                }
            }).catch(error => { console.log(error) });
    }

    componentDidMount() {
        this.fetchMark();
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };

    render() {
        return (
            <div>
                <Row style={{marginTop: "15px"}}>
                    <Col>
                        <Card className="shadow">
                            <CardBody>
                            <CardTitle> {this.props.strings.lesson + " #" + (this.props.index + 1) + ". " + this.props.lesson.title} </CardTitle>
                            <CardSubtitle> <a target="_blank" rel="noopener noreferrer" href={this.props.lesson.task_url}>{this.props.strings.task_url}</a></CardSubtitle>
                            <CardText>
                                <Row>
                                    <Col><span>{ this.props.lesson.description }</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>{ this.props.strings.max_mark + ": " + this.props.lesson.max_mark }</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>{ this.props.strings.deadline + ": " + this.props.lesson.deadline.slice(0, 10) }</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>{ this.props.strings.mark + ": " + (this.state.mark === -1 ? this.props.strings.not_marked : this.state.mark) }</span></Col>
                                </Row>
                            </CardText>
                            <Button
                                disabled={(new Date(this.props.lesson.deadline) - Date.now()) < 0}
                                className="mb-3"
                                color="primary"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                            >
                                {this.props.strings.sent_task}
                            </Button>
                            <Modal
                                size="sm"
                                className="modal-dialog-centered"
                                isOpen={this.state.defaultModal}
                                toggle={() => this.toggleModal("defaultModal")}
                            >
                                <div className="modal-body">
                                <Form>
                                    <FormGroup>
                                        <Label for="task_url">{this.props.strings.sent_task}</Label>
                                        <Input 
                                            type="url" 
                                            name="solution_url" 
                                            id="solution_url" 
                                            placeholder={this.props.strings.enter_task_url}
                                            onChange={this.handleChange} 
                                            value={this.state.solution_url} 
                                        />
                                    </FormGroup>
                                </Form>
                                </div>
                                <div className="modal-footer">
                                    <Button
                                        className="ml-auto"
                                        color="primary"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => {this.fetchSentSolution(); this.toggleModal("defaultModal"); this.setState({ solution_url: ""})}}
                                        >
                                        {this.props.strings.sent}
                                    </Button>
                                    <Button
                                        className="ml-auto"
                                        color="link"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.toggleModal("defaultModal")}
                                        >
                                        {this.props.strings.close}
                                    </Button>
                                </div>
                            </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

class Deadline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lesson: {
                owner: "",
                course_id: "",
                title: "",
                description: "",
                deadline: "",
                task_url: "",
                max_mark: 0     
            },
            defaultModal: false
        }

        this.fetchLesson = this.fetchLesson.bind(this);
    }

    componentDidMount() {
        this.fetchLesson();
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };

    fetchLesson() {
        fetch("http://localhost:5000/api/courses/get_lesson", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token,
                'lesson-id': this.props.deadline.lesson_id
            }
        }).then(response => response.json()).then(result => {
            this.setState({ lesson: result });
            console.log(result);
        }).catch(error => console.log(error));
    }

    numberToTime(number) {
        let endl;
        if (number >= 0) {
            endl = this.props.strings.left;
        }  else {
            endl = this.props.strings.passed;
            number *= -1;
        }

        const day_cnt = Math.floor(number / 86400000);
        number %= 86400000;
        const hours_cnt = Math.floor(number / 3600000);
        number %= 3600000;
        const minutes_cnt = Math.floor(number / 60000);
        number %= 50000;
        const seconds_cnt = Math.floor(number / 1000);

        let result = "";

        if (day_cnt == 1) {
            result += "1 " + this.props.strings.day + " ";
        } else if (day_cnt > 1) {
            result += day_cnt + " " + this.props.strings.days + " ";
        }

        if (hours_cnt == 1) {
            result += "1 " + this.props.strings.hour + " ";
        } else if (hours_cnt > 1) {
            result += hours_cnt + " " + this.props.strings.hours + " ";;
        }

        if (minutes_cnt == 1) {
            result += "1 " + this.props.strings.minute + " ";
        } else if (day_cnt > 1) {
            result += minutes_cnt + " " + this.props.strings.minutes + " ";
        }

        if (seconds_cnt == 1) {
            result += "1 " + this.props.strings.second + " ";
        } else if (seconds_cnt > 1) {
            result += seconds_cnt + " " + this.props.strings.seconds + " ";
        }

        if (result.length === 0) {
            result = "0 " + this.props.strings.seconds + " " + this.props.strings.left;
        } else {
            result += endl;
        }

        return result;
    }

    render() {
        return (
            <div>
                <Card className="shadow" style={{ marginBottom: "10px"}}>
                    <CardBody>
                        <CardTitle>{this.props.strings.lesson + ": " + this.props.deadline.lesson_title}</CardTitle>
                        <CardSubtitle>{this.props.strings.course + ": " + this.props.deadline.course_title}</CardSubtitle>
                        <CardText>{this.props.deadline.deadline_time.toString().slice(0, 10) + " (" + this.numberToTime(new Date(this.props.deadline.deadline_time) - Date.now()) + ")"}</CardText>
                        <Button
                            block
                            className="mb-3"
                            color="primary"
                            type="button"
                            onClick={() => this.toggleModal("defaultModal")}
                        >
                            {this.props.strings.open_lesson}
                        </Button>
                        <Modal
                            size="lg"
                            className="modal-dialog-centered"
                            isOpen={this.state.defaultModal}
                            toggle={() => this.toggleModal("defaultModal")}
                        >
                            <div className="modal-body">
                                <h1 className="display-4"> {this.state.lesson.title} </h1>
                                <span> <a target="_blank" rel="noopener noreferrer" href={this.state.lesson.task_url}>{this.props.strings.task_url}</a></span>
                                <Row>
                                    <Col><span>{ this.state.lesson.description }</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>{ this.props.strings.max_mark + ": " + this.state.lesson.max_mark }</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>{ this.props.strings.deadline + ": " + this.state.lesson.deadline.slice(0, 10) }</span></Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className="ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                    >
                                    {this.props.strings.close}
                                </Button>
                            </div>
                        </Modal>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class DeadlinesTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: 1,
            deadlines_list: [],
            archived_deadlines_list: []
        }
        
        this.fetchDeadlines = this.fetchDeadlines.bind(this);
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
          [state]: index
        });
      };

    fetchDeadlines() {
        fetch("http://localhost:5000/api/courses/get_deadlines/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token,
            }
        }).then(response => response.json()).then(result => {
            this.setState({ deadlines_list: result.deadlines, archived_deadlines_list: result.archive });
            console.log(result);
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchDeadlines();
    }

    render() {
        return (
            <div>
                <div className="nav-wrapper">
                    <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                    >
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.tabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 1)}
                            href="#pablo"
                            role="tab"
                        >
                            <i className="ni ni-cloud-upload-96 mr-2" />
                            {this.props.strings.active_deadlines}
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={this.state.tabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.tabs === 2
                            })}
                            onClick={e => this.toggleNavs(e, "tabs", 2)}
                            href="#pablo"
                            role="tab"
                        >
                            <i className="ni ni-bell-55 mr-2" />
                            {this.props.strings.archived_deadlines}
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </div>
                    <Card className="shadow">
                    <CardBody>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                        <TabPane tabId="tabs1">
                            { 
                                this.state.deadlines_list.map((item, index) => 
                                    <Deadline strings={this.props.strings} auth_token={this.props.auth_token} deadline={item} />
                                )
                            }
                        </TabPane>
                        <TabPane tabId="tabs2">
                            {  
                                this.state.archived_deadlines_list.map((item, index) => 
                                    <Deadline strings={this.props.strings} auth_token={this.props.auth_token} deadline={item} key={item.lesson_id} />
                                )
                            }
                        </TabPane>
                        </TabContent>
                    </CardBody>
                    </Card>
            </div>
        );
    }
}

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            createModal: false,
            lessons_list: [],
            addLessonModal: false,
            lesson_title: "",
            lesson_description: "",
            lesson_deadline: Date(),
            lesson_max_mark: 0,
            lesson_task_url: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetLessonInput = this.resetLessonInput.bind(this);
        this.fetchLessons = this.fetchLessons.bind(this);
    }

    componentDidMount() {
        this.fetchLessons();
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    resetLessonInput() {
        this.setState({
            lesson_title: "",
            lesson_description: "",
            lesson_deadline: Date(),
            lesson_max_mark: 0,
            lesson_task_url: ""
        });
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };

    handleLessonCreating = (e) => {
        fetch("http://localhost:5000/api/courses/add_lesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },      
            body: JSON.stringify(
                {
                    title: this.state.lesson_title,
                    description: this.state.lesson_description,
                    course_id: this.props.item.id,
                    deadline: this.state.deadline,
                    task_url: this.state.task_url,
                    max_mark: this.state.max_mark
                }
            )}).then(response => response.json()).then(result => {
                if (result) {
                    this.resetLessonInput();
                    this.toggleModal("addLessonModal");
                    this.fetchLessons();
                } else {
                    alert("Somothing went wrong");
                }
            }).catch(error => { console.log(error) });
    }

    fetchLessons() {
        fetch("http://localhost:5000/api/courses/get_lessons", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token,
                'course-id': this.props.item.id
            }
        }).then(response => response.json()).then(result => {
            this.setState({ lessons_list: result });
            console.log(result);
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <Card className="shadow">
                <CardBody>
                    <CardTitle>
                        <h1 className="display-4">
                            {this.props.item.title}
                        </h1>
                    </CardTitle>
                    <CardText>
                        <Row>
                            <Col>
                                {this.props.item.description}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.strings.group + ": " + this.props.item.group_title}
                            </Col>
                        </Row>
                    </CardText>
                    <Button
                        block
                        className="mb-3"
                        color="primary"
                        type="button"
                        onClick={() => this.toggleModal("defaultModal")}
                    >
                        {this.props.strings.open}
                    </Button>
                    <Modal
                        size="lg"
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")}
                        >
                        <div>    
                            <div className="modal-header">
                                <h6 className="display-3 modal-title" id="modal-title-default">
                                {this.props.strings.course + ' "' + this.props.item.title + '"'}
                                </h6>
                                <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                                >
                                <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h1 className="display-4">{ this.props.strings.description}</h1>
                                <p>{this.props.item.description}</p>
                                <h1 className="display-4">{ this.props.strings.lessons}</h1>
                                <div>
                                    { 
                                        this.state.lessons_list.map((item, index) => <Lesson strings={this.props.strings} key={item.id} index={index} lesson={item} auth_token={this.props.auth_token}/>)
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                                >
                                {this.props.strings.close}
                                </Button>
                            </div>
                        </div>
                        </Modal>
                </CardBody>
            </Card>
        );
    }
}

class NavsStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupCreateModal: false,
            courseCreateModal: false,
            tabs: 1,
            group_name: "",
            course_name: "",
            course_description: "",
            course_group_id: "",
            groups_list: [],
            course_list:[],
            fetching_courses: true,
            fetching_groups: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
    }

    componentDidMount() {
        this.fetchCourses();
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
        [state]: index
        });
    };

    fetchCourses = () => {
        fetch("http://localhost:5000/api/courses/get_courses/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            }
        }).then(response => response.json()).then(result => {
            this.setState({ course_list: result, fetching_courses: false });
        }).catch(error => { console.log(error) });
    }

    render() {
        return (
        <>
            <div className="nav-wrapper">
            <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
            >
                <NavItem>
                <NavLink
                    aria-selected={this.state.tabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                    href="#pablo"
                    role="tab"
                >
                    <i className="ni ni-cloud-upload-96 mr-2" />
                    {this.props.strings.profile}
                </NavLink>
                </NavItem>

                <NavItem>
                <NavLink
                    aria-selected={this.state.tabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                    href="#pablo"
                    role="tab"
                >
                    <i className="ni ni-bell-55 mr-2" />
                    {this.props.strings.courses}
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    aria-selected={this.state.tabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 3)}
                    href="#pablo"
                    role="tab"
                >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    {this.props.strings.deadlines}
                </NavLink>
                </NavItem>
            </Nav>
            </div>
            <Card className="shadow">
            <CardBody>
                <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                    <Profile 
                        first_name={this.props.first_name}
                        last_name={this.props.last_name}
                        user_type={this.props.user_type}
                        email={this.props.email}
                        strings={this.props.strings}
                        id={this.props.id}
                        changeLanguage={this.props.changeLanguage}
                        logout={this.props.logout}
                    />
                </TabPane>
                <TabPane tabId="tabs2">
                    <CardDeck>
                        <Row>
                        {
                            this.state.course_list.map((item, index) => 
                                <Col style={{ marginBottom: '10px' }} xs="4"><Course strings={this.props.strings} auth_token={this.props.auth_token} item={item} key={item._id}/></Col>
                        )}
                        </Row>
                    </CardDeck>
                </TabPane>
                <TabPane tabId="tabs3">
                    <DeadlinesTab auth_token={this.props.auth_token} strings={this.props.strings} deadlines_list={this.state.deadlines_list} archive_deadlines_list={this.state.archive_deadlines_list}/>
                </TabPane>
                </TabContent>
            </CardBody>
            </Card>
        </>
        );
    }
}

export default NavsStudent;