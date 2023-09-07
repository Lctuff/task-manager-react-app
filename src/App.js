import React, { Component } from "react";
import "./App.css";
import ListTasks from "./components/listTasks";
import "bootstrap/dist/css/bootstrap.css";
import { getTasks } from "./services/fakeTaskService-1";
import { paginate } from "./utils/paginate";
import { getSeveritys } from "./services/fakeSeverityService";

class App extends Component {
  state = {
    tasks: [],
    currentPage: 1,
    pageSize: 4,
    severitys: [],
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
  render() {
    const {
      pageSize,
      currentPage,
      selectedSeverity,
      tasks: allTasks,
    } = this.state;

    const filtered =
      selectedSeverity && selectedSeverity._id
        ? allTasks.filter((t) => t.severity._id === selectedSeverity._id)
        : allTasks;
    const tasks = paginate(filtered, currentPage, pageSize);

    return (
      <div>
        <main className="container">
          <ListTasks
            tasks={tasks}
            onComplete={this.handleComplete}
            taskCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            severitys={this.state.severitys}
            onItemSelect={this.handleSeveritySelect}
            selectedItem={this.state.selectedSeverity}
          />
        </main>
      </div>
    );
  }
}

export default App;
