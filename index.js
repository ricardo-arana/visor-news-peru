const { app, BrowserWindow } = require('electron')

try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.hola  = 'mundo'
  win.loadFile('./public/index.html');
  
}

app.whenReady().then(createWindow)

app.on('resize', function(e,x,y){
    mainWindow.setSize(x, y);
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})