
import {remote} from 'electron';
import {BrowserWindow} from 'electron-window-manager';

const win2 = browserwindow.createNew('win2', 'Windows #2');
win2.setURL('/win2.html');
win2.onReady(() => {...});
win2.open()



/* <script>
  var remote = require('remote'); var windowManager =
  remote.require('electron-window-manager'); // Create a new window var win2
  =windowManager.createNew('win2', 'Windows #2'); win2.setURL('/win2.html');
  win2.onReady( ... ); win2.open();
</script>; */
