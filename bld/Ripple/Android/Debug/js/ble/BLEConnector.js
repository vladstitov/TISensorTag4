/// <reference path="../../scripts/typings/bluetoothle.d.ts" />
var ble;
(function (ble) {
    var BLEConnector = (function () {
        function BLEConnector(ble) {
            this.init1(ble);
        }
        BLEConnector.prototype.init1 = function (ble) {
            this.ble = ble;

            return this;
        };

        BLEConnector.prototype.initialize = function (successCallback, errorCallback, params) {
            this.ble.initialize(successCallback, errorCallback, params);
        };
        BLEConnector.prototype.enable = function (successCallback, errorCallback) {
            this.ble.enable(successCallback, errorCallback);
        };

        BLEConnector.prototype.disable = function (successCallback, errorCallback) {
            this.ble.disable(successCallback, errorCallback);
        };

        BLEConnector.prototype.startScan = function (successCallback, errorCallback, params) {
            this.ble.startScan(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.stopScan = function (successCallback, errorCallback) {
            this.ble.stopScan(successCallback, errorCallback);
        };
        BLEConnector.prototype.retrieveConnected = function (successCallback, errorCallback, params) {
            this.ble.retrieveConnected(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.connect = function (successCallback, errorCallback, params) {
            this.ble.connect(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.reconnect = function (successCallback, errorCallback, params) {
            this.ble.reconnect(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.disconnect = function (successCallback, errorCallback, params) {
            this.ble.disconnect(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.close = function (successCallback, errorCallback, params) {
            this.ble.close(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.discover = function (successCallback, errorCallback, params) {
            this.ble.discover(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.services = function (successCallback, errorCallback, params) {
            this.ble.services(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.characteristics = function (successCallback, errorCallback, params) {
            this.ble.characteristics(successCallback, errorCallback, params);
        };
        BLEConnector.prototype.descriptors = function (successCallback, errorCallback, params) {
            this.ble.descriptors(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.read = function (successCallback, errorCallback, params) {
            this.ble.read(successCallback, errorCallback, params);
        };
        BLEConnector.prototype.subscribe = function (successCallback, errorCallback, params) {
            this.ble.subscribe(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.unsubscribe = function (successCallback, errorCallback, params) {
            this.ble.unsubscribe(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.write = function (successCallback, errorCallback, params) {
            this.ble.write(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.readDescriptor = function (successCallback, errorCallback, params) {
            this.readDescriptor(successCallback, errorCallback, params);
        };

        BLEConnector.prototype.writeDescriptor = function (successCallback, errorCallback, params) {
            this.ble.writeDescriptor(successCallback, errorCallback, params);
        };
        BLEConnector.prototype.rssi = function (successCallback, errorCallback, params) {
            this.ble.rssi(successCallback, errorCallback, params);
        };
        BLEConnector.prototype.isInitialized = function (successCallback) {
            this.ble.isInitialized(successCallback);
        };
        BLEConnector.prototype.isEnabled = function (successCallback) {
            this.ble.isEnabled(successCallback);
        };
        BLEConnector.prototype.isScanning = function (successCallback) {
            this.ble.isScanning(successCallback);
        };
        BLEConnector.prototype.isConnected = function (successCallback, params) {
            this.ble.isConnected(successCallback, params);
        };
        BLEConnector.prototype.isDiscovered = function (successCallback, params) {
            this.ble.isDiscovered(successCallback, params);
        };

        BLEConnector.prototype.encodedStringToBytes = function (str) {
            var data = atob(str);
            var bytes = new Uint8Array(data.length);
            for (var i = 0; i < bytes.length; i++) {
                bytes[i] = data.charCodeAt(i);
            }
            return bytes;
        };
        BLEConnector.prototype.bytesToEncodedString = function (bytes) {
            return btoa(String.fromCharCode.apply(null, bytes));
        };

        BLEConnector.prototype.stringToBytes = function (str) {
            var bytes = new ArrayBuffer(str.length * 2);
            var bytesUint16 = new Uint16Array(bytes);
            for (var i = 0; i < str.length; i++) {
                bytesUint16[i] = str.charCodeAt(i);
            }
            return new Uint8Array(bytesUint16);
        };

        BLEConnector.prototype.bytesToString = function (bytes) {
            return String.fromCharCode.apply(null, new Uint16Array(bytes));
        };
        return BLEConnector;
    })();
    ble.BLEConnector = BLEConnector;
})(ble || (ble = {}));
//# sourceMappingURL=BLEConnector.js.map
