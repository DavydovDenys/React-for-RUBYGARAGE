import React, { Component} from "react";
import './Task.css'

class Task extends Component {
  render() {
    return(


      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {this.props.name}
          <span className="badge badge-primary badge-pill">1</span>
        </li>
      </ul>


    );
  }
}

export default Task;