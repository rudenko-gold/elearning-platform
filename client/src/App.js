import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LocalizedStrings from "react-localization";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MainApp from "./components/MainApp/MainApp";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    auth_token: "",
      language: "ua",
      strings: new LocalizedStrings({
        en: {
          profile: "Profile",
          courses: "Courses",
          course: "Course",
          groups: "Groups",
          group: "Group",
          assigments: "Assigments",
          teacher: "Teacher",
          student: "Student",
          create: "Create",
          open: "Open",
          course_title: "Course Title",
          course_description: "Course Description",
          group: "Group",
          close: "Close",
          create_new_course: "Create new course",
          members: "Members",
          add_student: "Add student",
          create_new_group: "Create new group",
          enter_group_name_placeholder: "Enter group's name",
          empty_group: "This group is empty",
          enter_course_name_placeholder: "Enter course's name",
          enter_course_description_placeholder: "Enter course's description",
          lesson: "Lesson",
          lessons: "Lessons",
          description: "Description",
          add_new_lesson: "Add new lesson",
          new_lesson: "New lesson",
          go_back: "Go back",
          add: "Add",
          lesson_title: "Lesson Title",
          lesson_description: "Lesson description",
          deadline: "Deadline",
          deadlines: "Deadlines",
          task_url: "Link to Task",
          max_mark: "Maximal mark",
          enter_lesson_title: "Enter lesson's title",
          enter_lesson_description: "Enter lesson's description",
          enter_task_url: "Enter link to task",
          enter_deadline: "Select deadline",
          enter_max_mark: "Enter maximal mark",
          date: "YYYY-MM-DD",
          stats: "Stats",
          active_deadlines: "Active deadlines",
          archived_deadlines: "Archived deadlines",
          open_lesson: "Open lesson",
          day: "Day",
          days: "Days",
          hour: "Hour",
          hours: "Hour",
          minute: "Minute",
          minutes: "Minutes",
          second: "Second",
          seconds: "Seconds",
          left: "have left",
          passed: "have passed",
          sent: "Sent",
          sent_task: "Sent assigment",
          enter_task_url: "Enter link to done assigment",
          not_marked: "Hasn't marked",
          mark: "Mark",
          marked: "Marked assigments",
          unmarked: "Not marked assigments",
          by: "Uploaded by",
          solution_url: "Link to solution",
          assign: "Assign",
          assign_task: "Assign task",
          enter_mark: "Enter mark",
          logout: "Log-out"
        },
        ua: {
          profile: "Профіль",
          courses: "Курси",
          course: "Курс",
          groups: "Групи",
          group: "Група",
          assigments: "Оцінювання",
          teacher: "Вчитель",
          student: "Студент",
          create: "Створити",
          open: "Відкрити",
          course_title: "Назва курсу",
          course_description: "Опис курсу",
          close: "Закрити",
          create_new_course: "Створити новий курс",
          members: "Учасники",
          add_student: "Додати студента",
          create_new_group: "Створити нову групу",
          enter_group_name_placeholder: "Введіть назву групи",
          empty_group: "У цій групі немає учасників",
          enter_course_name_placeholder: "Введіть назву курсу",
          enter_course_description_placeholder: "Введіть опис курсу",
          lesson: "Урок",
          lessons: "Уроки",
          description: "Опис",
          add_new_lesson: "Додати новий урок",
          new_lesson: "Новий урок",
          go_back: "Назад",
          add: "Додати",
          lesson_title: "Назва уроку",
          lesson_description: "Опис уроку",
          deadline: "Термін здачі",
          deadlines: "Терміни здачі",
          task_url: "Посилання на завдання",
          max_mark: "Максимальна оцінка",
          enter_lesson_title: "Введіть назву уроку",
          enter_lesson_description: "Введіть опис уроку",
          enter_task_url: "Введіть посилання на завдання",
          enter_deadline: "Вкажіть термін здачі",
          enter_max_mark: "Введіть максимальну оцінку",
          date: "РРРР-ММ-ДД",
          stats: "Оцінки",
          active_deadlines: "Наступні терміни",
          archived_deadlines: "Минулі терміни",
          open_lesson: "Відкрити урок",
          day: "День",
          days: "Дні(-в)",
          hour: "Година",
          hours: "Годин(-и)",
          minute: "Хвилина",
          minutes: "Хвилин(-и)",
          second: "Секунда",
          seconds: "Секунд(-и)",
          left: "залишилося",
          passed: "пройшло",
          sent: "Відправити",
          sent_task: "Відправити роботу",
          enter_task_url: "Введіть посилання на роботу",
          not_marked: "Не оцінено",
          mark: "Оцінка",
          marked: "Оцінені роботи",
          unmarked: "Не оцінені роботи",
          by: "Завантажив",
          solution_url: "Посилання на виконане завдання",
          assign: "Оцінити",
          assign_task: "Оцінити роботу",
          enter_mark: "Введіть оцінку",
          logout: "Вийти з облікового запису"
        }
      })
    };

    this.state.strings.setLanguage("ua");

    this.changeLanguage = this.changeLanguage.bind(this);
    this.logout = this.logout.bind(this);
  }

  changeLanguage(language_id) {
    this.state.strings.setLanguage(language_id);
    this.setState({ language: language_id });
  }

  handleAuth = token => {
    this.setState({ auth_token: token });
  };

  logout() {
    this.setState({ auth_token: "" });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/">
            {this.state.auth_token === "" ? (
              <Redirect to="/register" />
            ) : (
              <MainApp
                logout={this.logout}
                changeLanguage={this.changeLanguage}
                strings={this.state.strings}
                auth_token={this.state.auth_token}
              />
            )}
          </Route>
          <Route path="/login">
            {this.state.auth_token === "" ? (
              <Login onAuth={this.handleAuth} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/register">
            {this.state.auth_token === "" ? <Register /> : <Redirect to="/" />}
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
