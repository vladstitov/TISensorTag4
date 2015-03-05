/// <reference path="ds/thedevice.ts" />
/// <reference path="ds/constants.ts" />

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
            var connector = new myapp.StartUp(conn);
          var services = new myapp.TheDevice(CONSTS);

            connector.onConnected = function (address) {

                var servs = connector.getServicesByAddress(address);

                var chars = services.setServices(servs);
                console.log('connector connected  to address ' + address);
                console.log(servs);
                console.log(chars);

            }
        }
    }
    document.addEventListener('deviceready', onDeviceReady, false);
})


var CONSTS = {
    SENSORS: {
        ACCELEROMETER: {
            SERVICE: 'f000aa10-0451-4000-b000-000000000000',
            CONFIG: 'f000aa12-0451-4000-b000-000000000000',
            PERIOD: 'f000aa13-0451-4000-b000-000000000000',
            DATA: 'f000aa11-0451-4000-b000-000000000000',
            NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb'
        },
        IRTEMPERATURE: {
            SERVICE: 'f000aa00-0451-4000-b000-000000000000',
            CONFIG: 'f000aa02-0451-4000-b000-000000000000',
            DATA: 'f000aa01-0451-4000-b000-000000000000',
            NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb'
        },
        HUMIDITY: {
            SERVICE: 'f000aa20-0451-4000-b000-000000000000',
            CONFIG: 'f000aa22-0451-4000-b000-000000000000',
            DATA: 'f000aa21-0451-4000-b000-000000000000',
            NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb'
        },
        MAGNETOMETER: {
            SERVICE: 'f000aa30-0451-4000-b000-000000000000',
            CONFIG: 'f000aa32-0451-4000-b000-000000000000',
            PERIOD: 'f000aa33-0451-4000-b000-000000000000',
            DATA: 'f000aa31-0451-4000-b000-000000000000',
            NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb'
        },

        BAROMETER: {
            SERVICE: 'f000aa40-0451-4000-b000-000000000000',
            CONFIG: 'f000aa42-0451-4000-b000-000000000000',
            DATA: 'f000aa41-0451-4000-b000-000000000000'

        },
        GYROSCOPE: {
            SERVICE: 'f000aa50-0451-4000-b000-000000000000',
            CONFIG: 'f000aa52-0451-4000-b000-000000000000',
            PERIOD: 'f000aa53-0451-4000-b000-000000000000',
            DATA: 'f000aa51-0451-4000-b000-000000000000'
        }
        
    },
    INPUTS: {
        KEYPRESS: {
            SERVICE: '0000ffe0-0000-1000-8000-00805f9b34fb',
            DATA: '0000ffe1-0000-1000-8000-00805f9b34fb',
            NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb'
        }
    },
    OTHERS: {
        NOTIFICATION: '00002902-0000-1000-8000-00805f9b34fb',
        PRESSURE_CALIBRATION: 'f000aa4304514000b000000000000000',
        GENERIC_ACCESS: '1800',
        GENERIC_ATTRIBUTE: '1801',
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
}