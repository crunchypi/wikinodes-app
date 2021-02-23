import React, { Component } from "react";
import "./Spinner.css";



    // toggle the element visibility
    //let toggle = (elem) => {
     //   elem.classList.toggle('hidden');
    //}
    
    // toggle
    //toggle(document.querySelector('.loader'));




export default class Spinner extends Component {

    //if graph not rendered show spinner
    //how to place spinner 'on top' of d3 svg canvas? 
    //should be centred based on parent (graph box) css

render() {
    return (
        <div className='loader'>...loading....</div>	
    );
  }

}
