/// <reference path="typings/jquery.d.ts" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var bluetoothle;
var CLICK = 'click';
var DISABLED = 'disabled';
var CHANGE = 'change';
var TISensorTag;
var BLEStart;
(function (BLEStart) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        var sensorTag;
        function initialiseSensortag() {
            var sensorTag = TISensorTag.createInstance();
            // Here sensors are set up.
            // First parameter is the callback function.
            // Accelerometer, Magnetometer and Gyroscope take a
            // millisecond update interval as the last parameter.
            // Gyroscope takes the axes to enable as second parameter:
            // 1 to enable X axis only, 2 to enable Y axis only, 3 = X and Y,
            // 4 = Z only, 5 = X and Z, 6 = Y and Z, 7 = X, Y and Z.
            sensorTag.statusCallback(statusHandler).errorCallback(errorHandler).keypressCallback(keypressHandler).irTemperatureCallback(irTemperatureHandler).humidityCallback(humidityHandler).barometerCallback(barometerHandler).accelerometerCallback(accelerometerHandler, 200).magnetometerCallback(magnetometerHandler, 200).gyroscopeCallback(gyroscopeHandler, 7, 200).connectToClosestDevice();
        }
        function statusHandler(status) {
            displayValue('StatusData', status);
        }
        function errorHandler(error) {
            displayValue('StatusData', 'Error: ' + error);
            if ('disconnected' == error) {
                // If disconneted attempt to connect again.
                setTimeout(function () {
                    sensorTag.connectToClosestDevice();
                }, 1000);
            }
        }
        function keypressHandler(data) {
            displayValue('KeypressData', data[0]);
            if (data[0] == 1) {
                document.body.style.background = 'red';
            }
            else if (data[0] == 2) {
                document.body.style.background = 'blue';
            }
        }
        function irTemperatureHandler(data) {
            displayValue('IRTemperatureData', data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3]);
        }
        function accelerometerHandler(data) {
            //console.log('length: ' + data.length)
            //console.log('acceldata: ' + data[0] + ' ' + data[1] + ' ' + data[2])
            var x = data[0] / 16;
            var y = data[1] / 16;
            var z = data[2] / 16;
            var g = Math.sqrt((x * x) + (y * y) + (z * z));
            displayValue('AccelerometerData', 'x = ' + x + '<br/>y = ' + y + '<br/>z = ' + z + '<br/>g = ' + g);
        }
        function humidityHandler(data) {
            displayValue('HumidityData', data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3]);
        }
        function magnetometerHandler(data) {
            displayValue('MagnetometerData', data[0] + ',' + data[1] + ',' + data[2]);
        }
        function barometerHandler(data) {
            displayValue('BarometerData', data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3]);
        }
        function gyroscopeHandler(data) {
            displayValue('GyroscopeData', data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ',' + data[4] + ',' + data[5]);
        }
        function displayValue(elementId, value) {
            document.getElementById(elementId).innerHTML = value;
        }
        function onBLEConnectd() {
        }
        function onBLEDisconnected() {
        }
        var myble;
        function startApp() {
            console.log('AttemptTo start');
            if (!bluetoothle)
                setTimeout(startApp, 1000);
            else {
                myble = new myapp.BLEConnect(bluetoothle);
                myble.onConnected = onBLEConnectd;
                myble.onDisconnectd = onBLEDisconnected;
            }
        }
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            startApp();
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = BLEStart.Application || (BLEStart.Application = {}));
})(BLEStart || (BLEStart = {}));
//# sourceMappingURL=index.js.map