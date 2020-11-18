import React, { Component } from "react";
import './Project.css'
import Tasks from "../Tasks/Tasks";
import axios from "axios";
import Task from "../Task/Task";
class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectId: [],
      tasks: [],
      input: false,
      value: this.props.name,
      id: this.props.id,
      name: this.props.name,
      taskName: ""
    };

    this.updatedProject = this.updatedProject.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this)
  }


  getTasks() {
    axios.get(
      `https://todo-rubygarage-api.herokuapp.com/project`,
      {withCredentials: true})
      .then(response => {
          this.setState({tasks: response.data.tasks});
      })
      .catch(error => console.log(error));
  }

  taskHandleChange(event) {
    this.setState({taskName: event.target.value});

  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }


  showInput = () => {
    this.props.showInput();
    this.setState({input: true});
  }

  updatedProject() {
    this.props.updateProject(this.state.id, this.state.value);
    this.setState({input: false});
  }

  createTask = (event) => {
    axios.post(`https://todo-rubygarage-api.herokuapp.com/project/${this.state.id}/tasks`,
      {name: this.state.taskName, status: "in progress"},
      {withCredentials: true})
      .then(response => {
        const tasks = [...this.state.tasks]
        tasks.push(response.data.task)
        tasks.reverse();

        this.setState({tasks: tasks})
      })
      .catch(error => console.log(error));

    event.preventDefault();
    this.setState({taskName: ""})
  }


  updateTask(projectId, taskId, name) {
    // alert('project updated');
    axios.patch(
      `https://todo-rubygarage-api.herokuapp.com/project/${projectId}/tasks/${taskId}`,
      {name: name, status: "in progress"},
      {withCredentials: true})
      .then(response => {

        const tasks = [...this.state.tasks];
        const index = tasks.map(p => p.id).indexOf(taskId);
        tasks[index] = response.data.task;

        this.setState({tasks: tasks});
      })
      .catch(error => console.log(error));

  }

  deleteTask(id) {
    const tasks = []
    this.state.tasks.map(el => {
      if (id !== el.id && this.state.id === el.project_id) {
        tasks.push(el)
      }
    });

    this.setState({tasks: tasks});
  }


  componentDidMount() {
    this.getTasks();
    // this.setState({tasks: this.props.tasks})
  }

  render() {

    const tasks = this.state.tasks.map(el => {
      if (this.state.id === el.project_id) {
        return <Tasks
          deleteTask={this.deleteTask}
          updateTask={this.updateTask}
          key={el.id}
          id={el.id}
          name={el.name}
          projectId={el.project_id}
          status={el.status}/>
      }
    });

    return(
      <div className="card text-center">
        <div className="card-header">
          {
            this.state.input ?
            <input
              className="form-control todo-list-input"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            :
            <p>Name: {this.props.name}</p>
          }

          ID: {this.props.id}
        </div>
        <form onSubmit={this.createTask} className="add-items d-flex">
          <input
            value={this.state.taskName}
            onChange={this.taskHandleChange.bind(this)}
            type="text"
            className="form-control todo-list-input"
            placeholder="What do you need to do today?"
            required/>
          <button
            // onClick={this.createTask}
            className="add btn btn-primary font-weight-bold todo-list-add-btn">Add
          </button>
        </form>
        <ul className="list-group">
          {tasks}
        </ul>
        <div className="card-footer text-muted">

          <a onClick={this.props.deleteProject(this.props.id)}
             href="/"
             className="btn btn-danger delete">Delete project
          </a>
          {!this.state.input?
            <button
              // type="submit"
              onClick={this.showInput}
              className="btn btn-warning"
            >
              Update project
            </button>
              :
            <button
              type="submit"
              onClick={this.updatedProject}
              className="btn btn-warning"
            >
              Update project
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Project;