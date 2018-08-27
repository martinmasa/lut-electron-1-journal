import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx'
import AceEditor from 'react-ace';
import styled from 'styled-components';
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
        <Header>Journal</Header>

        <Split>
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