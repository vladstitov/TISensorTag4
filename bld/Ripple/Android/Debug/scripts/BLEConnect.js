/// <reference path="typings/bluetoothle.d.ts" />
var myapp;
(function (myapp) {
    var BLEConnect = (function () {
        function BLEConnect(b) {
            var _this = this;
            this.devices = {};
            this.ble = b;
            var paramsObj = { request: true };
            b.initialize(function (evt) { return _this.initializeSuccess(evt); }, function (evt) { return _this.initializeError(evt); }, { request: true });
            //console.log('Started App ', b);
            this.btnStopScan = $('#btnStopScan').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onStopScanClick(evt); });
            this.btnStartScan = $('#btnStartScan').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onStartScanClick(evt); });
            this.btnConnect = $('#btnConnect').attr(DISABLED, DISABLED).on(CLICK, null, function (evt) { return _this.onConnectClick(evt); });
            this.message = $('#message');
            this.selDevices = $('#devices').on(CHANGE, null, function (evt) { return _this.onSelDevicesChange(evt); });
        }
        BLEConnect.prototype.onConnectSuccess = function (evt) {
            this.message.text(evt.status);
            console.log(evt.status);
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
            else
                this.connect(this.selDevices.val());
        };
        BLEConnect.prototype.onSelDevicesChange = function (evt) {
            console.log(evt.currentTarget);
        };
        BLEConnect.prototype.initializeSuccess = function (obj) {
            //  console.log("Initialize Success : ",obj);
            if (obj.status == "enabled")
                this.startScan();
            else
                console.log("Unexpected Initialize Status", obj);
        };
        BLEConnect.prototype.addDevice = function (obj) {
            if (!this.devices[obj.address]) {
                this.btnConnect.removeAttr(DISABLED);
                this.devices[obj.address] = obj;
                this.selDevices.append($("<option></option>").attr("value", obj.address).text(obj.name));
            }
        };
        BLEConnect.prototype.startScanSuccess = function (evt) {
            this.mode = 1;
            if (evt.status == "scanResult")
                this.addDevice(evt);
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
    var DeviceVO = (function () {
        function DeviceVO() {
        }
        return DeviceVO;
    })();
})(myapp || (myapp = {}));
//# sourceMappingURL=BLEConnect.js.map