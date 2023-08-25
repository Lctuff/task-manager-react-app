import React, { Component } from 'react';
import './App.css';
import ListTasks from './components/listTasks';

class App extends Component {
  state = {
    tasks: [
      {
        _id: "618c3432eddf61c496096578",
        title: "Stay Hydrated",
        task: "Drink da dew",
        category: "DayToDay",
        severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
        completed: false,
      },
      {
        _id: "618c3459eddf61c49609657a",
        title: "Dishes",
        task: "Do the dishes",
        category: "Home",
        severity: { _id: "61b017a20cce782d386e736f", name: "Normal" },
        completed: false,
      },
      {
        _id: "618c345feddf61c49609657c",
        title: "Laundry",
        task: "Do Laundry",
        category: "Home",
        severity: { _id: "61b017a20cce782d386e736f", name: "Normal" },
        completed: false,
      },
      {
        _id: "618c3469eddf61c49609657e",
        title: "Report",
        task: "Make Employee Report",
        category: "Work",
        severity: { _id: "61b017cc0cce782d386e7370", name: "Important" },
        completed: false,
      },
      {
        _id: "618c3474eddf61c496096580",
        title: "Brush Teeth",
        task: "Brush my Teeth",
        category: "Home",
        severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
        completed: false,
      },
    ],
  };
  handleComplete = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...task };
    const checkComp = tasks[index].completed;
    tasks[index].completed = !checkComp;
    this.setState({ tasks });
  };

  render() { 
    return (
      <div>
        <main className='container'>
          <ListTasks 
          tasks = {this.state.tasks}
          onComplete ={this.handleComplete}/>
        </main>
      </div>
    );
  }
}
 
export default App;