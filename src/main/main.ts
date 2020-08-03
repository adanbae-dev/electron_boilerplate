/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow } from 'electron';
import { mainReloader, rendererReloader } from 'electron-hot-reload';
import * as path from 'path';
import * as url from 'url';


let mainWindow: Electron.BrowserWindow | null;

// hotreload setting
const mainFile = path.join(__dirname, '*.*');
mainReloader(mainFile, undefined, (error, path) => {
    console.log("It is a main's process hook!");
});

function createWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 1000,
        width: 1920,
        webPreferences: {
            webSecurity: false,
            devTools: process.env.NODE_ENV === 'production' ? false : true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

