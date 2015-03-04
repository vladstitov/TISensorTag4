/// <reference path="constants.ts" />



module myapp {

    class TheType {
        private SERVICE:string;
        private CONFIG:string;
        private PERIOD:string;
        private DATA: string;
        private NOTIFICATION: string;

        getId(): string {
            return this.SERVICE;
        }

        constructor(obj: any,public name:string) {
            for (var str in obj) {
                var val = obj[str];
                this[str] = val;
                this[val] = str;
            }
        }
    }

    export class TheDevice {
        private servs: BleService[]
        private constants: any;

        private sensorTypes: any;
        private inputs: any;
        private others: any;

        constructor(constants:any) {
           
            var types: any = {}
            for (var str in constants.SENSORS) {
                var type: TheType = new TheType(constants.SENSORS[str], str);
                types[type.getId()] = type;
            }
            this.sensorTypes = types;
            this.others = constants.OTHERS;           
            this.constants = constants;
            console.log('The Device types: ', types);
        }

        getTypeOf(id: string): TheType {
            return this.sensorTypes[id];
        }

        
        setServices(ar: any[]): VoChars[] {
            var out: BleService[] = [];
            var chars: VoChars[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {

                var serv: BleService  = new BleService(ar[i])
                out.push(serv);
               chars = chars.concat(serv.getAllChars());
            }
            this.servs = out;
            return chars;
        }

    }



    export class BleService {
        serviceUuid: string;
        characteristics: VoChars[];

        constructor(obj: any) {
            var id = obj.serviceUuid;
            this.serviceUuid = id;
            var ar: any = obj.characteristics;
            var out:VoChars[]=[]
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new VoChars(ar[i],id));
            }

            this.characteristics = out;
        }

        getAllChars(): VoChars[] {
            return this.characteristics;
        }



    }

    export class VoChars {
        public serviceUuid: string;
        constructor(obj: any, serviceUuid: string) {
            this.serviceUuid = serviceUuid;
            for (var str in obj) this[str] = obj[str];
    }
    }
}

