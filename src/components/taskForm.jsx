import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTask, saveTask } from "../services/fakeTaskService-1";
import { getSeveritys } from "../services/fakeSeverityService";

class TaskForm extends Form {
  state = {
    data: {
      title: "",
      task: "",
      category: "",
      severityId: "",
    },
    severitys: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    task: Joi.string().required().label("Task"),
    category: Joi.string().required().label("Category"),
    severityId: Joi.string().required().label("Severity"),
  };

  componentDidMount() {
    const severitys = getSeveritys();
    this.setState({ severitys });

    const taskId = this.props.match.params.id;
    if (taskId === "new") return;

    const task = getTask(taskId);
    if (!task) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(task) });
  }

  mapToViewModel(task) {
    return {
      _id: task._id,
      title: task.title,
      task: task.task,
      category: task.category,
      severityId: task.severity._id,
    };
  }
  doSubmit = () => {
    saveTask(this.state.data);

    this.props.history.push("/tasks");
  };

  render() {
    return (
      <div>
        <h1 className="mb-3">Task Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("task", "Task")}
          {this.renderInput("category", "Category")}
          {this.renderSelect("severityId", "Severity", this.state.severitys)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TaskForm;
