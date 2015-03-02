/// <reference path="typings/bluetoothle.d.ts" />
var ble;
(function (_ble) {
    var BLEConnector = (function () {
        function BLEConnector() {
        }
        BLEConnector.prototype.init1 = function (ble) {
            this.ble = ble;
            return this;
        };
        return BLEConnector;
    })();
    _ble.BLEConnector = BLEConnector;
})(ble || (ble = {}));
