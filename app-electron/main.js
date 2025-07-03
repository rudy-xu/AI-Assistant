const path = require('path');
const fs = require('fs')

const {app, BrowserWindow} = require('electron');
const configPath = path.join(app.getAppPath(), 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,    
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  console.log('URL is: ',config.webUrl);
  win.loadURL(config.webUrl);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});