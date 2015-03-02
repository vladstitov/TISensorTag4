/// <reference path="typings/bluetoothle.d.ts" />
  module myapp{

    export class BLEConnect {
        private ble:bluetoothle;
        private btnStartScan:JQuery;
        private btnStopScan: JQuery;
        private message: JQuery;
        private selDevices:JQuery;
        private btnConnect:JQuery;
        private devices: any = {};
        private mode:number;
        onConnected:Function;
        onDisconnected:Function;



        constructor(b: bluetoothle) {
            this.ble = b;
            var paramsObj = { request: true };
            b.initialize((evt) => this.initializeSuccess(evt), (evt) => this.initializeError(evt), {request:true});
            //console.log('Started App ', b);
          
           this.btnStopScan =  $('#btnStopScan').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onStopScanClick(evt));
           this.btnStartScan =  $('#btnStartScan').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onStartScanClick(evt));
           this.btnConnect =  $('#btnConnect').attr(DISABLED, DISABLED).on(CLICK, null, (evt) => this.onConnectClick(evt));
           this.message = $('#message');
           this.selDevices=$('#devices').on(CHANGE,null,(evt)=>this.onSelDevicesChange(evt));
        }
      
      private onConnectSuccess(evt):void{
            this.message.text(evt.status);
            console.log(evt.status);
      }
      private onConnectError(evt):void{ console.log('onConnectError ',evt); }

      private connect(addr:string):void{

      this.ble.connect((evt)=>this.onConnectSuccess(evt),(evt)=>this.onConnectError(evt), {address:addr});
      }

      private onConnectClick(evt:JQueryEventObject):void{
          if(this.mode==1){
           this.stopScan()
           return;
           } else this.connect(this.selDevices.val());
         
      }

        private onSelDevicesChange(evt:JQueryEventObject):void{
        console.log(evt.currentTarget);
        }
        private initializeSuccess(obj) {
          //  console.log("Initialize Success : ",obj);
            if (obj.status == "enabled") this.startScan();        
            else  console.log("Unexpected Initialize Status",obj);        
        }

        private addDevice(obj:DeviceVO) {
             if(!this.devices[obj.address]){
             this.btnConnect.removeAttr(DISABLED);
             this.devices[obj.address]=obj
             this.selDevices.append($("<option></option>").attr("value",obj.address).text(obj.name));
             }            
        }
        private startScanSuccess(evt) {
            this.mode=1;
            if (evt.status == "scanResult") this.addDevice(evt)
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
            this.ble.stopScan((evt) => this.stopScanSuccess(evt), (evt) => this.stopScanError(evt));
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
            this.ble.startScan((evt) => this.startScanSuccess(evt), (evt) => this.startScanError(evt), { serviceUuids: [] });
        }       
        private startScanError(evt) {console.log('startScanError', evt);}
        private initializeError(obj) { console.log("Initialize Error : " ,obj);}

    }

    class DeviceVO {
        address: string;
        advertisement: string;
        name: string;
        rssi: string;
        status: string;

    }  

}