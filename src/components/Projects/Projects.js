import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import update from 'immutability-helper';
import Project from "../Project/Project";
import Task from "../Task/Task";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      name: '',
      tasks: [],
      input: false
    };
    this.showInput = this.showInput.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }


  showInput() {
    // alert('from Projects showInput');


  }

  updateProject(id, name) {
    // alert('project updated');
    axios.patch(
      `https://todo-rubygarage-api.herokuapp.com/project/${id}`,
      {name: name},
      {withCredentials: true})
      .then(response => {

        const projects = [...this.state.projects];
        const index = projects.map(p => p.id).indexOf(id);
        projects[index] = response.data.project;

        this.setState({projects: projects});
      })
      .catch(error => console.log(error));

  }

  getProjectsHandler() {
    axios.get('https://todo-rubygarage-api.herokuapp.com/project', {withCredentials: true})
      .then(response => {
        this.setState({projects: response.data.projects});
        this.setState({tasks: response.data.tasks})
      })
      .catch(error => console.log(error));
  }

  // getTasksHandler() {
  //   axios.get('http://localhost:3001/project/2/tasks', {withCredentials: true})
  //     .then(response => this.setState({tasks: response.data.tasks}))
  //     .catch(error => console.log(error));
  // }

  handleChange(event) {
    this.setState({name: event.target.value});

  }

  createProject(event) {
    axios.post("https://todo-rubygarage-api.herokuapp.com/project",
      {name: this.state.name},
      {withCredentials: true})
      .then(response => {
        const projects = [...this.state.projects]
        projects.push(response.data.project)
        projects.reverse();

        this.setState({projects: projects})
      })
      .catch(error => console.log(error));

    event.preventDefault();
    this.getProjectsHandler();
    this.setState({name: ""})
  }


  deleteProject(id,event) {
    alert(`delete project ${id}`);
    axios.delete(
      `https://todo-rubygarage-api.herokuapp.com/project/${id}`,
      {withCredentials: true})
      .then(response => {
        const updatedProjects = []
        const projects = [...this.state.projects]
        projects.map(el => {
          if (el.id !== response.data.project) {
            updatedProjects.push(el)
          }
        })
        this.setState({projects: updatedProjects});
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }

  updateState() {

  }

  componentDidMount() {
    this.getProjectsHandler();
  }

  render() {

    const projects = this.state.projects.map(project => (
      <Project
        tasks={this.state.tasks}
        showInput={this.showInput}
        updateProject={this.updateProject}
        deleteProject={(id) => this.deleteProject.bind(this, id)}
        id={project.id}
        key={project.id}
        name={project.name} />
    ));


    return(
      <div>
        <div>

        </div>
        <form onSubmit={this.createProject.bind(this)}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                required/>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">Create Project</button>
            </div>
          </div>
        </form>

        {projects}
      </div>
    );
  }
}

export default Projects;