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
          var services = new myapp.TheDevice(COSTS);

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