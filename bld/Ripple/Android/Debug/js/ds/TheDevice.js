/// <reference path="constants.ts" />
var myapp;
(function (myapp) {
    var Service = (function () {
        function Service(obj, name, type) {
            this.obj = obj;
            this.name = name;
            this.type = type;
            for (var str in obj) {
                var val = obj[str];
                this[str] = val;
                this[val] = str;
            }
        }
        Service.prototype.getId = function () {
            return this.SERVICE;
        };
        Service.prototype.isSensor = function () {
            return this.type === 1;
        };
        Service.prototype.isInput = function () {
            return this.type === 2;
        };
        Service.prototype.isOther = function () {
            return this.type === 3;
        };

        Service.prototype.initService = function (chars) {
            if (!this.chars) {
                this.chars = chars;
                console.log(this.name + ' got Chars: ');
                console.log(chars);
                console.log('My chars: ');
                console.log(this.obj);

                return true;
            } else
                return false;
        };
        return Service;
    })();

    var TheDevice = (function () {
        function TheDevice(constants) {
            var types = {};
            for (var str in constants.SENSORS) {
                var serv = new Service(constants.SENSORS[str], str, 1);
                types[serv.getId()] = serv;
            }
            for (var str in constants.INPUTS) {
                var serv = new Service(constants.INPUTS[str], str, 2);
                types[serv.getId()] = serv;
            }
            for (var str in constants.OTHERS) {
                var serv = new Service({ SERVICE: constants.OTHERS[str] }, str, 3);
                types[serv.getId()] = serv;
            }
            this.sensorTypes = types;
            this.constants = constants;
            console.log('The Device types: ', types);
        }
        TheDevice.prototype.getSeviceById = function (id) {
            return this.sensorTypes[id];
        };

        TheDevice.prototype.addService = function (obj) {
            var uuid = obj.serviceUuid;
            if (uuid) {
                var ser = this.getSeviceById(uuid);
                if (ser) {
                    if (ser.initService(obj.characteristics)) {
                        console.log('Service initialized ' + ser.name);
                    } else
                        console.log('ERROR duplicate service ' + uuid, obj);
                }
            }
        };
        TheDevice.prototype.setServices = function (ar) {
            var out = [];
            var chars = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                this.addService(ar[i]);
                // var serv: BleService  = new BleService(ar[i])
                // out.push(serv);
                // chars = chars.concat(serv.getAllChars());
            }
            this.servs = out;
            return chars;
        };
        return TheDevice;
    })();
    myapp.TheDevice = TheDevice;

    var BleService = (function () {
        function BleService(obj) {
            var id = obj.serviceUuid;
            this.serviceUuid = id;
            var ar = obj.characteristics;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new VoChars(ar[i], id));
            }

            this.characteristics = out;
        }
        BleService.prototype.getAllChars = function () {
            return this.characteristics;
        };
        return BleService;
    })();
    myapp.BleService = BleService;

    var VoChars = (function () {
        function VoChars(obj, serviceUuid) {
            this.serviceUuid = serviceUuid;
            for (var str in obj)
                this[str] = obj[str];
        }
        return VoChars;
    })();
    myapp.VoChars = VoChars;
})(myapp || (myapp = {}));
//# sourceMappingURL=TheDevice.js.map
