var myapp;
(function (myapp) {
    var BleServices = (function () {
        function BleServices() {
            console.log('BleServices');
        }
        BleServices.prototype.setServices = function (ar) {
            var out = [];
            var chars = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var serv = new BleService(ar[i]);
                out.push(serv);
                chars = chars.concat(serv.getAllChars());
            }
            this.servs = out;
            return chars;
        };
        return BleServices;
    })();
    myapp.BleServices = BleServices;
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
//# sourceMappingURL=BleServices.js.map