declare var bluetoothleName: string;
declare enum BLEsataus {
    connecting,
    connected,
    disconnected
}

interface devchar {
    characteristicUuid: string;
    properties: { read?: boolean; write?: boolean; writeWithoutResponse?: boolean; indicate?: boolean; notify?:boolean};
    descriptors: { descriptorUuid:string};


}
interface devservice{
    serviceUuid: string;
    characteristics: devchar[]
}

interface bluetoothle {
   

   // prams1 { request: boolean = true, statusReceiver: boolean }
    initialize(successCallback: (
        status: string) => void,
        errorCallback: (error: string) => void,
        params: { request?: boolean; statusReceiver?: boolean }
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "initialize", [params]);    

    enable(
        successCallback: (result: { status: string }) => void,
        errorCallback: (error: { errorDisable; errorEnable }) => void
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "enable", []);

    disable(
        successCallback: Function,
        errorCallback: (errorDisable,
        errorEnable) => void
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "disable", []);    

    startScan(
        successCallback: (result: { status: string; name?: string; advertisement?: string; rssi?: number; address?: string }) => void,
        errorCallback: Function,
        params?: { serviceUuids: string[] }
        ): void//cordova.exec(successCallback, errorCallback, bluetoothleName, "startScan", [params]);

    stopScan(
        successCallback: (result: { status: string }) => void,
        errorCallback: Function
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "stopScan", []);

    retrieveConnected(
        successCallback: (result: { name: string; address: string }[]) => void,
        errorCallback: Function,
        params?: { serviceUuids: string[] }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "retrieveConnected", [params]);

    connect(successCallback: (
        status: { status: BLEsataus; name: string; address: string }) => void,
        errorCallback: Function,
        params: { address: string }
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "connect", [params]);

    reconnect(
        successCallback: (status: { status: BLEsataus; name: string; address: string }) => void,
        errorCallback: Function,
        params: { address: string }
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "reconnect", [params]);

    disconnect(
        successCallback: (status: { status: BLEsataus; name: string; address: string }) => void,
        errorCallback: Function,
        params: { address: string }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "disconnect", [params]);

    close(
        successCallback: (status: { status: string; name: string; address: string }) => void,
        errorCallback: Function,
        params: { address: string }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "close", [params]);

    discover(
        successCallback: (result: { status: string; address: string; name: string; services: devservice[] }) => void,
        errorCallback: Function,
        params: { address: string }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "discover", [params]);

    services(
        successCallback: (result: { status: string; erviceUuids: string[]; name: string; address:string})=>void,
        errorCallback: Function,
        params: { address: string; serviceUuids: string[] }
        ): void//cordova.exec(successCallback, errorCallback, bluetoothleName, "services", [params]);

    characteristics( //iOS only
        successCallback: (result: { status: string; name: string; serviceUuid: string; address: string; characteristics:devchar[]})=>void,
        errorCallback: Function,
        params: { address: string; serviceUuid: string; characteristicUuids:string[]}
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "characteristics", [params]);

    descriptors( //iOS only
        successCallback: (result: { status: string; descriptorUuids: string[]; characteristicUuid: string; name: string; serviceUuid: string;address:string})=>void,
        errorCallback: Function,
        params: { address: string; serviceUuid: string; characteristicUuid: string }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "descriptors", [params]);

    read(
        successCallback: (result: { status: string; value: string; characteristicUuid: string; name: string; serviceUuid: string;address:string})=>void,
        errorCallback: Function,
        params: { address: string; serviceUuid: string; characteristicUuid:string}
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "read", [params]);

    subscribe(
        successCallback: (result: { status: string; characteristicUuid: string; name: string; serviceUuid: string; address: string; value?: string }) => void,
        errorCallback: Function,
        params: { address: string; serviceUuid: string; characteristicUuid: string; isNotification:boolean }
        ): void// cordova.exec(successCallback, errorCallback, bluetoothleName, "subscribe", [params]);

    unsubscribe(
        successCallback: (result: { status: string; characteristicUuid: string; name: string; serviceUuid: string; address: string }) => void,
        errorCallback: Function,
        params: { address: string; serviceUuid: string; characteristicUuid: string}
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "unsubscribe", [params]);

    write(//bluetoothle.bytesToEncodedString(bytes) to convert to base64 encoded string from a unit8Array. 
        successCallback: (result: {
            status: string;//"written"
            serviceUuid: string; characteristicUuid: string; value: string
        }) => void,
        errorCallback: Function,
        params: {
            value: string; serviceUuid: string; characteristicUuid: string;
            type: string //To write without response, set type to "noResponse". No callback will occur 
        }
        ): void//  cordova.exec(successCallback, errorCallback, bluetoothleName, "write", [params]);

    readDescriptor (successCallback:Function, errorCallback:Function, params):void// cordova.exec(successCallback, errorCallback, bluetoothleName, "readDescriptor", [params]);
    writeDescriptor (successCallback:Function, errorCallback:Function, params):void// cordova.exec(successCallback, errorCallback, bluetoothleName, "writeDescriptor", [params]);
    rssi (successCallback:Function, errorCallback:Function, params):void//cordova.exec(successCallback, errorCallback, bluetoothleName, "rssi", [params]);
    isInitialized (successCallback):void// cordova.exec(successCallback, successCallback, bluetoothleName, "isInitialized", []);
    isEnabled (successCallback):void// cordova.exec(successCallback, successCallback, bluetoothleName, "isEnabled", []);
    isScanning (successCallback):void// cordova.exec(successCallback, successCallback, bluetoothleName, "isScanning", []);
    isConnected(successCallback, params):void// cordova.exec(successCallback, successCallback, bluetoothleName, "isConnected", [params]);
    isDiscovered(successCallback, params):void//cordova.exec(successCallback, successCallback, bluetoothleName, "isDiscovered", [params]);   
    encodedStringToBytes(str: string): Uint8Array 
    /* {
        var data = atob(string);
        var bytes = new Uint8Array(data.length);
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = data.charCodeAt(i);
        }
        return bytes;
    }*/
    bytesToEncodedString(bytes:number[]): string
     /* {
        return btoa(String.fromCharCode.apply(null, bytes));
    }*/

    stringToBytes(str: string): Uint16Array
      /* {
        var bytes = new ArrayBuffer(string.length * 2);
        var bytesUint16 = new Uint16Array(bytes);
        for (var i = 0; i < string.length; i++) {
            bytesUint16[i] = string.charCodeAt(i);
        }
        return new Uint8Array(bytesUint16);
    }*/
    bytesToString(bytes: number[]): string 
     /* {
        return String.fromCharCode.apply(null, new Uint16Array(bytes));
    }*/
}
