/// <reference path="../scripts/typings/bluetoothle.d.ts" />
module ble {
    export class BLEConnector {
        private ble:bluetoothle
        init1(ble: bluetoothle):BLEConnector {
            this.ble = ble;
           
            return this;
        }

        initialize(successCallback: (
            status: string) => void,
            errorCallback: (error: string) => void,
            params?: { request?: boolean; statusReceiver?: boolean }
            ): void {

            this.ble.initialize(successCallback, errorCallback,params);
        }
        enable(
            successCallback: (result: { status: string }) => void,
            errorCallback: Function
            ): void {
            this.ble.enable(successCallback, errorCallback)
        }

        disable(
            successCallback: Function,
            errorCallback: Function
            ): void {
            this.ble.disable(successCallback,errorCallback);
        } 

        startScan(
            successCallback: (result: BleDev) => void,
            errorCallback: Function,
            params?: { serviceUuids: string[] }
            ): void {
            this.ble.startScan(successCallback,errorCallback,params);
            }

        stopScan(
            successCallback: (result: { status: string }) => void,
            errorCallback: Function
            ): void {
            this.ble.stopScan(successCallback,errorCallback);
        }
        retrieveConnected(//iOS
            successCallback: (result: { name: string; address: string }[]) => void,
            errorCallback: Function,
            params?: { serviceUuids: string[] }
        ): void{
            this.ble.retrieveConnected(successCallback,errorCallback,params);
        }

        connect(
            successCallback: (status:BleConn) => void,
            errorCallback: Function,
            params: { address: string }
        ): void{
            this.ble.connect(successCallback,errorCallback,params);
        }

        reconnect(
            successCallback: (status: BleConn) => void,
            errorCallback: Function,
            params: { address: string }
        ): void{
            this.ble.reconnect(successCallback,errorCallback,params);
        }

        disconnect(
            successCallback: (status: BleConn) => void,
            errorCallback: Function,
            params: { address: string }
        ): void{
            this.ble.disconnect(successCallback,errorCallback,params);
        }

        close(
            successCallback: (status: BleConn) => void,
            errorCallback: Function,
            params: { address: string }
        ): void{
            this.ble.close(successCallback,errorCallback,params)
        }




        discover(
            successCallback: (result:BleServA) => void,
            errorCallback: Function,
            params: { address: string }
        ): void{
            this.ble.discover(successCallback,errorCallback,params);
        }

        services(
            successCallback: (result:BleServsI)=>void,
            errorCallback: Function,
            params: { address: string; serviceUuids: string[] }
        ): void{
            this.ble.services(successCallback,errorCallback,params);
        }

        characteristics( //iOS only
            successCallback: (result:BleCharsI)=>void,
            errorCallback: Function,
            params: { address: string; serviceUuid: string; characteristicUuids:string[]}
        ): void {
            this.ble.characteristics(successCallback,errorCallback,params);
        }
        descriptors( //iOS only
            successCallback: (result: BleDescrsI) => void,
            errorCallback: Function,
            params: { address: string; serviceUuid: string; characteristicUuid: string }
        ): void{
            this.ble.descriptors(successCallback,errorCallback,params);
        }

        read(
            successCallback: (result:BleVal)=>void,
            errorCallback: Function,
            params: { address: string; serviceUuid: string; characteristicUuid:string}
        ): void{
            this.ble.read(successCallback,errorCallback,params);
        }
        subscribe(
            successCallback: (result: BleVal) => void,//status": "subscribed"(no value) ,status": "subscribedResult",
            errorCallback: Function,
            params: { address: string; serviceUuid: string; characteristicUuid: string; isNotification:boolean }
        ): void{
            this.ble.subscribe(successCallback,errorCallback,params);
        }

        unsubscribe(
            successCallback: (result: { status: string; characteristicUuid: string; name: string; serviceUuid: string; address: string }) => void,
            errorCallback: Function,
            params: { address: string; serviceUuid: string; characteristicUuid: string}
        ): void {
            this.ble.unsubscribe(successCallback,errorCallback,params);
        }

        write(//bluetoothle.bytesToEncodedString(bytes) to convert to base64 encoded string from a unit8Array.
            successCallback: (result: BleVal /*"written"*/)=>void,
            errorCallback: Function,
            params: {
                value: string; serviceUuid: string; characteristicUuid: string;
                type: string //To write without response, set type to "noResponse". No callback will occur
            }
        ): void{
            this.ble.write(successCallback,errorCallback,params);
        }

        readDescriptor (
            successCallback:(val: BleDescr) => void,
            errorCallback: Function,
            params
        ): void{
            this.readDescriptor(successCallback,errorCallback,params);
        }

        writeDescriptor (successCallback:Function, errorCallback:Function, params):void{
            this.ble.writeDescriptor(successCallback,errorCallback,params);
        }
        rssi (successCallback:Function, errorCallback:Function, params):void{
            this.ble.rssi(successCallback,errorCallback,params);
        }
        isInitialized (successCallback):void{
            this.ble.isInitialized(successCallback)
        }
        isEnabled (successCallback):void{
            this.ble.isEnabled(successCallback);
        }
        isScanning (successCallback):void{
            this.ble.isScanning(successCallback);
        }
        isConnected(successCallback, params):void{
            this.ble.isConnected(successCallback,params);
        }
        isDiscovered(successCallback, params): void{
            this.ble.isDiscovered(successCallback,params);
        }

        encodedStringToBytes(str: string): Uint8Array {
         var data = atob(str);
         var bytes = new Uint8Array(data.length);
         for (var i = 0; i < bytes.length; i++) {
         bytes[i] = data.charCodeAt(i);
         }
         return bytes;
         }
        bytesToEncodedString(bytes:number[]): string{
         return btoa(String.fromCharCode.apply(null, bytes));
         }

        stringToBytes(str: string): Uint16Array{
             var bytes = new ArrayBuffer(str.length * 2);
             var bytesUint16 = new Uint16Array(bytes);
                 for (var i = 0; i < str.length; i++) {
                     bytesUint16[i] = str.charCodeAt(i);
                 }
         return new Uint8Array(bytesUint16);
         }

        bytesToString(bytes: number[]): string {
         return String.fromCharCode.apply(null, new Uint16Array(bytes));
         }
    }

}