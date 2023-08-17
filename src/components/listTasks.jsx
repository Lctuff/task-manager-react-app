import React, { Component } from "react";
import tasks from "../fakeTaskService-1";

class ListTasks extends Component {
  render() {
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          {tasks.map((tasks) => (
            <li key={tasks._id}>
              <h6 key={tasks._id} className="">
                {tasks._id}
              </h6>
              <h3 key={tasks.title}>{tasks.title}</h3>
              <p key={tasks.task}>{tasks.task}</p>
              <p key={tasks.category}>{tasks.category}</p>
              <p key={tasks.severity.name}>
                {tasks.severity.name} <br />{" "}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListTasks;
