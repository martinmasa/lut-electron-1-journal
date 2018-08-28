import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx'
import AceEditor from 'react-ace';
import styled from 'styled-components';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/dracula';

import './App.css';

const settings = window.require('electron-settings');
const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');

class App extends Component {
  state = { 
    loadedFile: '',
    directory: settings.get('directory') || null,
    filesData: []
  };

  constructor() {
    super();

    const directory = settings.get('directory');
    if (directory) {
      this.loadAndReadFiles(directory);
    }

    ipcRenderer.on('new-file', (event, fileContent) => {
      this.setState({
        loadedFile: fileContent
      });
    });

    ipcRenderer.on('new-dir', (event, directory) => {
      this.setState({
        directory
      });
      
      settings.set('directory', directory);
      this.loadAndReadFiles(directory);
    });
  }

  loadAndReadFiles = (directory) => {
    fs.readdir(directory, (err, files) => {
      const filteredFiles = files.filter( file => file.endsWith('.md'))
      const filesData = filteredFiles.map( file => ({
        path: `${directory}/${file}`
      }));

      this.setState({
        filesData
      })
    });
  }

  render() {
    const { loadedFile, directory, filesData } = this.state;

    return (
      <div className="App">
        <Header>Journal</Header>
        {directory ? (
          <Split>
            <div>
              {filesData.map((file) => <h1>{file.path}</h1>)}
            </div>
            <CodeWindow>
              <AceEditor
                mode="markdown"
                theme="dracula"
                onChange={(newContent) => {
                  this.setState({ loadedFile: newContent });
                }}
                name="md-editor"
                value={loadedFile}
              />
            </CodeWindow>
            <RenderedWindow>
              <Markdown>{loadedFile}</Markdown>
            </RenderedWindow>
          </Split>
        ) : (
          <LoadingMessage>
            <h1>Press Cmd/Ctrl + O to open directory.</h1>
          </LoadingMessage>
        )
        }
      </div>
    );
  }
}

export default App;

const Header = styled.div`
  background-color: #191324;
  color: #75717c;
  font-size: 0.8rem;
  height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  background-color: #191324;
  height: 100vh;
`;

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`;

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: #FFF;
  border-left: 1px solid #302b3a
  
  h1, h2, h3, h4, h5, h6 {
    color: #82d8d8;
  }

  h1 {
    border-bottom: 3px solid #E54B4B;
    padding-bottom: 10px;
  }

  a {
    color: #E54B4B;
  }
`;