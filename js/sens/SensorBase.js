/**
* Created by Vlad on 3/2/2015.
*/
var sens;
(function (sens) {
    var SensorBase = (function () {
        function SensorBase(name, thetag, UUID_DATA, UUID_CONF, UUID_PERIOD) {
            this.id = name;
            this.theTag = thetag;
            this.DATA_ID = UUID_DATA;
            this.CONF_ID = UUID_CONF;
            this.PERIOD_ID = UUID_PERIOD;
            this.characteristics = { config: null, period: null, data: null };
            this.listeners = [];
        }
        SensorBase.prototype.initService = function (service) {
            // this.DATA_ID.test
        };
        return SensorBase;
    })();
    sens.SensorBase = SensorBase;
})(sens || (sens = {}));
//# sourceMappingURL=SensorBase.js.map
