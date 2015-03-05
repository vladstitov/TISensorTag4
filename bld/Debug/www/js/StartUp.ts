/// <reference path="../scripts/typings/bluetoothle.d.ts" />
/// <reference path="../scripts/typings/jquery.d.ts" />
/// <reference path="index.ts" />
/// <reference path="ble/bleconnector.ts" />

  module myapp{
    export class StartUp {

        private conn: ble.BLEConnector;
        private btnStartScan:JQuery;
        private btnStopScan: JQuery;
        private message: JQuery;
        private selDevices:JQuery;
        private btnConnect:JQuery;
        private devices: any = {};
        private servicesObj: {}
        private mode: number;

        onConnected: Function = function (evt) { };
        onDisconnected: Function = function (evt) { };

        getServicesByAddress(address: string) {
            var obj = this.servicesObj[address];
            return obj.services;
        }
        constructor(b:ble.BLEConnector) {
            this.conn = b;

            this.servicesObj = {};
            var paramsObj = { request: true };
            b.initialize((evt) => this.initializeSuccess(evt), (evt) => this.initializeError(evt), {request:true});
            //console.log('Started App ', b);
          
           this.btnStopScan =  $('#btnStopScan').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onStopScanClick(evt));
           this.btnStartScan =  $('#btnStartScan').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onStartScanClick(evt));
           this.btnConnect =  $('#btnConnect').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onConnectClick(evt));
           this.message = $('#message');
           this.selDevices=$('#devices').on(CHANGE,null,(evt)=>this.onSelDevicesChange(evt));
        }

        private onAndroidServicesSuccess(evt: BleConn): void {
            console.log('onAndroidServicesSuccess ' + evt.status);
            //console.log(JSON.stringify(evt));
            if (evt.status == 'discovered') {
                this.servicesObj[evt.address] = evt;
                this.onConnected(evt.address);              
            } else console.log('onCharacteristicsSuccess',evt);

        }
        private onAndroidServicesError(obj): void {
            console.log('onAndroidServicesError: ', obj);
        }
        private discover(address: string): void {
            console.log('this.ble.discover ' + address);
           this.conn.discover((evt: BleConn) => this.onAndroidServicesSuccess(evt), (obj) => this.onAndroidServicesError(obj), { address: address });
        }
        private getServices(address:string): void {
            this.discover(address);     
        }
      private onConnectSuccess(evt:BleConn):void{
          console.log('onConnectSuccess: ', evt.status);
          if (evt.status == 'connected'){
              var addr: string = evt.address;
              if (typeof addr == 'string' && addr.length > 2) {
                  if (this.servicesObj[evt.address]) this.onConnected(evt.address);
                  else this.getServices(evt.address);
              }
             
              
          }
         // else console.log('onConnectSuccess', evt);
            //console.log(evt);
      }
      private onConnectError(evt):void{ console.log('onConnectError ',evt); }

      private connect(addr:string):void{
      this.conn.connect((evt)=>this.onConnectSuccess(evt),(evt)=>this.onConnectError(evt), {address:addr});
      }

      private onConnectClick(evt:JQueryEventObject):void{
          if (this.mode == 1) {
              this.stopScan()
              return;
          } else {
              var addr = this.getSelectedDeviceAddress();
              console.log(addr);
          if (addr && addr.length > 2) {
              this.btnConnect.attr('disabled', 'disabled');
              this.connect(addr);
          }

          }
      }

        private getSelectedDeviceAddress(): string {
            return this.selDevices.val();
        }
        private onSelDevicesChange(evt: JQueryEventObject): void{

       // console.log(evt.currentTarget);
        }
        private initializeSuccess(obj) {
          //  console.log("Initialize Success : ",obj);
            if (obj.status == "enabled") this.startScan();        
            else  console.log("Unexpected Initialize Status",obj);        
        }

        private addDevice(dev:VoDevice) {
             if(!this.devices[dev.address]){
                 this.btnConnect.removeAttr(DISABLED);
                 this.devices[dev.address]=dev
                 this.selDevices.append($("<option></option>").attr("value",dev.address).text(dev.name));
             }            
        }
        private startScanSuccess(evt:BleDev) {
            this.mode=1;
            if (evt.status == "scanResult") this.addDevice(new VoDevice(evt));
            else if (evt.status == "scanStarted") this.message.text('Scan Started...');
            else  this.message.text('ERROR: '+JSON.stringify(evt));
        }
        private onStartScanClick(evt) {
            this.startScan();          
        }
        private stopScan(): void {
            this.message.text('Scan stopped');
            this.btnStopScan.attr(DISABLED, DISABLED);
            this.btnStartScan.removeAttr(DISABLED);
            this.conn.stopScan((evt) => this.stopScanSuccess(evt), (evt) => this.stopScanError(evt));
        }
        private onStopScanClick(evt): void {
            this.stopScan();
        }
        private stopScanSuccess(evt) {
        this.mode=0; 
        console.log('stopScanSuccess', evt);
        }
        private stopScanError(evt) { console.log('stopScanError',evt);}       
        private startScan() {
            this.btnStartScan.attr(DISABLED, DISABLED);
            this.btnStopScan.removeAttr(DISABLED);
            this.conn.startScan((evt:BleDev) => this.startScanSuccess(evt), (evt) => this.startScanError(evt), { serviceUuids: [] });
        }       
        private startScanError(evt) {console.log('startScanError', evt);}
        private initializeError(obj) { console.log("Initialize Error : " ,obj);}

    }

    class VoDevice {
        address: string;
        advertisement: string;
        name: string;
        rssi: string;
        status: string;
        constructor(obj: {}) {
            for (var str in obj) this[str] = obj[str];
        }

    }  

}