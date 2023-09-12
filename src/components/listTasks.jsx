import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import TasksTable from "./tasksTable";

class ListTasks extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.props.severitys}
            textProperty="name"
            titleProperty="Levels Of Severity"
            onItemSelect={this.props.onItemSelect}
            selectedItem={this.props.selectedItem}
          />
        </div>
        <div className="col">
          <TasksTable
            tasks={this.props.tasks}
            onComplete={this.props.onComplete}
            onSort={this.props.onSort}
            sortColumn={this.props.sortColumn}
          />
          <Pagination
            itemsCount={this.props.taskCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChange={this.props.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default ListTasks;
