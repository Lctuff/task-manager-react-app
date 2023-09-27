import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTask, saveTask } from "../services/taskService";
import { getSeveritys } from "../services/severityService";

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

  async populateSeverities() {
    const { data: severitys } = await getSeveritys();
    this.setState({ severitys });
  }
  async populateTask() {
    try {
      const taskId = this.props.match.params.id;
      if (taskId === "new") return;

      const { data: task } = await getTask(taskId);
      this.setState({ data: this.mapToViewModel(task) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSeverities();
    await this.populateTask();
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
  doSubmit = async () => {
    await saveTask(this.state.data);

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
