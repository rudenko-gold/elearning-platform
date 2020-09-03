import React from "react";
import classnames from "classnames";

import Profile from "./Profile";

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
  CardDeck
} from "reactstrap";

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMembersOpen: false,
            email: "",
            members: []
        }

        this.toggleMembers = this.toggleMembers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.fetchMembers = this.fetchMembers.bind(this);
    }

    componentDidMount() {
        this.fetchMembers();
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    handleAdd(event) {
        fetch("http://localhost:5000/api/groups/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },
            body: JSON.stringify(
                {
                    group_id: this.props.item._id,
                    student_email: this.state.email
                }
            )
        }).then(response => {
            if (response.ok) {
                this.fetchMembers();
                this.setState({ email: "" });
            } else {
                alert("Something went wrong!");
            }
        }).catch(error => console.log(error));
        
        event.preventDefault();
    }

    fetchMembers() {
        fetch("http://localhost:5000/api/groups/students", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': this.props.auth_token,
                'group_id': this.props.item._id
            }
        }).then(response => response.json()).then(result => {
            this.setState({ members: result });
        }).catch(error => console.log(error));
    }

    toggleMembers = () => {
        this.setState({ isMembersOpen: !this.state.isMembersOpen });
    }

    render() {
        return (
            <Row style={{ marginBottom: '1rem' }}>
                <Col>
                <h1 className="display-4"> { this.props.item.title } </h1>
                </Col >
                <Col>
                    <Button color="primary" onClick={this.toggleMembers} style={{ marginBottom: '1rem' }}>{this.props.strings.members}</Button>
                    <Collapse isOpen={this.state.isMembersOpen}>
                        <Card>
                            <CardBody>
                                { this.state.members.length === 0 && <p> {this.props.strings.empty_group} </p> }
                                {
                                    this.state.members.map((item, index) => 
                                    <p>{item.first_name + " " + item.last_name + " (" + item.email + ")"}</p>
                                    ) 
                                }
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
                <Col>
                    <Form>
                        <Button color="primary" onClick={this.handleAdd} style={{ marginBottom: '1rem' }}>{this.props.strings.add_student}</Button>
                        <FormGroup>
                            <Input
                                id="invite_form"
                                placeholder="name@example.com"
                                type="email"
                                name="email"
                                value={this.state.email} onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>);
    }
}

class Lesson extends React.Component {
    constructor(props) {
        super(props);
    }

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
                            </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
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
                                <Button
                                    color="primary"
                                    type="button"
                                    onClick={() => this.toggleModal("addLessonModal")}
                                    >
                                    {this.props.strings.add_new_lesson}
                                </Button>
                                    {/* Modal */}
                                <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.addLessonModal}
                                toggle={() => this.toggleModal("addLessonModal")}
                                >
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addLessonModallLabel">
                                    {this.props.strings.new_lesson}
                                    </h5>
                                    <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("addLessonModal")}
                                    >
                                    <span aria-hidden={true}>×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Form>
                                        <FormGroup>
                                            <span className="display-4">{ this.props.strings.lesson_title } </span>
                                            <Input
                                            placeholder={ this.props.strings.enter_lesson_title }
                                            type="text"
                                            name="lesson_title"
                                            value={this.state.lesson_title} 
                                            onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <span className="display-4">{ this.props.strings.lesson_description } </span>
                                            <Input
                                            placeholder={ this.props.strings.enter_lesson_description }
                                            type="textarea"
                                            name="lesson_description"
                                            value={this.state.lesson_description} 
                                            onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <span className="display-4">{ this.props.strings.task_url } </span>
                                            <Input
                                            placeholder={ this.props.strings.enter_task_url }
                                            type="url"
                                            name="task_url"
                                            value={this.state.task_url} 
                                            onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <span className="display-4">{ this.props.strings.deadline } </span>
                                            <Input
                                            placeholder={ this.props.strings.date }
                                            type="date"
                                            placeholder={Date.now()}
                                            min="today"
                                            name="deadline"
                                            value={this.state.deadline} 
                                            onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <span className="display-4">{ this.props.strings.max_mark } </span>
                                            <Input
                                            placeholder={ this.props.strings.enter_max_mark }
                                            type="number"
                                            name="max_mark"
                                            value={this.state.max_mark} 
                                            onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <Button
                                    color="secondary"   
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => {this.toggleModal("addLessonModal"); this.resetLessonInput()}}
                                    >
                                    {this.props.strings.go_back}
                                    </Button>
                                    <Button color="primary" type="button" onClick={() => this.handleLessonCreating()}>
                                    {this.props.strings.add}
                                    </Button>
                                </div>
                                </Modal>

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

