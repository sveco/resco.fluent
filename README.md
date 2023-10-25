# resco.fluent
Fluent JS wrapper for Resco JSBridge.

## Installation

Create a new folder and open a terminal. Run following commands within the folder (one per line):
```console
  git clone https://github.com/sveco/resco.fluent.git
  
  cd resco.fluent
  
  npm install
```

## Usage

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

## Disclaimer

This code is provided as-is and is not intended for production use. It is distributed for educational and demo purposes only. You should exercise caution and thoroughly test this code in your own environment before considering any production deployment. The author and contributors make no warranties or guarantees regarding the performance, security, or suitability of this code for any specific purpose. Any use of this code in a production or live environment is at your own risk, and you assume full responsibility for any potential issues or consequences that may arise. By using this code, you acknowledge and accept these terms and conditions.

Copyright (c) [2023] [by Janko Svetlik]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

