/// <reference path="typings/bluetoothle.d.ts" />
module ble {
    export class BLEConnector {
        private ble:bluetoothle
        init1(ble: bluetoothle):BLEConnector {
            this.ble = ble;
           
            return this;
        }
        itialize(successCallback: (
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
        } 

        startScan(
            successCallback: (result: BleDev) => void,
            errorCallback: Function,
            params?: { serviceUuids: string[] }
            ): void {

        }

        stopScan(
            successCallback: (result: { status: string }) => void,
            errorCallback: Function
            ): void {

        }


    }

}