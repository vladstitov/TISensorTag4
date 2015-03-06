var tisensor;
(function (tisensor) {
    var ViewData = (function () {
        function ViewData() {
        }
        return ViewData;
    })();
    tisensor.ViewData = ViewData;
    var IRTemperature = (function () {
        function IRTemperature() {
        }
        IRTemperature.prototype.parse = function (rawData) {
            var out = new ViewData;
            return out;
        };
        IRTemperature.prototype.incode = function (data) {
            var out = {};
            return out;
        };
        return IRTemperature;
    })();
    tisensor.IRTemperature = IRTemperature;
    var Pressure = (function () {
        function Pressure() {
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
    })();
    tisensor.Pressure = Pressure;
    var Humidity = (function () {
        function Humidity() {
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
    })();
    tisensor.Humidity = Humidity;
    var Magnetometer = (function () {
        function Magnetometer() {
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
    })();
    tisensor.Magnetometer = Magnetometer;
    var Accelerometer = (function () {
        function Accelerometer() {
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
    })();
    tisensor.Accelerometer = Accelerometer;
    var Barometer = (function () {
        function Barometer() {
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
    })();
    tisensor.Barometer = Barometer;
    var Gyroscope = (function () {
        function Gyroscope() {
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
    })();
    tisensor.Gyroscope = Gyroscope;
    var Inputs = (function () {
        function Inputs() {
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
    })();
    tisensor.Inputs = Inputs;
    var Generic = (function () {
        function Generic() {
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
    })();
    tisensor.Generic = Generic;
})(tisensor || (tisensor = {}));
//# sourceMappingURL=TISensors.js.map