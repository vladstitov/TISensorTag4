/// <reference path="typings/bluetoothle.d.ts" />
var myapp;
(function (myapp) {
    var BLEConnect = (function () {
        function BLEConnect(b) {
            var _this = this;
            this.devices = {};
            this.onConnected = function (evt) {
            };
            this.onDisconnected = function (evt) {
            };
            this.ble = b;
            this.servicesObj = {};
            var paramsObj = { request: true };
            b.initialize(function (evt) { return _this.initializeSuccess(evt); }, function (evt) { return _this.initializeError(evt); }, { request: true });
            //console.log('Started App ', b);
            this.btnStopScan = $('#btnStopScan').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onStopScanClick(evt); });
            this.btnStartScan = $('#btnStartScan').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onStartScanClick(evt); });
            this.btnConnect = $('#btnConnect').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onConnectClick(evt); });
            this.message = $('#message');
            this.selDevices = $('#devices').on(CHANGE, null, function (evt) { return _this.onSelDevicesChange(evt); });
        }
        BLEConnect.prototype.getServicesByAddress = function (address) {
            var obj = this.servicesObj[address];
            return obj.services;
        };
        BLEConnect.prototype.onAndroidServicesSuccess = function (evt) {
            console.log('onAndroidServicesSuccess ' + evt.status);
            if (evt.status == 'discovered') {
                this.servicesObj[evt.address] = evt;
                this.onConnected(evt.address);
            }
            else
                console.log('onCharacteristicsSuccess', evt);
        };
        BLEConnect.prototype.onAndroidServicesError = function (obj) {
            console.log('onAndroidServicesError: ', obj);
        };
        BLEConnect.prototype.discover = function (address) {
            var _this = this;
            console.log('this.ble.discover ' + address);
            this.ble.discover(function (evt) { return _this.onAndroidServicesSuccess(evt); }, function (obj) { return _this.onAndroidServicesError(obj); }, { address: address });
        };
        BLEConnect.prototype.getServices = function (address) {
            this.discover(address);
        };
        BLEConnect.prototype.onConnectSuccess = function (evt) {
            console.log('onConnectSuccess: ', evt.status);
            if (evt.status == 'connected') {
                var addr = evt.address;
                if (typeof addr == 'string' && addr.length > 2) {
                    if (this.servicesObj[evt.address])
                        this.onConnected(evt.address);
                    else
                        this.getServices(evt.address);
                }
            }
            // else console.log('onConnectSuccess', evt);
            //console.log(evt);
        };
        BLEConnect.prototype.onConnectError = function (evt) {
            console.log('onConnectError ', evt);
        };
        BLEConnect.prototype.connect = function (addr) {
            var _this = this;
            this.ble.connect(function (evt) { return _this.onConnectSuccess(evt); }, function (evt) { return _this.onConnectError(evt); }, { address: addr });
        };
        BLEConnect.prototype.onConnectClick = function (evt) {
            if (this.mode == 1) {
                this.stopScan();
                return;
            }
            else {
                var addr = this.getSelectedDeviceAddress();
                console.log(addr);
                if (addr && addr.length > 2) {
                    this.btnConnect.attr('disabled', 'disabled');
                    this.connect(addr);
                }
            }
        };
        BLEConnect.prototype.getSelectedDeviceAddress = function () {
            return this.selDevices.val();
        };
        BLEConnect.prototype.onSelDevicesChange = function (evt) {
            // console.log(evt.currentTarget);
        };
        BLEConnect.prototype.initializeSuccess = function (obj) {
            //  console.log("Initialize Success : ",obj);
            if (obj.status == "enabled")
                this.startScan();
            else
                console.log("Unexpected Initialize Status", obj);
        };
        BLEConnect.prototype.addDevice = function (dev) {
            if (!this.devices[dev.address]) {
                this.btnConnect.removeAttr(DISABLED);
                this.devices[dev.address] = dev;
                this.selDevices.append($("<option></option>").attr("value", dev.address).text(dev.name));
            }
        };
        BLEConnect.prototype.startScanSuccess = function (evt) {
            this.mode = 1;
            if (evt.status == "scanResult")
                this.addDevice(new VoDevice(evt));
            else if (evt.status == "scanStarted")
                this.message.text('Scan Started...');
            else
                this.message.text('ERROR: ' + JSON.stringify(evt));
        };
        BLEConnect.prototype.onStartScanClick = function (evt) {
            this.startScan();
        };
        BLEConnect.prototype.stopScan = function () {
            var _this = this;
            this.message.text('Scan stopped');
            this.btnStopScan.attr(DISABLED, DISABLED);
            this.btnStartScan.removeAttr(DISABLED);
            this.ble.stopScan(function (evt) { return _this.stopScanSuccess(evt); }, function (evt) { return _this.stopScanError(evt); });
        };
        BLEConnect.prototype.onStopScanClick = function (evt) {
            this.stopScan();
        };
        BLEConnect.prototype.stopScanSuccess = function (evt) {
            this.mode = 0;
            console.log('stopScanSuccess', evt);
        };
        BLEConnect.prototype.stopScanError = function (evt) {
            console.log('stopScanError', evt);
        };
        BLEConnect.prototype.startScan = function () {
            var _this = this;
            this.btnStartScan.attr(DISABLED, DISABLED);
            this.btnStopScan.removeAttr(DISABLED);
            this.ble.startScan(function (evt) { return _this.startScanSuccess(evt); }, function (evt) { return _this.startScanError(evt); }, { serviceUuids: [] });
        };
        BLEConnect.prototype.startScanError = function (evt) {
            console.log('startScanError', evt);
        };
        BLEConnect.prototype.initializeError = function (obj) {
            console.log("Initialize Error : ", obj);
        };
        return BLEConnect;
    })();
    myapp.BLEConnect = BLEConnect;
    var VoDevice = (function () {
        function VoDevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VoDevice;
    })();
})(myapp || (myapp = {}));
//# sourceMappingURL=BLEConnect.js.map