/// <reference path="constants.ts" />
var myapp;
(function (myapp) {
    var Descriptor = (function () {
        function Descriptor() {
        }
        return Descriptor;
    })();

    var Chars = (function () {
        function Chars(obj, name) {
            this.read = false;
            this.write = false;
            this.notify = false;
            for (var str in obj) {
                this[str] = obj[str];
            }
            if (obj.descriptors) {
                var ar = [];
                for (var i = 0, n = obj.descriptors.length; i < n; i++)
                    ar.push(obj.descriptors[i].descriptorUuid);
                this.descrs = ar;
            }

            if (obj.properties)
                for (var str in obj.properties)
                    this[str] = obj.properties[str];
        }
        return Chars;
    })();

    var Service = (function () {
        function Service(obj, name, type) {
            this.obj = obj;
            this.name = name;
            this.type = type;
            var kn = {};
            for (var str in obj) {
                var val = obj[str];
                this[str] = val;
                kn[val] = str;
            }
            this.known = kn;
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

        Service.prototype.initService = function (obj) {
            var chars = obj.characteristics;
            if (!this.chars) {
                this.characteristics = chars;
                var chr = {};
                var kn = this.known;
                for (var i = 0, n = chars.length; i < n; i++) {
                    var id = chars[i].characteristicUuid;
                    var name = kn[id];
                    if (!name)
                        console.log('Unknown from device characteristic of: ' + this.name + ' ' + id);
                    chr[id] = new Chars(chars[i], name);
                }
                this.chars = chr;

                // console.log(this.name + ' got Chars: ');
                // console.log(chars);
                // console.log('My chars: ');
                // console.log(this.obj);
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
                    if (ser.initService(obj)) {
                        console.log('Service initialized ' + ser.name);
                        return ser;
                    } else
                        console.log('ERROR duplicate service ' + uuid, obj);
                }
            }
            return null;
        };
        TheDevice.prototype.setServices = function (ar) {
            var srs = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                srs.push(this.addService(ar[i]));
            }
            this.servs = srs;
            return srs;
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
