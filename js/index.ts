
var bluetoothle: bluetoothle;
var CLICK = 'click';
var DISABLED = 'disabled';
var CHANGE = 'change';
var TISensorTag;



$(document).ready(function () {
  var  onDeviceReady = function () {
        console.log(bluetoothle);
        if (bluetoothle) {
            var connector = new myapp.BLEConnect(bluetoothle);
            var services = new myapp.BleServices();

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