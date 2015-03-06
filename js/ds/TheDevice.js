var myapp;
(function (myapp) {
    var Descriptor = (function () {
        function Descriptor() {
        }
        return Descriptor;
    })();
    var Charc = (function () {
        function Charc(obj, constants) {
            this.characteristicUuid = obj.characteristicUuid;
            this.name = constants[this.characteristicUuid];
            this.descriptors = obj.descriptors;
            this.properties = obj.properties;
        }
        Charc.prototype.getId = function () {
            return this.characteristicUuid;
        };
        return Charc;
    })();
    myapp.Charc = Charc;
    var TheService = (function () {
        function TheService(obj, constants) {
            var charcs = obj.characteristics;
            var uuid = obj.serviceUuid;
            if (!uuid || !charcs) {
                console.log('ERROR no properties serviceUuid or characteristics');
                return;
            }
            this.serviceUuid = uuid;
            this.name = constants[uuid];
            var out = [];
            if (!this.name)
                console.log('UNKNOWN service ' + uuid);
            for (var i = 0, n = charcs.length; i < n; i++) {
                var charc = new Charc(charcs[i], constants);
                out.push(charc);
                if (!charc.name)
                    console.log('UNKNOWN name for characteristicUuid: ' + charc.getId() + ' in Service: ' + this.name);
            }
            this.charcs = out;
        }
        TheService.prototype.getId = function () {
            return this.serviceUuid;
        };
        TheService.prototype.getCharacteristics = function () {
            return this.charcs;
        };
        return TheService;
    })();
    myapp.TheService = TheService;
    var TheDevice = (function () {
        function TheDevice(obj, constants) {
            this.address = obj.address;
            var ar = obj.services;
            var srs = [];
            for (var i = 0, n = ar.length; i < n; i++)
                srs.push(new TheService(ar[i], constants));
            this.servs = srs;
        }
        TheDevice.prototype.getServices = function () {
            return this.servs;
        };
        return TheDevice;
    })();
    myapp.TheDevice = TheDevice;
})(myapp || (myapp = {}));
//# sourceMappingURL=TheDevice.js.map