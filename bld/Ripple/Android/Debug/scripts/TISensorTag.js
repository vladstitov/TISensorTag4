/// <reference path="typings/bluetoothle.d.ts" />
var sensors;
(function (sensors) {
    var TISeansorTag = (function () {
        function TISeansorTag(bluetoothle) {
            this.ble = bluetoothle;
        }
        return TISeansorTag;
    })();
    sensors.TISeansorTag = TISeansorTag;
})(sensors || (sensors = {}));
//# sourceMappingURL=TISensorTag.js.map
