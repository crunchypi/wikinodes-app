import React, { Component } from "react";
import "./Spinner.css";



    // toggle the element visibility
    let toggle = (elem) => {
        elem.classList.toggle('hidden');
    }
    
    // toggle
    toggle(document.querySelector('.loader'));




export default class Spinner extends Component {

    //if graph not rendered show spinner
    //how to place spinner 'on top' of d3 svg canvas?

render() {
    return (
        <div className='loader'>...loading....</div>	
    );
  }

}
