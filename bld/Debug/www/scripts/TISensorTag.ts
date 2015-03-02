/// <reference path="typings/bluetoothle.d.ts" />



module sensors {    
    export class TISeansorTag {
        private ble: bluetoothle;
        constructor(bluetoothle) {
            this.ble = bluetoothle;


        }
    }
}