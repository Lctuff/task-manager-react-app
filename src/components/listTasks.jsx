import React, { Component } from "react";
import Complete from "./complete";
import Pagination from "./common/pagination";

class ListTasks extends Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Task</th>
              <th scope="col">Category</th>
              <th scope="col">Severity</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          {this.props.tasks.map((task) => (
            <tbody key={task._id}>
              <tr>
                <th scope="row" key={task.title}>
                  {task.title}
                </th>
                <td key={task.task}>{task.task}</td>
                <td key={task.category}>{task.category}</td>
                <td key={task.severity._id}>
                  {task.severity.name} <br />{" "}
                </td>
                <td>
                  <Complete
                    key={task.completed}
                    tasks={task}
                    onComplete={this.props.onComplete}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Pagination
          itemsCount={this.props.taskCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChange={this.props.onPageChange}
        />
      </div>
    );
  }
}

export default ListTasks;
