/// <reference path="ds/thedevice.ts" />


var bluetoothle: bluetoothle;
var CLICK = 'click';
var DISABLED = 'disabled';
var CHANGE = 'change';
var TISensorTag;



$(document).ready(function () {

  var  onDeviceReady = function () {
        console.log(bluetoothle);
      if (bluetoothle) {
          var conn:ble.BLEConnector = new ble.BLEConnector(bluetoothle)
            var stratup = new myapp.StartUp(conn);
            var dvs: myapp.TheDevice;
            var constants: {} = {};
            for (var str in CONSTS) constants[CONSTS[str]] = str;

            var allSensors: myapp.SensorBase[] =[];

            var  onAllClick = function(evt:JQueryEventObject):void {

            }
            var onSensorClick = function (evt: JQueryEventObject): void {

            }
            stratup.onConnected = function (address) {

                var data = stratup.getServicesByAddress(address);
                dvs = new myapp.TheDevice(data,constants);
                var servs: myapp.TheService[] = dvs.getServices();
                console.log('connector connected  to address ' + address);
                for (var i = 0, n = servs.length; i < n; i++) {
                    var ser: myapp.TheService = servs[i]; 
                    console.log(ser.name);
                    switch (ser.name) {
                        case 'IRTEMPERATURE_SERVICE':
                            allSensors.push(new myapp.IRTemperature($('#irtemperature'), conn, ser));   
                            break;

                    }


                }
              //  console.log(servs);
               

            }
        }
    }
    document.addEventListener('deviceready', onDeviceReady, false);
})


var CONSTS = {
        ACCELEROMETER_SERVICE: 'f000aa10-0451-4000-b000-000000000000',
        ACCELEROMETER_CONFIG: 'f000aa12-0451-4000-b000-000000000000',
        ACCELEROMETER_PERIOD: 'f000aa13-0451-4000-b000-000000000000',
        ACCELEROMETER_DATA: 'f000aa11-0451-4000-b000-000000000000',
        ACCELEROMETER_NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',       
        IRTEMPERATURE_SERVICE: 'f000aa00-0451-4000-b000-000000000000',
        IRTEMPERATURE_CONFIG: 'f000aa02-0451-4000-b000-000000000000',
        IRTEMPERATURE_DATA: 'f000aa01-0451-4000-b000-000000000000',
        IRTEMPERATURE_NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',       
        HUMIDITY_SERVICE: 'f000aa20-0451-4000-b000-000000000000',
        HUMIDITY_CONFIG: 'f000aa22-0451-4000-b000-000000000000',
        HUMIDITY_DATA: 'f000aa21-0451-4000-b000-000000000000',
        HUMIDITY_NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',       
        MAGNETOMETER_SERVICE: 'f000aa30-0451-4000-b000-000000000000',
        MAGNETOMETER_CONFIG: 'f000aa32-0451-4000-b000-000000000000',
        MAGNETOMETER_PERIOD: 'f000aa33-0451-4000-b000-000000000000',
        MAGNETOMETER_DATA: 'f000aa31-0451-4000-b000-000000000000',
        MAGNETOMETER_NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',      
        BAROMETER_SERVICE: 'f000aa40-0451-4000-b000-000000000000',
        BAROMETER_CONFIG: 'f000aa42-0451-4000-b000-000000000000',
        BAROMETER_DATA: 'f000aa41-0451-4000-b000-000000000000',
        BAROMETER_CALIBRATION: 'f000aa43-0451-4000-b000-000000000000',       
        GYROSCOPE_SERVICE: 'f000aa50-0451-4000-b000-000000000000',
        GYROSCOPE_CONFIG: 'f000aa52-0451-4000-b000-000000000000',
        GYROSCOPE_PERIOD: 'f000aa53-0451-4000-b000-000000000000',
        GYROSCOPE_DATA: 'f000aa51-0451-4000-b000-000000000000',    
        KEYPRESS_SERVICE: '0000ffe0-0000-1000-8000-00805f9b34fb',
        KEYPRESS_DATA: '0000ffe1-0000-1000-8000-00805f9b34fb',
        KEYPRESS_NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',
        TEST_SERVICS: 'f000aa60-0451-4000-b000-000000000000',
        TEST_DATA: 'f000aa61-0451-4000-b000-000000000000',
        TEST_CONFIG: 'f000aa62-0451-4000-b000-000000000000',
        OAD_SERVICE: 'f000ffc0-0451-4000-b000-000000000000',
        OAD_IDENTIFY: 'f000ffc1-0451-4000-b000-000000000000',
        OAD_BLOCK: 'f000ffc2-0451-4000-b000-000000000000',
        CONNECTION_CONTROL: 'f000ccc0-0451-4000-b000-000000000000',
        CONNECTION_PARAMS: 'f000ccc1-0451-4000-b000-000000000000',
        CONNECTION_REQUESTPARAMS: 'f000ccc2-0451-4000-b000-000000000000',
        CONNECTION_REQUESTDISCONNECT:'f000ccc3-0451-4000-b000-000000000000',       
        NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',       
        GENERIC_ACCESS: '1800',
        GENERIC_ATTRIBUTE: '1801',
        GENERIC_UNKNOWN: '2a05',
        DEVICE_INFORMATION: '180a',
        SIMPLE_KEY: 'ffe0',
        TEST: 'f000aa6004514000b000000000000000',
        TEST_CONFIGURATION: 'f000aa6204514000b000000000000000',
        OAD: 'f000ffc004514000b000000000000000',
        DEVICE_NAME: '2a00',
        APPEARANCE: '2a01',
        PERIPHERAL_PRIVACY_FLAG: '2a02',
        RECONNECTION_ADDRESS: '2a03',
        PERIPHERAL_PREFERRED_CONNECTION_PARAMETERS: '2a04',
        SYSTEM_ID: '2a23',
        MODEL_NUMBER: '2a24',
        SERIAL_NUMBER: '2a25',
        FIRMWARE_REVISION: '2a26',
        HARDWARE_REVISION: '2a27',
        SOFTWARE_REVISION: '2a28',
        MANUFACTURER_NAME: '2a29',
        REGULATORY_CERTIFICATE_DATA_LIST: '2a2a',
        PNP_ID: '2a50',
        SIMPLE_KEY_DATA: 'ffe1'
    }