class Assigment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultModal: false,
            mark: 0
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchAssign = this.fetchAssign.bind(this);
    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    fetchAssign() {
        fetch("http://localhost:5000/api/courses/mark_done_task", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },
            body: JSON.stringify({
                mark: this.state.mark,
                done_task_id: this.props.task.id
            })
        }).then(response => response.json()).then(result => {
            this.setState({ mark: 0})
            this.props.fetchDoneTasks();
        }).catch(error => console.log(error));
    }

    render() {
        return (
        <div>
            <Card className="shadow" style={{ marginBottom: "10px"}}>
                <CardBody>
                    <CardTitle>{this.props.strings.lesson + ": " + this.props.task.lesson.result.title}</CardTitle>
                    <CardSubtitle>{this.props.strings.by + " " + this.props.task.student_name}</CardSubtitle>
                    <br/>
                    <CardText><a target="_blank" rel="noopener noreferrer" href={this.props.task.solution_url}>{this.props.strings.solution_url}</a></CardText>
                    <br/>
                    {(this.props.task.total_mark != -1) ? (<CardText><span>{this.props.strings.mark + ": " + this.props.task.total_mark}</span></CardText>) : (<div></div>)}
                    {(this.props.task.total_mark == -1) ? 
                    (<Button
                            block
                            className="mb-3"
                            color="primary"
                            type="button"
                            onClick={() => this.toggleModal("defaultModal")}
                        >
                        {this.props.strings.assign}
                    </Button>) : (<div></div>)}
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")}
                    >
                    <div className="modal-header">
                        <h4 className="modal-title" id="modal-title-default">
                            { this.props.strings.assign_task }
                        </h4>
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
                        <Form>
                            <FormGroup>
                            <Input
                                type="number"
                                name="mark"
                                id="mark"
                                min={0}
                                max={this.props.task.lesson.result.max_mark}
                                placeholder={this.props.strings.enter_mark}
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.mark}
                                />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button 
                            color="primary" 
                            type="button"
                            onClick={() => {this.fetchAssign(); this.toggleModal("defaultModal")}}
                        >
                            { this.props.strings.assign }
                        </Button>
                        <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("defaultModal")}
                        >
                            { this.props.strings.close }
                        </Button>
                    </div>
                    </Modal>
                </CardBody>
            </Card>
        </div>);
    }
}

class AssigmentsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: 1,
            marked_tasks: [],
            unmarked_tasks: []
        };

        this.fetchDoneTasks = this.fetchDoneTasks.bind(this);
    }

    fetchDoneTasks() {
        fetch("http://localhost:5000/api/courses/get_done_tasks", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            }
        }).then(response => response.json()).then(result => {
            this.setState({
                marked_tasks: result.marked_tasks,
                unmarked_tasks: result.unmarked_tasks
            });
            console.log(result);
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchDoneTasks();
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

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
                            {this.props.strings.unmarked}
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
                            {this.props.strings.marked}
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </div>
                    <Card className="shadow">
                    <CardBody>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                        <TabPane tabId="tabs1">
                            {this.state.unmarked_tasks.map((item, index) => 
                                <Assigment fetchDoneTasks={this.fetchDoneTasks} auth_token={this.props.auth_token} strings={this.props.strings} task={item} key={index}/>    
                            )}
                        </TabPane>
                        <TabPane tabId="tabs2">
                            {this.state.marked_tasks.map((item, index) => 
                                <Assigment fetchDoneTasks={this.fetchDoneTasks} auth_token={this.props.auth_token} strings={this.props.strings} task={item} key={index}/>    
                            )}
                        </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class NavsTeacher extends React.Component {
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
        this.handleGroupCreating = this.handleGroupCreating.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
    }

    componentDidMount() {
        this.fetchGroups();
        this.fetchCourses();
    }

    makeTable(list, col) {
        let row = [];
        let res = [];

        for (let i = 0; i < list.length; ++i) {
            row.push(list[i]);

            if (i % col == col - 1) {
                res.push(row);
                row = [];
            }
        }

        if (row.length !== 0) {
            res.push(row);
        }

        return res;
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
        [state]: index
        });
    };

    fetchGroups = () => {
        fetch("http://localhost:5000/api/groups/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            }
        }).then(response => response.json()).then(result => {
            if (result.length === 0) {
                this.setState({ groups_list: result, fetching_groups: false });
            } else {
                this.setState({ groups_list: result, fetching_groups: false, course_group_id: result[0]._id });    
            }
        }).catch(error => console.log(error));
    }

    fetchCourses = () => {
        fetch("http://localhost:5000/api/courses/get_courses/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            }
        }).then(response => response.json()).then(result => {
            console.log(result);
            this.setState({ course_list: result, fetching_courses: false });
        }).catch(error => { console.log(error) });
    }

    handleGroupCreating = (e) => {
        fetch("http://localhost:5000/api/groups/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },
            body: JSON.stringify({ title: this.state.group_name })
        }).then(response => {
            if (response.ok) {
                this.fetchGroups();
            } else {
                alert("Something went wrong!");
            }
        }).catch(error => { console.log(error) });

        this.setState({ group_name: "" });
        this.toggleModal("groupCreateModal");
    }

    handleCourseCreating = (e) => {
        fetch("http://localhost:5000/api/courses/create_course", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': this.props.auth_token
            },      
            body: JSON.stringify(
                {
                    title: this.state.course_name,
                    description: this.state.course_description,
                    group_id: this.state.course_group_id
                }
            )}).then(response => response.json()).then(result => {
                if (result) {
                    this.setState({
                        course_name: "",
                        course_description: "",
                        course_group_id: this.state.groups_list.length === 0 ? "" : this.state.groups_list[0]._id
                    });
                    console.log(this.state);
                    this.toggleModal("courseCreateModal");
                    this.fetchCourses();
                } else {
                    alert("Somothing went wrong");
                }
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
                    { this.props.strings.profile }
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
                    { this.props.strings.courses }
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
                    { this.props.strings.groups }
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    aria-selected={this.state.tabs === 4}
                    className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 4
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 4)}
                    href="#pablo"
                    role="tab"
                >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    { this.props.strings.assigments }
                </NavLink>
                </NavItem>
            </Nav>
            </div>
            {/*
                TAB-1 PROFILE
            */}

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
                
                {/*
                    TAB-2 COURSES
                */}

                <TabPane tabId="tabs2">
                    <Row>
                        <Col>
                            <Button
                                block
                                className="mb-3"
                                color="primary"
                                type="button"
                                onClick={() => this.toggleModal("courseCreateModal")}
                                >
                                { this.props.strings.create }
                            </Button>
                        </Col>
                    </Row>

                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.courseCreateModal}
                        toggle={() => this.toggleModal("courseCreateModal")}
                    >
                    <div className="modal-header">
                        <h4 className="modal-title" id="modal-title-default">
                            { this.props.strings.create_new_course }
                        </h4>
                        <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("courseCreateModal")}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <span className="h5"><strong> { this.props.strings.course_title } </strong></span>
                                <Input
                                placeholder={this.props.strings.enter_course_name_placeholder}
                                type="text"
                                name="course_name"
                                value={this.state.course_name} 
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <span className="h5"><strong> { this.props.strings.course_description } </strong></span>
                                <Input
                                placeholder={this.props.strings.enter_course_description_placeholder}
                                type="textarea"
                                name="course_description"
                                value={this.state.course_description} 
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <span className="h5"><strong> { this.props.strings.group } </strong></span>
                                <Input
                                    placeholder="Select group"
                                    type="select"
                                    name="course_group_id"
                                    value={this.state.course_group_id} onChange={this.handleChange}
                                >
                                    {this.state.groups_list.map((item, index) => 
                                        <option value={item._id}>{item.title}</option>
                                    )}
                                </Input>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button color="primary" type="button" onClick={e => this.handleCourseCreating(e)}>
                            { this.props.strings.create }
                        </Button>
                        <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("courseCreateModal")}
                        >
                            { this.props.strings.close }
                        </Button>
                    </div>
                    </Modal>
                    <CardDeck>
                        { this.makeTable(this.state.course_list).map((row, index) => 
                            <Row>
                                {row.map((item, index) => <Col style={{ marginBottom: '10px' }} xs="4"><Course strings={this.props.strings} auth_token={this.props.auth_token} item={item} key={item._id}/></Col>) }
                            </Row>
                        )}
                    </CardDeck>
                </TabPane>


                {/*
                    TAB-3 GROUPS
                */}

                <TabPane tabId="tabs3">
                    <Row>
                        <Col>
                            <Button
                                block
                                className="mb-3"
                                color="primary"
                                type="button"
                                onClick={() => this.toggleModal("groupCreateModal")}
                                >
                                { this.props.strings.create }
                            </Button>
                        </Col>
                    </Row>

                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.groupCreateModal}
                        toggle={() => this.toggleModal("groupCreateModal")}
                    >
                    <div className="modal-header">
                        <h4 className="modal-title" id="modal-title-default">
                            { this.props.strings.create_new_group }
                        </h4>
                        <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("groupCreateModal")}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <Input
                                placeholder={this.props.strings.enter_group_name_placeholder}
                                type="text"
                                name="group_name"
                                value={this.state.group_name} 
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button color="primary" type="button" onClick={e => this.handleGroupCreating(e)}>
                            { this.props.strings.create }
                        </Button>
                        <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("groupCreateModal")}
                        >
                            { this.props.strings.close }
                        </Button>
                    </div>
                    </Modal>

                    {/* Group list */}

                    { this.state.groups_list.map((item, index) => 
                        <Group strings={this.props.strings} item={item} index={index} auth_token={this.props.auth_token} key={item.id}/>
                    )}
                </TabPane>



                {/*
                    TAB-3 ASSIGMENT
                */}



                <TabPane tabId="tabs4">
                    <AssigmentsTab strings={this.props.strings} auth_token={this.props.auth_token}/>
                </TabPane>
                </TabContent>
            </CardBody>
            </Card>
        </>
        );
    }
}

export default NavsTeacher;