import React, { Component } from "react";
import "./App.css";
import ListTasks from "./components/listTasks";
import "bootstrap/dist/css/bootstrap.css";
import { getTasks } from "./fakeTaskService-1";
import { paginate } from "./utils/paginate";

class App extends Component {
  state = {
    tasks: getTasks(),
    currentPage: 1,
    pageSize: 4,
  };
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
  render() {
    const { pageSize, currentPage, tasks: allTasks } = this.state;

    const tasks = paginate(allTasks, currentPage, pageSize);

    return (
      <div>
        <main className="container">
          <ListTasks
            tasks={tasks}
            onComplete={this.handleComplete}
            taskCount={this.state.tasks.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </main>
      </div>
    );
  }
}

export default App;
