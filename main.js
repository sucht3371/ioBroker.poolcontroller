
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
  //  adapter.log.info('config host: '    + adapter.config.host);
  //  adapter.log.info('config port: '    + adapter.config.port);
  //  adapter.log.info('config interval: ' + adapter.config.interval);

var host = adapter.config.host
var port = adapter.config.port
var interval = adapter.config.interval
var result, json;


//SYSINFO Variablen anlegen
   
 adapter.setObjectNotExists('sysinfo.VERSION', {
        type: 'state',
        common: {
            name: 'VERSION',
            type: 'number',
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

request(
	{
		url: "http://" + host + ":" + port + "/GetState.csv"
			},
		function(error, responce, content)	{
			adapter.log.debug('Request done');
			
			if (!error){
				
				content =content.replace(/ /g, '_'); 	 //alle Leerzeichen durch Unterstrich ersetzten
				var data=CSVToArray(content);         //CSV in ein Array einlesen
				json = JSON.stringify(data);         //Array in einen String formatieren
				var jdata = JSON.parse(json);        //Json Array erzeugen
								
			    // User Variablen anlegen Achtung keine Punkte im Namen verwenden. 
			    var i=0;
			    for (i=0; i<=41;i++){
			        adapter.setObjectNotExists(jdata[1][i], {
			        type: 'state',
			        common:   {              
			        	name: jdata[1][i],
			        	type: 'number',
			        	unit: jdata[2][i],
			        	role: 'value',
			        	write: false,
			        	read:  true
			        },        
			        	
			        });
			    }
			   
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
			       var wert = offset + ( gain * value);
			       var offset =  parseFloat(jdata[3][i]);
			       var gain =   parseFloat(jdata[4][i]);
			       var value =   parseFloat(jdata[5][i]);
			       var wert =  offset + ( gain * value);
			       adapter.setState(jdata[1][i], parseFloat(Number(wert).toFixed(2)));
			       }    
			    
			   adapter.log.info("Variablen updated"); 
			   setTimeout(function() {
			   		adapter.log.info("warten");
			   },10000);				
			
			
		} 
		else 	{
			adapter.log.error(error);
		}		
	}
);


    
//###########################################################################################    
    
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
