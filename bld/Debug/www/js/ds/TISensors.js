var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var myapp;
(function (myapp) {
    var ViewData = (function () {
        function ViewData() {
        }
        return ViewData;
    })();
    myapp.ViewData = ViewData;
    var SensorBase = (function () {
        function SensorBase(view, connector, service) {
            this.view = view;
            this.connector = connector;
            this.service = service;
            this.init();
        }
        SensorBase.prototype.start = function () {
        };
        SensorBase.prototype.stop = function () {
        };
        SensorBase.prototype.init = function () {
        };
        return SensorBase;
    })();
    myapp.SensorBase = SensorBase;
    var IRTemperature = (function (_super) {
        __extends(IRTemperature, _super);
        function IRTemperature() {
            _super.apply(this, arguments);
        }
        IRTemperature.prototype.init = function () {
            var chars = this.service.getCharacteristics();
            for (var i = 0, n = chars.length; i < n; i++) {
                var ch = chars[i];
                console.log(ch.name);
                console.log(ch.properties);
            }
        };
        IRTemperature.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        IRTemperature.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        IRTemperature.prototype.initUI = function (view) {
        };
        return IRTemperature;
    })(SensorBase);
    myapp.IRTemperature = IRTemperature;
    var Pressure = (function (_super) {
        __extends(Pressure, _super);
        function Pressure() {
            _super.apply(this, arguments);
        }
        Pressure.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Pressure.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Pressure;
    })(SensorBase);
    myapp.Pressure = Pressure;
    var Humidity = (function (_super) {
        __extends(Humidity, _super);
        function Humidity() {
            _super.apply(this, arguments);
        }
        Humidity.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Humidity.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Humidity;
    })(SensorBase);
    myapp.Humidity = Humidity;
    var Magnetometer = (function (_super) {
        __extends(Magnetometer, _super);
        function Magnetometer() {
            _super.apply(this, arguments);
        }
        Magnetometer.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Magnetometer.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Magnetometer;
    })(SensorBase);
    myapp.Magnetometer = Magnetometer;
    var Accelerometer = (function (_super) {
        __extends(Accelerometer, _super);
        function Accelerometer() {
            _super.apply(this, arguments);
        }
        Accelerometer.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Accelerometer.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Accelerometer;
    })(SensorBase);
    myapp.Accelerometer = Accelerometer;
    var Barometer = (function (_super) {
        __extends(Barometer, _super);
        function Barometer() {
            _super.apply(this, arguments);
        }
        Barometer.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Barometer.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Barometer;
    })(SensorBase);
    myapp.Barometer = Barometer;
    var Gyroscope = (function (_super) {
        __extends(Gyroscope, _super);
        function Gyroscope() {
            _super.apply(this, arguments);
        }
        Gyroscope.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Gyroscope.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Gyroscope;
    })(SensorBase);
    myapp.Gyroscope = Gyroscope;
    var Inputs = (function (_super) {
        __extends(Inputs, _super);
        function Inputs() {
            _super.apply(this, arguments);
        }
        Inputs.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Inputs.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Inputs;
    })(SensorBase);
    myapp.Inputs = Inputs;
    var Generic = (function (_super) {
        __extends(Generic, _super);
        function Generic() {
            _super.apply(this, arguments);
        }
        Generic.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        Generic.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return Generic;
    })(SensorBase);
    myapp.Generic = Generic;
})(myapp || (myapp = {}));
//# sourceMappingURL=TISensors.js.map