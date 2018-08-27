import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/dracula';

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
    const { loadedFile } = this.state;

    return (
      <div className="App">
        <AceEditor
          mode="markdown"
          theme="dracula"
          onChange={(newContent) => {
            this.setState({ loadedFile: newContent });
          }}
          name="md-editor"
          value={loadedFile}
        />
        
        <Markdown>{loadedFile}</Markdown>
      </div>
    );
  }
}

export default App;
