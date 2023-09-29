import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ListTasks from "./components/listTasks";
import "bootstrap/dist/css/bootstrap.css";
import TaskForm from "./components/taskForm";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import User from "./components/user";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <br />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/tasks/:id" component={TaskForm} />
            <ProtectedRoute path="/profile" component={User} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/tasks"
              render={(props) => <ListTasks {...props} user={user} />}
            />
            <Redirect from="/" exact to="/tasks" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
