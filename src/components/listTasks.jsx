import React, { Component } from "react";
import Complete from "./complete";
class ListTasks extends Component {
  render() {
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          {this.props.tasks.map((task) => (
            <li key={task._id}>
              <br />
              <h3 key={task.title}>{task.title}</h3>
              <p key={task.task}>{task.task}</p>
              <p key={task.category}>{task.category}</p>
              <p key={task.severity._id}>
                {task.severity.name} <br />{" "}
              </p>

              <Complete
                key={task.completed}
                tasks={task}
                onComplete={this.props.onComplete}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListTasks;
