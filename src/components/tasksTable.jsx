import React, { Component } from "react";
import Table from "./common/table";
import Complete from "./complete";
class TasksTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "task", label: "Task" },
    { path: "category", label: "Category" },
    { path: "severity.name", label: "Severity" },
    {
      key: "complete",
      content: (task) => (
        <Complete tasks={task} onComplete={this.props.onComplete} />
      ),
    },
  ];

  render() {
    const { tasks, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={tasks}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TasksTable;
