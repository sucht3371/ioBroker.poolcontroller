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


//var url='http://192.168.178.35:80/GetState.csv'


//*********************************************************************
var result, json;
var stateanlegen = true;

//SYSINFO Variablen anlegen
   
 adapter.setObjectNotExists('sysinfo.VERSION', {
        type: 'state',
        common: {
            name: 'VERSION',
            type: 'string',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });               
 
 adapter.setObjectNotExists('sysinfo.RESET_ROOT_CAUSE', {
        type: 'state',
        common: {
            name: 'RESET_ROOT_CAUSE',
            type: 'number',
            role: 'value',            
            read: true,
            write: false
        },
        native: {}
    });               

 adapter.setObjectNotExists('sysinfo.pH-_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'pH-_DOSAGE_RELAIS_ID',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObjectNotExists('sysinfo.pH+_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'pH+_DOSAGE_RELAIS_ID',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObjectNotExists('sysinfo.NTP_FAULT_STATE', {
        type: 'state',
        common: {
            name: 'NTP_FAULT_STATE',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });

 adapter.setObjectNotExists('sysinfo.DOSAGE_CNTRL', {
        type: 'state',
        common: {
            name: 'DOSAGE_CNTRL',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObjectNotExists('sysinfo.CPU_TIME', {
        type: 'state',
        common: {
            name: 'CPU_TIME',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
    
 adapter.setObjectNotExists('sysinfo.CONFIG_OTHER_ENABLE', {
        type: 'state',
        common: {
            name: 'CONFIG_OTHER_ENABLE',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
    
  adapter.setObjectNotExists('sysinfo.Chlor_DOSAGE_RELAIS_ID', {
        type: 'state',
        common: {
            name: 'Chlor_DOSAGE_RELAIS_ID',
            type: 'number',
            role: 'value',
            read: true,
            write: false
        },
        native: {}
    });
   
//#################################################################

    //require("request")(url, function (error, response, result) 
  //  {
		   //   console.log(result);
//		    result = result.replace(/ /g, '_');  //alle Leerzeichen durch Unterstrich ersetzten
//		    var data=CSVToArray(result);         //CSV in ein Array einlesen
//		    json = JSON.stringify(data);         //Array in einen String formatieren
//		    var jdata = JSON.parse(json);        //Json Array erzeugen
//		    var arr1 = jdata[0];                 // Array 0 von ingesamt 6, weil 6 Zeilen im CVS mit \n getrennt
//		    var arr2 = jdata[1];                 // Array 1-5 haben je 42 einzelne  Daten
//		    var arr3 = jdata[2];
//		    var arr4 = jdata[3];
//		    var arr5 = jdata[4];
//		    var arr6 = jdata[5];
   //}


//#################################################################

    
    
    //var url="http://" + host + ":" + port + "/GetState.csv"

request(
	{
		url: "http://" + host + ":" + port + "/GetState.csv"
			},
	function(error, responce, content)	{
		adapter.log.debug('Request done');
		
		if (!error){
			adapter.log.info(content);
			content =content.replace(/ /g, '_'); 	 //alle Leerzeichen durch Unterstrich ersetzten
			var data=CSVToArray(result);         //CSV in ein Array einlesen
			json = JSON.stringify(data);         //Array in einen String formatieren
			var jdata = JSON.parse(json);        //Json Array erzeugen
			var arr1 = jdata[0];				// Array 0 von ingesamt 6, weil 6 Zeilen im CVS mit \n getrennt	
			adapter.log.info(arr1);
			adapter.log.info(content);
		} else 	{
			adapter.log.error(error);
		}		
	}
		);

//##################################################################
    adapter.setObjectNotExists('testVariable', {
        type: 'state',
        common: {
            name: 'testVariable',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });



   
    // the variable testVariable is set to true as command (ack=false)
    adapter.setState('testVariable', true);

    // same thing, but the value is flagged "ack"
    // ack should be always set to true if the value is received from or acknowledged from the target system
    adapter.setState('testVariable', {val: true, ack: true});
    
    
    
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

  

}
