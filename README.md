# Electron Journal

LevelUp Tutorials - [Level 1 Electron](https://www.leveluptutorials.com/tutorials/level-1-electron/) - complete journaling app where you can write, read, and save files.

## Notes

- install react devtools in electron console - `require('electron-react-devtools').install()`

---

### Lesson 20 - Building the app

#### Generate Icons

- install [electron-icon-maker](https://github.com/jaretburkett/electron-icon-maker) globally - `npm install -g electron-icon-maker`
- generate icon `electron-icon-maker --input=/absolute/path/file.png --output=./relative/path/to/folder`
- input file should be 1024px x 1024px or larger. Make sure it is a 1:1 aspect ratio on width to height.
- icons should live in `{project-folder}/assets` folder as follows

```
assets
├── icon.icns
├── icon.ico
└── icons
    ├── 1024x1024.png
    ├── 128x128.png
    ├── 16x16.png
    ├── 24x24.png
    ├── 256x256.png
    ├── 32x32.png
    ├── 48x48.png
    ├── 512x512.png
    ├── 64x64.png
```

#### Build App

- install [electron-builder](https://www.electron.build/) - `yarn add electron-builder --dev`
- move `src/main.js` => `build/electron.js`
- update package.json with electron build config properties
- add dev configuration in main electron file using `electron-is-dev` package

---

### Modifications

[`src/App.js`](src/App.js)

- use [`String.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) to extract the `date` and `title` from the filename when reading files from directory in `loadAndReadFiles()`

```javascript
const filesData = filteredFiles.map( file => {
  const fileName = file.split('.md')[0];
  return {
    date: fileName.split('_')[1],
    path: `${directory}/${file}`,
    title: fileName.split('_')[0],
    key: fileName.replace(' ','-')
  };
});
```

- add key to `filesData` objects + add to `<FileButton>` component
- set `activeIndex` state value to 0 in `createFile()` to ensure newly created file is selected