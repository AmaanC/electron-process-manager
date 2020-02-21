const { EventEmitter } = require('events');
const process = require('process');
const  { webContents } = require('electron');

var ProcessManagerWindow = require('./ProcessManagerWindow.js');

const defaultOptions = { defaultSorting: { path: null, how: null } };

class ProcessManager extends EventEmitter {

  constructor() {
    super();

    // legacy
    this.openProcessManager = this.open.bind(this);
  }

  open (options = defaultOptions) {
    if (this.window) {
      this.window.focus();
    }

    this.window = new ProcessManagerWindow();
    this.window.defaultSorting = options.defaultSorting || {};
    this.window.showWhenReady();
    this.window.on('stop-process', pid => this.stopProcess(pid))
    this.window.on('cont-process', pid => this.contProcess(pid))
    this.window.on('open-dev-tools', webContentsId => this.openDevTools(webContentsId))
    this.window.on('closed', () => this.window = null)
    this.emit('open-window', this.window);

    return this.window;
  }

  contProcess(pid) {
    this.emit('will-cont-process', pid, this.window);
      process.kill(pid, 'SIGCONT');
    this.emit('continued-process', pid, this.window);
  }

  stopProcess(pid) {
    this.emit('will-stop-process', pid, this.window);
      process.kill(pid, 'SIGSTOP');
    this.emit('stopped-process', pid, this.window);
  }

  openDevTools(webContentsId) {
    this.emit('will-open-dev-tools', webContentsId, this.window);

    const wc = webContents.fromId(webContentsId);
    wc.openDevTools({ mode: 'detach' });

    this.emit('did-open-dev-tools', webContentsId, this.window);
  }

}

module.exports = ProcessManager;
