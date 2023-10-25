# resco.fluent
Fluent JS wrapper for Resco JSBridge.

**Installation**

Create a new folder and open a terminal. Run following commands within the folder (one per line):
```console
  git clone https://github.com/sveco/resco.fluent.git
  
  cd resco.fluent
  
  npm install
```

Open repo folder with Vscode with [Task Explorer](https://marketplace.visualstudio.com/items?itemName=spmeesseman.vscode-taskexplorer) extension installed.

Use build npm task to compile sources. Alternatively, you can run npm build without the extension by executing following command in the VScode terminal:
```console
npm run build
```

After executing this task, complied code will be placed in **dist** folder.

Adjust copy_for_debug command in package.json line 11 to point to your Resco Mobile CRM appdata folder:

```
"copy_for_debug": "copyfiles -f ./dist/js/*.* ../../../AppData/Roaming/<REPLACE WITH CORRECT PATH>/WWW/js/"
```

Then you can use copy_for_debug npm command to test your code locally [using debug version of Resco CRM Mobile app](https://github.com/Resconet/JSBridge/tree/master/MobileCRM)- by starting the app and opening (http://localhost:9000/) in a Chrome browser.
