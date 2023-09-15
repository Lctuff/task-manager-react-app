import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import ListTasks from "./components/listTasks";
import "bootstrap/dist/css/bootstrap.css";
import { getTasks } from "./services/fakeTaskService-1";
import { paginate } from "./utils/paginate";
import { getSeveritys } from "./services/fakeSeverityService";
import _ from "lodash";
import TaskForm from "./components/taskForm";
import Admin from "./components/admin";
import Login from "./components/login";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

class App extends Component {
  state = {
    tasks: [],
    currentPage: 1,
    pageSize: 4,
    severitys: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const severity = [{ name: "All Severitys" }, ...getSeveritys()];

    this.setState({ tasks: getTasks(), severitys: severity });
  }

  handleComplete = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...task };
    const checkComp = tasks[index].completed;
    tasks[index].completed = !checkComp;
    this.setState({ tasks });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSeveritySelect = (severity) => {
    this.setState({ selectedSeverity: severity, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedSeverity,
      tasks: allTasks,
      sortColumn,
    } = this.state;
    const filtered =
      selectedSeverity && selectedSeverity._id
        ? allTasks.filter((t) => t.severity._id === selectedSeverity._id)
        : allTasks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const tasks = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: tasks };
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: tasks } = this.getPageData();
    return (
      <div>
        <NavBar />
        <br />
        <main className="container">
          <Switch>
            <Route path="/tasks/:id" component={TaskForm} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/tasks"
              exact
              render={(props) => (
                <ListTasks
                  tasks={tasks}
                  onComplete={this.handleComplete}
                  taskCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                  severitys={this.state.severitys}
                  onItemSelect={this.handleSeveritySelect}
                  selectedItem={this.state.selectedSeverity}
                  onSort={this.handleSort}
                  sortColumn={this.state.sortColumn}
                  {...props}
                />
              )}
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
