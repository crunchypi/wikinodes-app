import React, { Component } from "react";
import "./Spinner.css";


export default class Spinner extends Component {
state = {loading:false};

render() {
    return (
        //no spinner css applied if loading != true
        <div className={this.state.loading ? 'loader' : ''}></div>	
    );
  }

}
