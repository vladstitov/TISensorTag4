/// <reference path="../scripts/typings/bluetoothle.d.ts" />
/// <reference path="../scripts/typings/jquery.d.ts" />
/// <reference path="index.ts" />
/// <reference path="ble/bleconnector.ts" />
var myapp;
(function (myapp) {
    var StartUp = (function () {
        function StartUp(b) {
            var _this = this;
            this.devices = {};
            this.onConnected = function (evt) {
            };
            this.onDisconnected = function (evt) {
            };
            this.conn = b;
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
        StartUp.prototype.getServicesByAddress = function (address) {
            var obj = this.servicesObj[address];
            return obj.services;
        };
        StartUp.prototype.onAndroidServicesSuccess = function (evt) {
            console.log('onAndroidServicesSuccess ' + evt.status);
            if (evt.status == 'discovered') {
                this.servicesObj[evt.address] = evt;
                this.onConnected(evt.address);
            }
            else
                console.log('onCharacteristicsSuccess', evt);
        };
        StartUp.prototype.onAndroidServicesError = function (obj) {
            console.log('onAndroidServicesError: ', obj);
        };
        StartUp.prototype.discover = function (address) {
            var _this = this;
            console.log('this.ble.discover ' + address);
            this.conn.discover(function (evt) { return _this.onAndroidServicesSuccess(evt); }, function (obj) { return _this.onAndroidServicesError(obj); }, { address: address });
        };
        StartUp.prototype.getServices = function (address) {
            this.discover(address);
        };
        StartUp.prototype.onConnectSuccess = function (evt) {
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
        StartUp.prototype.onConnectError = function (evt) {
            console.log('onConnectError ', evt);
        };
        StartUp.prototype.connect = function (addr) {
            var _this = this;
            this.conn.connect(function (evt) { return _this.onConnectSuccess(evt); }, function (evt) { return _this.onConnectError(evt); }, { address: addr });
        };
        StartUp.prototype.onConnectClick = function (evt) {
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
        StartUp.prototype.getSelectedDeviceAddress = function () {
            return this.selDevices.val();
        };
        StartUp.prototype.onSelDevicesChange = function (evt) {
            // console.log(evt.currentTarget);
        };
        StartUp.prototype.initializeSuccess = function (obj) {
            //  console.log("Initialize Success : ",obj);
            if (obj.status == "enabled")
                this.startScan();
            else
                console.log("Unexpected Initialize Status", obj);
        };
        StartUp.prototype.addDevice = function (dev) {
            if (!this.devices[dev.address]) {
                this.btnConnect.removeAttr(DISABLED);
                this.devices[dev.address] = dev;
                this.selDevices.append($("<option></option>").attr("value", dev.address).text(dev.name));
            }
        };
        StartUp.prototype.startScanSuccess = function (evt) {
            this.mode = 1;
            if (evt.status == "scanResult")
                this.addDevice(new VoDevice(evt));
            else if (evt.status == "scanStarted")
                this.message.text('Scan Started...');
            else
                this.message.text('ERROR: ' + JSON.stringify(evt));
        };
        StartUp.prototype.onStartScanClick = function (evt) {
            this.startScan();
        };
        StartUp.prototype.stopScan = function () {
            var _this = this;
            this.message.text('Scan stopped');
            this.btnStopScan.attr(DISABLED, DISABLED);
            this.btnStartScan.removeAttr(DISABLED);
            this.conn.stopScan(function (evt) { return _this.stopScanSuccess(evt); }, function (evt) { return _this.stopScanError(evt); });
        };
        StartUp.prototype.onStopScanClick = function (evt) {
            this.stopScan();
        };
        StartUp.prototype.stopScanSuccess = function (evt) {
            this.mode = 0;
            console.log('stopScanSuccess', evt);
        };
        StartUp.prototype.stopScanError = function (evt) {
            console.log('stopScanError', evt);
        };
        StartUp.prototype.startScan = function () {
            var _this = this;
            this.btnStartScan.attr(DISABLED, DISABLED);
            this.btnStopScan.removeAttr(DISABLED);
            this.conn.startScan(function (evt) { return _this.startScanSuccess(evt); }, function (evt) { return _this.startScanError(evt); }, { serviceUuids: [] });
        };
        StartUp.prototype.startScanError = function (evt) {
            console.log('startScanError', evt);
        };
        StartUp.prototype.initializeError = function (obj) {
            console.log("Initialize Error : ", obj);
        };
        return StartUp;
    })();
    myapp.StartUp = StartUp;
    var VoDevice = (function () {
        function VoDevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VoDevice;
    })();
})(myapp || (myapp = {}));
//# sourceMappingURL=StartUp.js.map