/// <reference path="../ble/bleconnector.ts" />
/**
* Created by Vlad on 3/2/2015.
*/
var sens;
(function (sens) {
    var SensorBase = (function () {
        function SensorBase(name, connector, UUID_DATA, UUID_CONF, UUID_PERIOD) {
            this.id = name;
            this.conn = connector;
            this.DATA_ID = UUID_DATA;
            this.CONF_ID = UUID_CONF;
            this.PERIOD_ID = UUID_PERIOD;
            this.characteristics = { config: null, period: null, data: null };
            this.listeners = [];
        }
        SensorBase.prototype.initService = function (service) {
            // this.DATA_ID.test
            // for (var ci in service.characteristics) {
            //  var uuid =
            //}
        };

        SensorBase.prototype.enable = function (value) {
            var val = value || 1;
            // this.conn.wr
        };
        return SensorBase;
    })();
    sens.SensorBase = SensorBase;
})(sens || (sens = {}));
//# sourceMappingURL=SensorBase.js.map
