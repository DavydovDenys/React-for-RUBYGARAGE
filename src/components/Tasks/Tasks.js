import React, {Component } from "react";
import axios from "axios";
import Task from "../Task/Task";


class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: false,
      value: this.props.name,
      id: this.props.id,
      projectId: this.props.projectId
    };

    this.updatedTask = this.updatedTask.bind(this)
  }



  showInput = () => {
    this.setState({input: true});
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  componentDidMount() {

  }

  deleteTask() {
    alert(`delete task ${this.state.id}`);
    axios.delete(
      `https://todo-rubygarage-api.herokuapp.com/project/${this.state.projectId}/tasks/${this.state.id}`,
      {withCredentials: true})
      .then(response => response)

      .catch(error => console.log(error));
    this.props.deleteTask(this.state.id);
  }

  updatedTask() {
    this.props.updateTask(this.state.projectId, this.state.id, this.state.value);
    this.setState({input: false});
  }

  render() {

    return(
      <>
        <li className="list-group-item">{this.state.input ?
          <input
            className="form-control todo-list-input"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          :
          <p>Name: {this.props.name}</p>}
          <div>
            <input type="checkbox" value/>
          </div>
          <div>
            <button className="btn btn-warning btn-xs">
              {!this.state.input ?
                <i onClick={this.showInput} className="fa fa-pencil">edit</i>
                :
                <i onClick={this.updatedTask} className="fa fa-pencil">edit</i>
              }

            </button>
            <button className="btn btn-danger btn-xs">
              <i onClick={this.deleteTask.bind(this)} className="fa fa-trash-o">delete</i>
            </button>
          </div>
        </li>
      </>
      // <div className="card-body">
      //   <h5 className="card-title">{this.props.name}</h5>
      //   <p className="card-text">{this.props.status}</p>
      //   <a href="#" className="btn btn-primary">Go somewhere</a>
      // </div>
    );
  }
}

export default Tasks;