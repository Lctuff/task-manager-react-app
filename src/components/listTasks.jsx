import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import TasksTable from "./tasksTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { getSeveritys } from "../services/severityService";
import { deleteTask, getTasks } from "../services/taskService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import _ from "lodash";

class ListTasks extends Component {
  state = {
    tasks: [],
    currentPage: 1,
    pageSize: 4,
    severitys: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedSeverity: null,
  };

  async componentDidMount() {
    const { data } = await getSeveritys();

    const severitys = [{ name: "All Severities" }, ...data];

    const { data: tasks } = await getTasks();

    this.setState({ tasks, severitys });
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
    this.setState({
      selectedSeverity: severity,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleDelete = async (task) => {
    const originalTasks = this.state.tasks;
    const tasks = originalTasks.filter((t) => t._id !== task._id);

    this.setState({ tasks });

    try {
      await deleteTask(task._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ tasks: originalTasks });
    }
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
      searchQuery,
      sortColumn,
    } = this.state;
    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((t) =>
        t.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedSeverity && selectedSeverity._id)
      filtered = allTasks.filter(
        (t) => t.severity._id === selectedSeverity._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const tasks = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: tasks };
  };
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedSeverity: null,
      currentPage: 1,
    });
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: tasks } = this.getPageData();
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.severitys}
            textProperty="name"
            titleProperty="Levels Of Severity"
            onItemSelect={this.handleSeveritySelect}
            selectedItem={this.state.selectedSeverity}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/tasks/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Task
            </Link>
          )}
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <TasksTable
            tasks={tasks}
            onComplete={this.handleComplete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ListTasks;
