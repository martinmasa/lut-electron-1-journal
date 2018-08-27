import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx'

import './App.css';

const { ipcRenderer } = window.require('electron');
class App extends Component {
  state = { 
    loadedFile: ''
  };

  constructor() {
    super();

    ipcRenderer.on('new-file', (event, fileContent) => {
      this.setState({
        loadedFile: fileContent
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Markdown>{this.state.loadedFile}</Markdown>
      </div>
    );
  }
}

export default App;
