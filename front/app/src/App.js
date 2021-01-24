import React, { Component } from 'react'
import './App.css';
import Graph from './components/graph/Graph'
import WikiBox from './components/wikibox/WikiBox'
import ConfigBox from './components/cfgbox/ConfigBox.js'

// # Dirty cheat.
const style = {
  display: 'flex',
  alignItems: 'center'
}


export default class App extends Component {
  state = {sideBarHTML:''}

  // # Send txt from compontents: Graph->WikiBox 
  updateSideBar = (txt) => {
    this.setState({sideBarHTML:txt})
  }

  render() {
    return (
      <div className="App"> 
		<div style={style}>
        	<Graph updateSideBar={this.updateSideBar}/>
			<ConfigBox/>
		</div>
        <WikiBox html={this.state.sideBarHTML}/>
      </div>
    )
  }
}



