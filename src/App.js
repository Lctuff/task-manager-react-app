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

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar />
        <br />
        <main className="container">
          <Switch>
            <Route path="/tasks/:id" component={TaskForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/tasks" render={(props) => <ListTasks />} />
            <Redirect from="/" exact to="/tasks" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
