
# HMI Master

The HMI for the Mi5 HMI
Currently developing the Serviceskill Interface.

## Installation

1. Download and install [Node.js](http://nodejs.org/download/) (tested with v0.12.0)
2. Download an clone the repository. Make sure you have the 
   [briefcase-branche](https://github.com/ProjectMi5/HMI/tree/briefcase)
3. In a command line window, browse in the repository and execute
  1. `npm install` // this installs the required node modules for the HMI
  2. `npm intsall forever -g` // this installs the forever module globally
4. Run `HMI_Start.cmd` or `HMI_Forever.cmd`

Note: The forever module and file is kind of a dirty hack. Whenever the HMI crashes, 
 it automatically gets restarted.
Note: If you use the `HMI_Forever.cmd` and kill it, make sure you also end the node.exe 
 process in the task manager. The process keeps running (thanks to _forever_),
 and then can lead to a PORT conflict, when restarting.

## Additional information

You can also run the HMI using the node command line. Run then:

* _node app.js_ (this will use the live server configuration and Port 80)

It is possible to use different server confiugrations and ports from the command line. 
For example:

* _node app.js -server=hmitest -port=3000_

* _node app.js -server=hmitest_ (this will use Port 80)

## Revision
Last Update: 2015-03-04 Thomas Frei

---
Deprecated below.

## Developing

* Sapmleserver: 
./misc/myTestSampleServerTriple.js
This Server starts 3 instances with the same variable tree on the ports 4334, 4335, 4336

* JSCS - Control Source:
jscs .

* Information Mocha Testing
http://unitjs.com/guide/mocha.html

* In the misc/ folder you can find a uaexpert file, that connects to this localhost server.
Use this tool to check OPC UA variables.
Also check with the tool, if the sample server is implemented correctly, if something fails.
!!! See following point for Server-Issues in UAExpert

* When the variable-architecture changes, OPC UA is not able to subscribe to a variable anymore.
The Message is: BadDataEncodingUnsupported
Therefore it is necessary to delete the sampleserver from the uaexpert client and then add it again.

## Testing

* For developing purposes, there is a folder called test/ in which all the unit-tests are stored.

* Run: npm test
This executes: "jscs ." and then "mocha" 

* Error Messages:
Sometimes it throws error like certificate, or client.security.
Then just restart both node.js applications some times, and it sould work.

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
