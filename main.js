/**
 *
 * poolcontroller adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "poolcontroller",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js poolcontroller Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@poolcontroller.com>"
 *          ]
 *          "desc":         "poolcontroller adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "materialize":  true,                       // support of admin3
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42,
 *          "mySelect": "auto"
 *      }
 *  }
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

// you have to require the utils module and call adapter function
var utils =    require(__dirname + '/lib/utils'); // Get common adapter utils
var request = require('request');
// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.poolcontroller.0
var adapter = new utils.Adapter('poolcontroller');

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
    try {
        adapter.log.info('cleaned everything up...');
        callback();
    } catch (e) {
        callback();
    }
});

// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
    // Warning, obj can be null if it was deleted
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

// is called if a subscribed state changes
adapter.on('stateChange', function (id, state) {
    // Warning, state can be null if it was deleted
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    // you can use the ack flag to detect if it is status (true) or command (false)
    if (state && !state.ack) {
        adapter.log.info('ack is not set!');
    }
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
    if (typeof obj === 'object' && obj.message) {
        if (obj.command === 'send') {
            // e.g. send email or pushover or whatever
            console.log('send command');

            // Send response in callback if required
            if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
        }
    }
});

// is called when databases are connected and adapter received configuration.
// start here!
adapter.on('ready', function () {
    main();
});

function main() {
    adapter.log.info('config host: '    + adapter.config.host);
    adapter.log.info('config port: '    + adapter.config.port);
    adapter.log.info('config interval: ' + adapter.config.interval);





var host = adapter.config.host
var port = adapter.config.port
var interval = adapter.config.interval


var url='http://192.168.178.35:80/GetState.csv'

//*********************************************************************
var result, json;
var stateanlegen = true;

//SYSINFO Variablen anlegen
   
 adapter.setObject('sysinfo.VERSION', {
        type: 'state',
        common: {
            name: 'VERSION',
            type: 'string',
            read: true,
            write: false
        },
        native: {}
    });               
 
 adapter.setObject('sysinfo.RESET_ROOT_CAUSE', {
        type: 'state',
        common: {
            name: 'RESET_ROOT_CAUSE',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });               

 adapter.setObject('sysinfo.pH-_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'pH-_DOSAGE_RELAIS_ID',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObject('sysinfo.pH+_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'pH+_DOSAGE_RELAIS_ID',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObject('sysinfo.NTP_FAULT_STATE', {
        type: 'state',
        common: {
            name: 'NTP_FAULT_STATE',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });

 adapter.setObject('sysinfo.DOSAGE_CNTRL', {
        type: 'state',
        common: {
            name: 'DOSAGE_CNTRL',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObject('sysinfo.CPU_TIME', {
        type: 'state',
        common: {
            name: 'CPU_TIME',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObject('sysinfo.CONFIG_OTHER_ENABLE', {
        type: 'state',
        common: {
            name: 'CONFIG_OTHER_ENABLE',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
    
  adapter.setObject('sysinfo.Chlor_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'Chlor_DOSAGE_RELAIS_ID',
            type: 'number',
            read: true,
            write: false
        },
        native: {}
    });
   
//#################################################################

  if (stateanlegen === true){
    // User Variablen anlegen Achtung keine Punkte im Namen verwenden. 
    var i=0;
    for (i=0; i<=41;i++){
        adapter.setObject(+jdata[1][i],'', {
        name: ''+jdata[1][i],
        type: 'number',
        unit: ''+jdata[2][i],
        write: false,
        read:  true
        });
    }
    console.log("Variablen angelegt");
    stateanlegen = false;
  }
  else {
  
  //SYSINFO Variablen mit aktuellen Werten beschreiben 
    adapter.setState('sysinfo.VERSION', jdata[0][1]);
    adapter.setState('sysinfo.CPU_TIME', parseFloat(Number(jdata[0][2]).toFixed(2)));
    adapter.setState('sysinfo.RESET_ROOT_CAUSE', parseFloat(Number(jdata[0][3]).toFixed(2))); 
    adapter.setState('sysinfo.NTP_FAULT_STATE', parseFloat(Number(jdata[0][4]).toFixed(2)));
    adapter.setState('sysinfo.CONFIG_OTHER_ENABLE', parseFloat(Number(jdata[0][5]).toFixed(2)));
    adapter.setState('sysinfo.DOSAGE_CNTRL', parseFloat(Number(jdata[0][6]).toFixed(2)));
    adapter.setState('sysinfo.pH+_DOSAGE_RELAIS_ID', parseFloat(Number(jdata[0][7]).toFixed(2)));
    adapter.setState('sysinfo.pH-_DOSAGE_RELAIS_ID', parseFloat(Number(jdata[0][8]).toFixed(2)));
    adapter.setState('sysinfo.Chlor_DOSAGE_RELAIS_ID', parseFloat(Number(jdata[0][9]).toFixed(2)));
  
      
   // User Variablen mit aktuellen Werten beschreiben
   i=0; 
    for (i=0; i<=41;i++){
        //var wert = offset + ( gain * value);
       var offset =  parseFloat(jdata[3][i]);
       var gain =   parseFloat(jdata[4][i]);
       var value =   parseFloat(jdata[5][i]);
         var wert =  offset + ( gain * value);
        adapter.setState(+jdata[1][i], parseFloat(Number(wert).toFixed(2)));
         }    
    console.log("Variablen updated");
  }
    }).on("error", function (e) {console.error(e);});
  } catch (e) { console.error(e); }
});


//#################################################################

    
    
    //var url="http://" + host + ":" + port + "/GetState.csv"

//request(
//	{
//		url: "http://192.168.178.35/GetState.csv"
//	},
//	function(error, content)	{
//		adapter.log.debug('Request done');
		
//		if (!error&& responce.statuscode == 200){
//			adapter.log.info(content);
//		} else 	{
//			adapter.log.error(error);
//		}		
//	}
//		);


    adapter.setObject('testVariable', {
        type: 'state',
        common: {
            name: 'testVariable',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });

    // in this poolcontroller all states changes inside the adapters namespace are subscribed
    adapter.subscribeStates('*');


    /**
     *   adapter.setState examples
     *
     *   you will notice that each adapter.setState will cause the stateChange event to fire (because of above subscribeStates cmd)
     *
     */

    // the variable testVariable is set to true as command (ack=false)
    adapter.setState('testVariable', true);

    // same thing, but the value is flagged "ack"
    // ack should be always set to true if the value is received from or acknowledged from the target system
    adapter.setState('testVariable', {val: true, ack: true});

    // same thing, but the state is deleted after 30s (getState will return null afterwards)
    adapter.setState('testVariable', {val: true, ack: true, expire: 30});



    // examples for the checkPassword/checkGroup functions
    adapter.checkPassword('admin', 'iobroker', function (res) {
        console.log('check user admin pw ioboker: ' + res);
    });

    adapter.checkGroup('admin', 'admin', function (res) {
        console.log('check group user admin group admin: ' + res);
    });



}
