import React from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  RefreshControl
} from "react-native";

import { WebView } from "react-native-webview";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CardList } from "react-native-card-list";
import { Card } from "galio-framework";
import { Accordion, Block } from "galio-framework";
import Swiper from "react-native-swiper";
import randomcolor from "randomcolor";

const auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ3YTI5MDNlNTIzNWQxNjU5ZWY2MjYiLCJfdXNlcl90eXBlIjoic3R1ZGVudCIsImlhdCI6MTU5ODY0NzUwNH0.YjBlEOD4l0XBiyptUoAPhPxEMWygrAk7cFDqjigs8DA";

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    backgroundColor: "white",
    borderRadius: 15,
    width: "85%",
    height: 200,
    marginBottom: 15
  }
});

class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: "white" }}>{this.props.label}</Text>
    );
  }
}

class Deadline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lesson: {},
      defaultModal: false
    };
  }

  componentDidMount() {
    this.fetchLesson();
  }

  fetchLesson() {
    fetch("http://localhost:5000/api/courses/get_lesson", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "auth-token": auth_token,
        "lesson-id": this.props.props.deadline.lesson_id
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ lesson: result });
        console.log("FETCHED!");
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  numberToTime(number) {
    let endl;
    if (number >= 0) {
      // endl = this.props.strings.left;
      endl = "лишилося";
    } else {
      //endl = this.props.strings.passed;
      endl = "пройшло";
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
      // result += "1 " + this.props.strings.day + " ";
      result += "1 " + "день" + " ";
    } else if (day_cnt > 1) {
      // result += day_cnt + " " + this.props.strings.days + " ";
      result += day_cnt + " " + "днів" + " ";
    }

    if (hours_cnt == 1) {
      // result += "1 " + this.props.strings.hour + " ";
      result += "1 " + "година" + " ";
    } else if (hours_cnt > 1) {
      // result += hours_cnt + " " + this.props.strings.hours + " ";
      result += hours_cnt + " " + "годин" + " ";
    }

    if (minutes_cnt == 1) {
      // result += "1 " + this.props.strings.minute + " ";
      result += "1 " + "хвилина" + " ";
    } else if (day_cnt > 1) {
      // result += minutes_cnt + " " + this.props.strings.minutes + " ";
      result += minutes_cnt + " " + "хвилин(-и)" + " ";
    }

    if (seconds_cnt == 1) {
      // result += "1 " + this.props.strings.second + " ";
      result += "1 " + "секунда" + " ";
    } else if (seconds_cnt > 1) {
      // result += seconds_cnt + " " + this.props.strings.seconds + " ";
      result += seconds_cnt + " " + "секунд(-и)" + " ";
    }

    if (result.length === 0) {
      // result =  "0 " + this.props.strings.seconds + " " + this.props.strings.left;
      result = "0 " + "секунд" + " " + "лишилося";
    } else {
      result += endl;
    }

    return result;
  }

  render() {
    console.log("LESSON");
    console.log(this.state.lesson);
    return (
      <View
        style={[
          styles.card,
          {
            paddingTop: "5%",
            paddingLeft: "5%",
            paddingRight: "5%"
          }
        ]}
      >
        {this.state.lesson.description !== "" ? (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Arial",
                fontWeight: "100"
              }}
            >
              {this.props.props.deadline.course_title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Arial",
                fontWeight: "100"
              }}
            >
              {"Урок: " + this.props.props.deadline.lesson_title}
            </Text>
            <Text>{this.state.lesson.description}</Text>
            <Text>{"Максимальная оцінка: " + this.state.lesson.max_mark}</Text>
            <Text>
              {this.props.props.deadline.deadline_time.toString().slice(0, 10) +
                " (" +
                this.numberToTime(
                  new Date(this.props.props.deadline.deadline_time) - Date.now()
                ) +
                ")"}
            </Text>
            <Button
              title="Посилання на завдання"
              onPress={() => Linking.openURL(this.state.lesson.task_url)}
            />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}
const DeadlineList = ({ props }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [updateVar] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.fetchDeadlines();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            top: 20,
            left: 20,
            fontSize: 30,
            fontFamily: "Arial",
            fontWeight: "500"
          }}
        >
          {props.list_title}
        </Text>
      </View>
      <View style={{ flex: 9 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ alignItems: "center" }}>
            {props.deadline_list.map((item, index) => (
              <Deadline props={{ deadline: item }} key={item.lesson_id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
/*
class DeadlineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      setRefreshing: false
    };

    this.onRefresh = React.useCallback(() => {
      setRefreshing(true);

      wait(2000).then(() => setRefreshing(false));
    }, []);
  }

  render() {
    console.log("ASdasfdsafsafd");
    console.log(this.props.props);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              top: 20,
              left: 20,
              fontSize: 30,
              fontFamily: "Arial",
              fontWeight: "500"
            }}
          >
            {this.props.props.list_title}
          </Text>
        </View>
        <View style={{ flex: 9 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View style={{ alignItems: "center" }}>
              {this.props.props.deadline_list.map((item, index) => (
                <Deadline props={{ deadline: item }} key={item.lesson_id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
*/
class Deadlines extends React.Component {
  constrtuctor() {
    this.fetchDeadlines = this.fetchDeadlines.bind(this);
  }

  fetchDeadlines() {
    fetch("http://localhost:5000/api/courses/get_deadlines/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "auth-token": auth_token
      }
    })
      .then(response => response.json())
      .then(result => {
        if (this.state) {
          this.updateState({
            deadlines_list: result.deadlines,
            archived_deadlines_list: result.archive
          });
        } else {
          this.setState({
            deadlines_list: result.deadlines,
            archived_deadlines_list: result.archive
          });
        }
        console.log("UPDATE UPDATE");
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchDeadlines();
  }

  viewStyle() {
    return {
      flex: 1
    };
  }

  render() {
    return this.state ? (
      <Swiper loop={false} showsPagination={false} index={0}>
        <View style={this.viewStyle()}>
          <DeadlineList
            props={{
              list_title: "Наступні терміни",
              deadline_list: this.state.deadlines_list,
              fetchDeadlines: this.fetchDeadlines
            }}
          />
        </View>
        <View style={this.viewStyle()}>
          <DeadlineList
            props={{
              list_title: "Минулі терміни",
              deadline_list: this.state.archived_deadlines_list,
              fetchDeadlines: this.fetchDeadlines
            }}
          />
        </View>
      </Swiper>
    ) : (
      <Text>Loading...</Text>
    );
  }
}

class Profile extends React.Component {
  componentDidMount() {
    fetch("http://localhost:5000/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "auth-token": auth_token
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          auth_token: auth_token,
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
          user_type: response.user_type,
          id: response.id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return this.state ? (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 40, fontFamily: "Arial", fontWeight: "500" }}>
          {this.state.first_name + " " + this.state.last_name}
        </Text>
        <Text style={{ fontSize: 35, fontFamily: "Arial", fontWeight: "300" }}>
          Cтудент
        </Text>
        <Text
          style={{
            top: 10,
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "300"
          }}
        >
          {"Пошта: " + this.state.email}
        </Text>
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, top: "15%", left: 20 }}>
      <Profile />
    </SafeAreaView>
  );
}

function DeadlinesScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Deadlines />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Профіль") {
              iconName = focused ? "ios-contact" : "ios-contact";
            } else if (route.name === "Терміни") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen
          name="Профіль"
          component={HomeScreen}
          props={{ auth_token: "assbs" }}
        />
        <Tab.Screen name="Терміни" component={DeadlinesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
