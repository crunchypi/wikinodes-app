import React, { Component } from 'react'
import './App.css';
import Graph from './components/graph/Graph'
import WikiBox from './components/wikibox/WikiBox'
import ConfigBox from './components/cfgbox/ConfigBox.js'
import SearchBar from './components/searchbar/SearchBar.jsx'

import CallbackManager from './callbackmanager/callbackmanager.js'
// # Dirty cheat.
const style = {
  display: 'flex',
  alignItems: 'center'
}


export default class App extends Component {
  state = {callbackManager: new CallbackManager()}

  render() {
    return (
      <div className="App">
        <SearchBar callbackManager={this.state.callbackManager}/>
		<div style={style}>
        	<Graph callbackManager={this.state.callbackManager}/>
			<ConfigBox/>
		</div>
        <WikiBox callbackManager={this.state.callbackManager}/>
      </div>
    )
  }
}
